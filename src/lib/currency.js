export const CURRENCIES = ['USD', 'EUR', 'Bs', 'USDT']
export const SYMBOLS = { USD: '$', EUR: '€', Bs: 'Bs', USDT: '₮' }

// Tasas expresadas en Bs por 1 unidad de cada moneda.
export const DEFAULT_RATES = { USD: 36.5, EUR: 39.5, USDT: 37 }

const safe = (n) => (Number(n) > 0 ? Number(n) : 1)

export function toUSD(amount, cur, rates) {
  const usd = safe(rates.USD)
  return cur === 'Bs' ? amount / usd : (amount * safe(rates[cur])) / usd
}

export function fromUSD(usd, cur, rates) {
  const r = safe(rates.USD)
  return cur === 'Bs' ? usd * r : (usd * r) / safe(rates[cur])
}

export const convert = (amount, from, to, rates) =>
  from === to ? amount : fromUSD(toUSD(amount, from, rates), to, rates)

export function formatMoney(amount, cur, locale = 'es-VE') {
  const n = Math.abs(amount).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${amount < 0 ? '-' : ''}${SYMBOLS[cur]} ${n}`
}

export function parseNum(v) {
  const n = parseFloat(String(v).replace(',', '.'))
  return Number.isFinite(n) ? n : NaN
}
