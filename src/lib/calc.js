import { convert, toUSD } from './currency'

export const todayStr = () => new Date().toLocaleDateString('sv-SE')
export const monthKey = (dateStr) => dateStr.slice(0, 7)
const signOf = (m) => (m.type === 'income' ? 1 : -1)

export function accountBalance(acc, movements, rates) {
  let bal = Number(acc.initial) || 0
  for (const m of movements) {
    if (m.accountId === acc.id) bal += signOf(m) * convert(m.amount, m.currency, acc.currency, rates)
  }
  return bal
}

export function totalBalanceUSD(accounts, movements, rates) {
  return accounts.reduce((s, a) => s + toUSD(accountBalance(a, movements, rates), a.currency, rates), 0)
}

export function sumUSD(movements, type, rates, pred = () => true) {
  return movements
    .filter((m) => m.type === type && pred(m))
    .reduce((s, m) => s + toUSD(m.amount, m.currency, rates), 0)
}

export function categoryTotals(movements, type, rates, pred = () => true) {
  const map = {}
  for (const m of movements) {
    if (m.type !== type || !pred(m)) continue
    map[m.category] = (map[m.category] || 0) + toUSD(m.amount, m.currency, rates)
  }
  return Object.entries(map)
    .map(([key, usd]) => ({ key, usd }))
    .sort((a, b) => b.usd - a.usd)
}

export function monthlySeries(movements, rates, n, locale) {
  const now = new Date()
  const out = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const inMonth = (m) => monthKey(m.date) === key
    out.push({
      key,
      label: d.toLocaleDateString(locale, { month: 'short' }).replace('.', ''),
      income: sumUSD(movements, 'income', rates, inMonth),
      expense: sumUSD(movements, 'expense', rates, inMonth),
    })
  }
  return out
}

export const sortMoves = (movements) =>
  [...movements].sort((a, b) => (a.date === b.date ? b.createdAt - a.createdAt : a.date < b.date ? 1 : -1))
