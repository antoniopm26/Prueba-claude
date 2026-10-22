import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useApp } from '../lib/store'
import { CURRENCIES } from '../lib/currency'
import { ConfirmDialog, Field, Segmented } from '../components/ui'
import RatesEditor from '../components/RatesEditor'

export default function Profile() {
  const { t, profile, updateProfile, clearMovements, clearAll } = useApp()
  const [confirm, setConfirm] = useState(null)

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold tracking-tight">{t('profile.title')}</h1>

      <div className="grid gap-5 md:grid-cols-2 md:items-start">
        <div className="space-y-5">
          <section className="card space-y-3">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-light to-brand-dark text-lg font-bold">
                {(profile.name || 'TF').slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <Field label={t('profile.name')}>
                  <input
                    className="field"
                    placeholder={t('profile.namePh')}
                    value={profile.name}
                    onChange={(e) => updateProfile({ name: e.target.value })}
                  />
                </Field>
              </div>
            </div>
          </section>

          <section className="card space-y-3">
            <h2 className="text-sm font-semibold text-slate-300">{t('profile.prefs')}</h2>
            <Field label={t('profile.lang')}>
              <Segmented
                value={profile.language}
                onChange={(language) => updateProfile({ language })}
                options={[{ value: 'es', label: 'Español' }, { value: 'en', label: 'English' }]}
              />
            </Field>
            <Field label={t('profile.currency')}>
              <Segmented
                value={profile.currency}
                onChange={(currency) => updateProfile({ currency })}
                options={CURRENCIES.map((c) => ({ value: c, label: c }))}
              />
            </Field>
          </section>
        </div>

        <div className="space-y-5">
          <section className="card space-y-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-300">{t('profile.rates')}</h2>
              <p className="mt-1 text-xs text-slate-500">{t('profile.ratesHint')}</p>
            </div>
            <RatesEditor />
          </section>

          <section className="rounded-2xl border border-rose-900/50 bg-rose-950/20 p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-rose-300">
              <AlertTriangle size={16} /> {t('profile.danger')}
            </h2>
            <p className="mb-3 mt-1 text-xs text-slate-500">{t('profile.dangerHint')}</p>
            <div className="grid gap-2">
              <button className="btn-danger" onClick={() => setConfirm('moves')}>{t('profile.clearMoves')}</button>
              <button className="btn-danger" onClick={() => setConfirm('all')}>{t('profile.clearAll')}</button>
            </div>
          </section>
        </div>
      </div>

      {confirm && (
        <ConfirmDialog
          message={confirm === 'all' ? t('confirm.clearAll') : t('confirm.clearMoves')}
          onConfirm={confirm === 'all' ? clearAll : clearMovements}
          onClose={() => setConfirm(null)}
        />
      )}
    </div>
  )
}
