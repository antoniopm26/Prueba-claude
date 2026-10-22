import { useState } from 'react'
import { AppProvider, useApp } from './lib/store'
import BottomNav from './components/BottomNav'
import MovementForm from './components/MovementForm'
import RatesEditor from './components/RatesEditor'
import { ConfirmDialog, Modal } from './components/ui'
import Home from './screens/Home'
import Stats from './screens/Stats'
import Wallet from './screens/Wallet'
import Profile from './screens/Profile'

function Shell() {
  const { t, clearMovements } = useApp()
  const [tab, setTab] = useState('home')
  const [walletTab, setWalletTab] = useState('accounts')
  const [modal, setModal] = useState(null) // { kind: 'add' | 'rates' | 'clear', type? }

  const close = () => setModal(null)
  const go = (next, sub) => {
    setTab(next)
    if (sub) setWalletTab(sub)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="mx-auto w-full max-w-md px-4 pb-36 pt-6 md:max-w-3xl">
        {tab === 'home' && (
          <Home
            onAdd={(type) => setModal({ kind: 'add', type })}
            onRates={() => setModal({ kind: 'rates' })}
            onClear={() => setModal({ kind: 'clear' })}
            onSeeAll={() => go('wallet', 'moves')}
            onProfile={() => go('profile')}
          />
        )}
        {tab === 'stats' && <Stats />}
        {tab === 'wallet' && <Wallet tab={walletTab} onTab={setWalletTab} />}
        {tab === 'profile' && <Profile />}
      </main>

      <BottomNav tab={tab} onTab={(id) => go(id)} onAdd={() => setModal({ kind: 'add', type: 'expense' })} />

      {modal?.kind === 'add' && (
        <Modal title={t('form.new')} onClose={close}>
          <MovementForm defaultType={modal.type} onDone={close} />
        </Modal>
      )}
      {modal?.kind === 'rates' && (
        <Modal title={t('rates.title')} onClose={close}>
          <p className="mb-3 text-xs text-slate-500">{t('profile.ratesHint')}</p>
          <RatesEditor />
          <button className="btn-primary mt-4 w-full" onClick={close}>{t('rates.done')}</button>
        </Modal>
      )}
      {modal?.kind === 'clear' && (
        <ConfirmDialog message={t('confirm.clearMoves')} onConfirm={clearMovements} onClose={close} />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
