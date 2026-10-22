import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../lib/store'

export function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-slate-800 bg-slate-900 p-5 pb-8 shadow-2xl md:rounded-3xl md:pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Cerrar" className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function ConfirmDialog({ message, onConfirm, onClose }) {
  const { t } = useApp()
  return (
    <Modal title={t('confirm.ok')} onClose={onClose}>
      <p className="mb-5 text-sm text-slate-300">{message}</p>
      <div className="grid grid-cols-2 gap-3">
        <button className="btn-ghost" onClick={onClose}>{t('confirm.cancel')}</button>
        <button
          className="btn-danger"
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {t('confirm.ok')}
        </button>
      </div>
    </Modal>
  )
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-400">{label}</span>
      {children}
    </label>
  )
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="grid auto-cols-fr grid-flow-col gap-1 rounded-xl border border-slate-800 bg-slate-950 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
            value === o.value ? 'bg-brand text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function EmptyState({ children }) {
  return <p className="py-6 text-center text-sm text-slate-500">{children}</p>
}
