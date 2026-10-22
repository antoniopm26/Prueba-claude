import { Trash2 } from 'lucide-react'
import { catIcon } from '../lib/categories'
import { useApp } from '../lib/store'
import { toUSD } from '../lib/currency'

export default function MovementList({ items, onDelete }) {
  const { t, accounts, moneyIn, money, rates, profile, locale } = useApp()

  return (
    <ul className="divide-y divide-slate-800">
      {items.map((m) => {
        const Icon = catIcon(m.category)
        const income = m.type === 'income'
        const acc = accounts.find((a) => a.id === m.accountId)
        const date = new Date(`${m.date}T00:00:00`).toLocaleDateString(locale, { day: '2-digit', month: 'short' })
        return (
          <li key={m.id} className="flex items-center gap-3 py-3">
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                income ? 'bg-brand/15 text-brand-pale' : 'bg-rose-500/10 text-rose-300'
              }`}
            >
              <Icon size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{m.description}</p>
              <p className="truncate text-xs text-slate-500">
                {t(`cat.${m.category}`)} · {acc?.name ?? '—'} · {date}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${income ? 'text-brand-pale' : 'text-rose-300'}`}>
                {income ? '+' : '-'}{moneyIn(m.amount, m.currency)}
              </p>
              {m.currency !== profile.currency && (
                <p className="text-xs text-slate-500">≈ {money(toUSD(m.amount, m.currency, rates))}</p>
              )}
            </div>
            {onDelete && (
              <button
                onClick={() => onDelete(m)}
                aria-label="Eliminar"
                className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-800 hover:text-rose-300"
              >
                <Trash2 size={16} />
              </button>
            )}
          </li>
        )
      })}
    </ul>
  )
}
