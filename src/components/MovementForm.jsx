import { useState } from 'react'
import { CURRENCIES, parseNum } from '../lib/currency'
import { catsFor } from '../lib/categories'
import { todayStr } from '../lib/calc'
import { useApp } from '../lib/store'
import { Field, Segmented } from './ui'

export default function MovementForm({ defaultType = 'expense', onDone }) {
  const { t, accounts, addMovement } = useApp()
  const [type, setType] = useState(defaultType)
  const [date, setDate] = useState(todayStr())
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(catsFor(defaultType)[0].key)
  const [amount, setAmount] = useState('')
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? '')
  const [currency, setCurrency] = useState(accounts[0]?.currency ?? 'USD')
  const [error, setError] = useState(false)

  const changeType = (next) => {
    setType(next)
    setCategory(catsFor(next)[0].key)
  }
  const changeAccount = (id) => {
    setAccountId(id)
    const acc = accounts.find((a) => a.id === id)
    if (acc) setCurrency(acc.currency)
  }

  const submit = (e) => {
    e.preventDefault()
    const value = parseNum(amount)
    if (!(value > 0) || !accountId) return setError(true)
    addMovement({
      type,
      date: date || todayStr(),
      description: description.trim() || t(`cat.${category}`),
      category,
      amount: value,
      currency,
      accountId,
    })
    setDescription('')
    setAmount('')
    setError(false)
    onDone?.()
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Segmented
        value={type}
        onChange={changeType}
        options={[
          { value: 'expense', label: t('form.expense') },
          { value: 'income', label: t('form.income') },
        ]}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field label={t('form.date')}>
          <input type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label={t('form.cat')}>
          <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
            {catsFor(type).map((c) => (
              <option key={c.key} value={c.key}>{t(`cat.${c.key}`)}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label={t('form.desc')}>
        <input
          className="field"
          placeholder={t('form.descPh')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <Field label={t('form.amount')}>
          <input
            className="field"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value)
              setError(false)
            }}
          />
        </Field>
        <Field label={t('form.currency')}>
          <select className="field" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <Field label={t('form.account')}>
        <select className="field" value={accountId} onChange={(e) => changeAccount(e.target.value)}>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>{a.name} ({a.currency})</option>
          ))}
        </select>
      </Field>
      {error && <p className="text-sm text-rose-400">{t('form.err')}</p>}
      <button type="submit" className="btn-primary w-full">{t('form.save')}</button>
    </form>
  )
}
