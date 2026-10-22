import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useApp } from '../lib/store'
import { categoryTotals, monthKey, monthlySeries, todayStr } from '../lib/calc'
import { CAT_COLORS } from '../lib/categories'
import { fromUSD } from '../lib/currency'
import { EmptyState, Segmented } from '../components/ui'

const INCOME_COLOR = '#3D7FFF'
const EXPENSE_COLOR = '#FB7185'
const AXIS = { fill: '#94A3B8', fontSize: 12 }
const TOOLTIP = {
  contentStyle: { background: '#0F172A', border: '1px solid #1E293B', borderRadius: 12, fontSize: 12 },
  labelStyle: { color: '#CBD5E1' },
  itemStyle: { color: '#E2E8F0' },
  cursor: { fill: 'rgba(148,163,184,0.08)' },
}

export default function Stats() {
  const { t, profile, rates, movements, locale, moneyIn, money } = useApp()
  const [catType, setCatType] = useState('expense')
  const [period, setPeriod] = useState('month')
  const cur = profile.currency
  const conv = (usd) => fromUSD(usd, cur, rates)
  const compact = (n) => new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(n)

  const series = monthlySeries(movements, rates, 6, locale)
  const monthly = series.map((s) => ({ label: s.label, income: conv(s.income), expense: conv(s.expense) }))
  const totalIn = series.reduce((s, m) => s + m.income, 0)
  const totalOut = series.reduce((s, m) => s + m.expense, 0)

  const thisMonth = monthKey(todayStr())
  const pred = period === 'month' ? (m) => monthKey(m.date) === thisMonth : () => true
  const cats = categoryTotals(movements, catType, rates, pred).map((c, i) => ({
    name: t(`cat.${c.key}`),
    value: conv(c.usd),
    fill: CAT_COLORS[i % CAT_COLORS.length],
  }))

  const hasData = movements.length > 0

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold tracking-tight">{t('stats.title')}</h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="card !p-3">
          <p className="text-xs text-slate-400">{t('home.income')}</p>
          <p className="mt-1 text-sm font-semibold text-brand-pale">{money(totalIn)}</p>
        </div>
        <div className="card !p-3">
          <p className="text-xs text-slate-400">{t('home.expense')}</p>
          <p className="mt-1 text-sm font-semibold text-rose-300">{money(totalOut)}</p>
        </div>
        <div className="card !p-3">
          <p className="text-xs text-slate-400">{t('stats.net')}</p>
          <p className="mt-1 text-sm font-semibold">{money(totalIn - totalOut)}</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 md:items-start">
        <section className="card">
          <h2 className="text-sm font-semibold text-slate-300">{t('stats.monthly')}</h2>
          <p className="mb-3 text-xs text-slate-500">{t('stats.last6')} · {cur}</p>
          {hasData ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#1E293B" />
                  <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
                  <YAxis tick={AXIS} axisLine={false} tickLine={false} tickFormatter={compact} />
                  <Tooltip {...TOOLTIP} formatter={(v) => moneyIn(v, cur)} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#94A3B8' }} />
                  <Bar dataKey="income" name={t('home.income')} fill={INCOME_COLOR} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="expense" name={t('home.expense')} fill={EXPENSE_COLOR} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState>{t('stats.empty')}</EmptyState>
          )}
        </section>

        <section className="card">
          <h2 className="mb-3 text-sm font-semibold text-slate-300">{t('stats.byCat')}</h2>
          <div className="mb-3 grid gap-2">
            <Segmented
              value={catType}
              onChange={setCatType}
              options={[
                { value: 'expense', label: t('home.expense') },
                { value: 'income', label: t('home.income') },
              ]}
            />
            <Segmented
              value={period}
              onChange={setPeriod}
              options={[
                { value: 'month', label: t('stats.thisMonth') },
                { value: 'all', label: t('stats.all') },
              ]}
            />
          </div>
          {cats.length ? (
            <div style={{ height: Math.max(160, cats.length * 44 + 20) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cats} layout="vertical" margin={{ top: 0, right: 56, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={92} tick={AXIS} axisLine={false} tickLine={false} />
                  <Tooltip {...TOOLTIP} formatter={(v) => moneyIn(v, cur)} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
                    {cats.map((c) => <Cell key={c.name} fill={c.fill} />)}
                    <LabelList dataKey="value" position="right" formatter={compact} fill="#CBD5E1" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState>{t('stats.empty')}</EmptyState>
          )}
        </section>
      </div>
    </div>
  )
}
