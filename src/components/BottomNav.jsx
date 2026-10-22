import { Home, BarChart3, Wallet, User, Plus } from 'lucide-react'
import { useApp } from '../lib/store'

const TABS = [
  { id: 'home', icon: Home, label: 'nav.home' },
  { id: 'stats', icon: BarChart3, label: 'nav.stats' },
  { id: 'wallet', icon: Wallet, label: 'nav.wallet' },
  { id: 'profile', icon: User, label: 'nav.profile' },
]

export default function BottomNav({ tab, onTab, onAdd }) {
  const { t } = useApp()
  const renderTab = ({ id, icon: Icon, label }) => (
    <button
      key={id}
      onClick={() => onTab(id)}
      aria-current={tab === id ? 'page' : undefined}
      className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition ${
        tab === id ? 'text-brand-pale' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <Icon size={22} strokeWidth={tab === id ? 2.4 : 2} />
      {t(label)}
    </button>
  )

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="relative mx-auto grid h-16 max-w-md grid-cols-5 items-center rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-black/50 backdrop-blur">
        {TABS.slice(0, 2).map(renderTab)}
        <div className="relative flex justify-center">
          <button
            onClick={onAdd}
            aria-label={t('nav.add')}
            className="absolute -top-8 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand-light to-brand-dark text-white shadow-lg shadow-brand/40 ring-4 ring-slate-950 transition active:scale-95"
          >
            <Plus size={28} strokeWidth={2.6} />
          </button>
        </div>
        {TABS.slice(2).map(renderTab)}
      </div>
    </nav>
  )
}
