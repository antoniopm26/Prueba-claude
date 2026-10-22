import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_RATES, formatMoney, fromUSD } from './currency'
import { LOCALES, translate } from './i18n'

const KEY = 'tf-finance:v1'

const uid = () => crypto.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`

const defaults = () => ({
  profile: { name: '', language: 'es', currency: 'USD' },
  rates: { ...DEFAULT_RATES },
  accounts: [
    { id: 'cash', name: 'Efectivo', type: 'cash', currency: 'USD', initial: 0 },
    { id: 'bank', name: 'Banco', type: 'bank', currency: 'Bs', initial: 0 },
    { id: 'binance', name: 'Binance', type: 'crypto', currency: 'USDT', initial: 0 },
    { id: 'paypal', name: 'PayPal', type: 'wallet', currency: 'USD', initial: 0 },
  ],
  movements: [],
})

function load() {
  const d = defaults()
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return d
    const p = JSON.parse(raw)
    return {
      profile: { ...d.profile, ...p.profile },
      rates: { ...d.rates, ...p.rates },
      accounts: Array.isArray(p.accounts) ? p.accounts : d.accounts,
      movements: Array.isArray(p.movements) ? p.movements : [],
    }
  } catch {
    return d
  }
}

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

export function AppProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* almacenamiento no disponible */
    }
  }, [state])

  const { profile, rates, accounts, movements } = state
  const lang = profile.language
  const locale = LOCALES[lang] ?? LOCALES.es

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang])
  // Muestra un monto en USD en la moneda principal elegida.
  const money = useCallback(
    (usd) => formatMoney(fromUSD(usd, profile.currency, rates), profile.currency, locale),
    [profile.currency, rates, locale],
  )
  const moneyIn = useCallback((amount, cur) => formatMoney(amount, cur, locale), [locale])

  const actions = useMemo(
    () => ({
      addMovement: (m) =>
        setState((s) => ({ ...s, movements: [...s.movements, { ...m, id: uid(), createdAt: Date.now() }] })),
      deleteMovement: (id) => setState((s) => ({ ...s, movements: s.movements.filter((m) => m.id !== id) })),
      addAccount: (a) => setState((s) => ({ ...s, accounts: [...s.accounts, { ...a, id: uid() }] })),
      deleteAccount: (id) =>
        setState((s) => ({
          ...s,
          accounts: s.accounts.filter((a) => a.id !== id),
          movements: s.movements.filter((m) => m.accountId !== id),
        })),
      updateProfile: (patch) => setState((s) => ({ ...s, profile: { ...s.profile, ...patch } })),
      updateRates: (patch) => setState((s) => ({ ...s, rates: { ...s.rates, ...patch } })),
      clearMovements: () => setState((s) => ({ ...s, movements: [] })),
      clearAll: () => setState(defaults()),
    }),
    [],
  )

  const value = { profile, rates, accounts, movements, locale, t, money, moneyIn, ...actions }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
