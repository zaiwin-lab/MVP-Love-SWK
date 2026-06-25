'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COUNTRIES } from '@/lib/countries'
import { useLang } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

interface Props {
  onSuccess: (data: Record<string, unknown>) => void
}

export default function SubmissionForm({ onSuccess }: Props) {
  const { t } = useLang()
  const [form, setForm] = useState({
    name: '', phone: '', email: '', country: '', city: '', district: '', one_word: '', message: '',
  })
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const charLeft = 300 - form.message.length

  const LABEL: React.CSSProperties = {
    display: 'block',
    color: 'rgba(74,26,26,0.7)',
    fontSize: '0.75rem',
    fontWeight: 700,
    marginBottom: '7px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  }

  const REQ = <span style={{ color: '#CC1020' }}>*</span>
  const OPT = <span style={{ color: 'rgba(74,26,26,0.4)', fontWeight: 400 }}> ({t(T.form.optional) as string})</span>

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.country || !form.city || !form.message) {
      setError(t(T.form.error_required) as string)
      return
    }
    if (!agreed) {
      setError(t(T.form.error_agree) as string)
      return
    }
    setLoading(true)
    // Simulate a network request (frontend-only demo)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    onSuccess({ ...form, id: 'demo-' + Date.now() })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="section-title-light">{t(T.form.title) as string}</h2>
      <p className="section-sub-light">{t(T.form.sub) as string}</p>
      <div className="divider" />

      {/* Form card */}
      <div style={{ position: 'relative' }}>
        <div className="glass-light" style={{ padding: 'clamp(1.75rem, 4vw, 2.75rem)', position: 'relative' }}>
          <form onSubmit={handleSubmit}>
            {/* Row 1: Name + Country */}
            <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={LABEL}>{t(T.form.name) as string} {OPT}</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={set}
                  placeholder={t(T.form.placeholder_name) as string}
                  className="input-field-light"
                />
              </div>
              <div>
                <label style={LABEL}>{t(T.form.country) as string} {REQ}</label>
                <select name="country" value={form.country} onChange={set} required className="input-field-light">
                  <option value="">{t(T.form.select_country) as string}</option>
                  {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>

            {/* Row 2: City + District */}
            <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={LABEL}>{t(T.form.city) as string} {REQ}</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={set}
                  placeholder={t(T.form.placeholder_city) as string}
                  required
                  className="input-field-light"
                />
              </div>
              <div>
                <label style={LABEL}>{t(T.form.district) as string} {OPT}</label>
                <input
                  name="district"
                  value={form.district}
                  onChange={set}
                  placeholder={t(T.form.placeholder_district) as string}
                  className="input-field-light"
                />
              </div>
            </div>

            {/* Row 3: One word */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={LABEL}>{t(T.form.oneword) as string} {OPT}</label>
              <input
                name="one_word"
                value={form.one_word}
                onChange={set}
                placeholder={t(T.form.placeholder_word) as string}
                maxLength={20}
                className="input-field-light"
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <label style={{ ...LABEL, marginBottom: 0 }}>{t(T.form.message) as string} {REQ}</label>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: charLeft < 50 ? '#CC1020' : 'rgba(74,26,26,0.35)',
                  transition: 'color 0.2s',
                }}>
                  {charLeft} left
                </span>
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={set}
                placeholder={t(T.form.placeholder_msg) as string}
                maxLength={300}
                rows={5}
                required
                className="input-field-light"
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Consent */}
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              marginBottom: '1.75rem',
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                style={{ width: 20, height: 20, marginTop: 2, accentColor: '#CC1020', cursor: 'pointer', flexShrink: 0 }}
              />
              <span style={{ color: 'rgba(74,26,26,0.7)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                {t(T.form.agree) as string} 🌏
              </span>
            </label>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: 'rgba(204,16,32,0.08)',
                    border: '1px solid rgba(204,16,32,0.3)',
                    borderRadius: 10,
                    padding: '12px 16px',
                    color: '#CC1020',
                    marginBottom: '1rem',
                    fontSize: '0.88rem',
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary"
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                opacity: loading ? 0.75 : 1,
                cursor: loading ? 'wait' : 'pointer',
                letterSpacing: '0.04em',
              }}
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >❤️</motion.span>
                  Sending your love…
                </>
              ) : (
                <>
                  <span>❤️</span>
                  {t(T.form.submit) as string}
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
