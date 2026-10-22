import { ArrowDownLeft, ArrowUpRight, Percent, Eraser } from 'lucide-react'
import { useApp } from '../lib/store'
import { categoryTotals, monthKey, sortMoves, sumUSD, todayStr, totalBalanceUSD } from '../lib/calc'
import { CAT_COLORS, catIcon } from '../lib/categories'
import { EmptyState } from '../components/ui'
import MovementList from '../components/MovementList'

export default function Home({ onAdd, onRates, onClear, onSeeAll, onProfile }) {
  const { t, profile, rates, accounts, movements, money } = useApp()
  const thisMonth = monthKey(todayStr())
  const inMonth = (m) => monthKey(m.date) === thisMonth

  const balance = totalBalanceUSD(accounts, movements, rates)
  const income = sumUSD(movements, 'income', rates, inMonth)
  const expense = sumUSD(movements, 'expense', rates, inMonth)
  const recent = sortMoves(movements).slice(0, 5)
  const cats = categoryTotals(movements, 'expense', rates, inMonth)
  const maxCat = cats[0]?.usd || 1
  const totalExp = cats.reduce((s, c) => s + c.usd, 0) || 1

  const quick = [
    { label: t('qa.income'), icon: ArrowDownLeft, onClick: () => onAdd('income'), tone: 'text-brand-pale bg-brand/15' },
    { label: t('qa.expense'), icon: ArrowUpRight, onClick: () => onAdd('expense'), tone: 'text-rose-300 bg-rose-500/10' },
    { label: t('qa.rates'), icon: Percent, onClick: onRates, tone: 'text-amber-300 bg-amber-500/10' },
    { label: t('qa.clear'), icon: Eraser, onClick: onClear, tone: 'text-slate-300 bg-slate-700/40' },
  ]

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{t('home.hello')}{profile.name ? `, ${profile.name}` : ''} 👋</p>
          <h1 className="text-xl font-bold tracking-tight">TF Finance</h1>
        </div>
        <button
          onClick={onProfile}
          aria-label={t('nav.profile')}
          className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-light to-brand-dark text-sm font-bold"
        >
          {(profile.name || 'TF').slice(0, 2).toUpperCase()}
        </button>
      </header>

      <div className="grid gap-5 md:grid-cols-2 md:items-start">
        <div className="space-y-5">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-dark via-brand to-brand-light p-5 shadow-lg shadow-brand/20">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-white/5" />
            <p className="relative text-sm text-white/80">{t('home.total')}</p>
            <p className="relative mt-1 break-words text-3xl font-bold tracking-tight">{money(balance)}</p>
            <p className="relative mt-3 text-xs text-white/70">{accounts.length} · {t('wallet.accounts')}</p>
          </section>

          <section className="grid grid-cols-2 gap-3">
            <div className="card">
              <p className="flex items-center gap-1.5 text-xs text-slate-400">
                <ArrowDownLeft size={14} className="text-brand-pale" /> {t('home.income')} · {t('home.month')}
              </p>
              <p className="mt-1 text-lg font-semibold text-brand-pale">{money(income)}</p>
            </div>
            <div className="card">
              <p className="flex items-center gap-1.5 text-xs text-slate-400">
                <ArrowUpRight size={14} className="text-rose-300" /> {t('home.expense')} · {t('home.month')}
              </p>
              <p className="mt-1 text-lg font-semibold text-rose-300">{money(expense)}</p>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-sm font-semibold text-slate-300">{t('home.quick')}</h2>
            <div className="grid grid-cols-4 gap-3">
              {quick.map(({ label, icon: Icon, onClick, tone }) => (
                <button key={label} onClick={onClick} className="card flex flex-col items-center gap-2 !p-3 transition hover:bg-slate-800 active:scale-95">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}><Icon size={18} /></span>
                  <span className="text-xs font-medium text-slate-300">{label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="card">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-300">{t('home.recent')}</h2>
              {movements.length > 0 && (
                <button onClick={onSeeAll} className="text-xs font-medium text-brand-pale hover:underline">{t('home.seeAll')}</button>
              )}
            </div>
            {recent.length ? <MovementList items={recent} /> : <EmptyState>{t('home.noMoves')}</EmptyState>}
          </section>

          <section className="card">
            <h2 className="mb-3 text-sm font-semibold text-slate-300">{t('home.byCat')}</h2>
            {cats.length ? (
              <ul className="space-y-3">
                {cats.map((c, i) => {
                  const Icon = catIcon(c.key)
                  const color = CAT_COLORS[i % CAT_COLORS.length]
                  return (
                    <li key={c.key}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-slate-300"><Icon size={14} style={{ color }} />{t(`cat.${c.key}`)}</span>
                        <span className="text-slate-400">{money(c.usd)} · {Math.round((c.usd / totalExp) * 100)}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full rounded-full" style={{ width: `${(c.usd / maxCat) * 100}%`, background: color }} />
                      </div>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <EmptyState>{t('home.noExp')}</EmptyState>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
