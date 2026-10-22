import { useState } from 'react'
import { parseNum } from '../lib/currency'
import { useApp } from '../lib/store'
import { Field } from './ui'

export default function RatesEditor() {
  const { rates, updateRates, t } = useApp()
  const [draft, setDraft] = useState(() => ({
    USD: String(rates.USD), EUR: String(rates.EUR), USDT: String(rates.USDT),
  }))

  const change = (cur, value) => {
    setDraft((d) => ({ ...d, [cur]: value }))
    const n = parseNum(value)
    if (n > 0) updateRates({ [cur]: n })
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {['USD', 'EUR', 'USDT'].map((cur) => {
        const invalid = !(parseNum(draft[cur]) > 0)
        return (
          <Field key={cur} label={`${cur} → Bs`}>
            <input
              className={`field ${invalid ? '!border-rose-500' : ''}`}
              inputMode="decimal"
              aria-label={t('rates.per', { cur })}
              value={draft[cur]}
              onChange={(e) => change(cur, e.target.value)}
              onBlur={() => setDraft((d) => ({ ...d, [cur]: String(rates[cur]) }))}
            />
          </Field>
        )
      })}
    </div>
  )
}
