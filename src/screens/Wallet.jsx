import { useState } from 'react'
import { Banknote, Landmark, Bitcoin, CreditCard, Wallet as WalletIcon, Plus, Trash2 } from 'lucide-react'
import { useApp } from '../lib/store'
import { accountBalance, sortMoves } from '../lib/calc'
import { CURRENCIES, parseNum, toUSD } from '../lib/currency'
import { ConfirmDialog, EmptyState, Field, Modal, Segmented } from '../components/ui'
import MovementForm from '../components/MovementForm'
import MovementList from '../components/MovementList'

const TYPES = {
  cash: { icon: Banknote, tone: 'bg-emerald-500/15 text-emerald-300' },
  bank: { icon: Landmark, tone: 'bg-brand/20 text-brand-pale' },
  crypto: { icon: Bitcoin, tone: 'bg-amber-500/15 text-amber-300' },
  wallet: { icon: CreditCard, tone: 'bg-sky-500/15 text-sky-300' },
  other: { icon: WalletIcon, tone: 'bg-slate-700/50 text-slate-300' },
}

function AccountForm({ onDone }) {
  const { t, addAccount } = useApp()
  const [name, setName] = useState('')
  const [type, setType] = useState('bank')
  const [currency, setCurrency] = useState('USD')
  const [initial, setInitial] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    const n = parseNum(initial)
    addAccount({ name: name.trim(), type, currency, initial: Number.isFinite(n) ? n : 0 })
    onDone()
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Field label={t('acc.name')}>
        <input autoFocus className="field" placeholder={t('acc.namePh')} value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label={t('acc.type')}>
          <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
            {Object.keys(TYPES).map((k) => <option key={k} value={k}>{t(`type.${k}`)}</option>)}
          </select>
        </Field>
        <Field label={t('acc.currency')}>
          <select className="field" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <Field label={t('acc.initial')}>
        <input className="field" inputMode="decimal" placeholder="0.00" value={initial} onChange={(e) => setInitial(e.target.value)} />
      </Field>
      <button type="submit" className="btn-primary w-full">{t('wallet.save')}</button>
    </form>
  )
}

function Accounts() {
  const { t, accounts, movements, rates, moneyIn, money, profile, deleteAccount } = useApp()
  const [adding, setAdding] = useState(false)
  const [toDelete, setToDelete] = useState(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {accounts.map((a) => {
          const { icon: Icon, tone } = TYPES[a.type] ?? TYPES.other
          const bal = accountBalance(a, movements, rates)
          return (
            <div key={a.id} className="card relative flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}><Icon size={20} /></span>
                <button
                  onClick={() => setToDelete(a)}
                  aria-label="Eliminar"
                  className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-800 hover:text-rose-300"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{a.name}</p>
                <p className="text-xs text-slate-500">{t(`type.${a.type}`)} · {a.currency}</p>
              </div>
              <div>
                <p className="break-words text-lg font-bold leading-tight">{moneyIn(bal, a.currency)}</p>
                {a.currency !== profile.currency && (
                  <p className="text-xs text-slate-500">≈ {money(toUSD(bal, a.currency, rates))}</p>
                )}
              </div>
            </div>
          )
        })}
        <button
          onClick={() => setAdding(true)}
          className="flex min-h-[170px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-800 text-slate-400 transition hover:border-brand-light hover:text-brand-pale"
        >
          <Plus size={24} />
          <span className="text-sm font-medium">{t('wallet.add')}</span>
        </button>
      </div>
      {adding && (
        <Modal title={t('wallet.new')} onClose={() => setAdding(false)}>
          <AccountForm onDone={() => setAdding(false)} />
        </Modal>
      )}
      {toDelete && (
        <ConfirmDialog
          message={t('confirm.delAcc', { name: toDelete.name })}
          onConfirm={() => deleteAccount(toDelete.id)}
          onClose={() => setToDelete(null)}
        />
      )}
    </>
  )
}

function Movements() {
  const { t, movements, deleteMovement } = useApp()
  const [toDelete, setToDelete] = useState(null)
  const items = sortMoves(movements)

  return (
    <div className="grid gap-5 md:grid-cols-[360px_1fr] md:items-start">
      <section className="card">
        <h2 className="mb-3 text-sm font-semibold text-slate-300">{t('form.new')}</h2>
        <MovementForm />
      </section>
      <section className="card">
        <h2 className="mb-1 text-sm font-semibold text-slate-300">{t('wallet.all')}</h2>
        {items.length ? <MovementList items={items} onDelete={setToDelete} /> : <EmptyState>{t('home.noMoves')}</EmptyState>}
      </section>
      {toDelete && (
        <ConfirmDialog
          message={t('confirm.delMove')}
          onConfirm={() => deleteMovement(toDelete.id)}
          onClose={() => setToDelete(null)}
        />
      )}
    </div>
  )
}

export default function Wallet({ tab, onTab }) {
  const { t } = useApp()
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold tracking-tight">{t('wallet.title')}</h1>
      <Segmented
        value={tab}
        onChange={onTab}
        options={[
          { value: 'accounts', label: t('wallet.accounts') },
          { value: 'moves', label: t('wallet.moves') },
        ]}
      />
      {tab === 'accounts' ? <Accounts /> : <Movements />}
    </div>
  )
}
