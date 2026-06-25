'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COUNTRIES } from '@/lib/countries'

interface Props {
  onSuccess: (data: Record<string, unknown>) => void
}

const LABEL: React.CSSProperties = {
  display: 'block',
  color: 'rgba(245,240,232,0.55)',
  fontSize: '0.75rem',
  fontWeight: 700,
  marginBottom: '7px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}

const REQ = <span style={{ color: '#E8192C' }}>*</span>
const OPT = <span style={{ color: 'rgba(245,240,232,0.3)', fontWeight: 400 }}> (optional)</span>

export default function SubmissionForm({ onSuccess }: Props) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', country: '', city: '', district: '', one_word: '', message: '',
  })
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const charLeft = 300 - form.message.length

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.country || !form.city || !form.message) {
      setError('Please fill in Country, City, and your Love Message.')
      return
    }
    if (!agreed) {
      setError('Please agree to display your message publicly.')
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
      <h2 className="section-title">Share Your Love</h2>
      <p className="section-sub">Leave your mark on the Global Love Map for Sarawak</p>
      <div className="divider" />

      {/* Background glow */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: -60, borderRadius: 40,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(232,25,44,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="glass" style={{ padding: 'clamp(1.75rem, 4vw, 2.75rem)', position: 'relative' }}>
          <form onSubmit={handleSubmit}>
            {/* Row 1: Name + Country */}
            <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={LABEL}>Your Name {OPT}</label>
                <input name="name" value={form.name} onChange={set} placeholder="e.g. Sarah Lim" className="input-field" />
              </div>
              <div>
                <label style={LABEL}>Country {REQ}</label>
                <select name="country" value={form.country} onChange={set} required className="input-field">
                  <option value="">Select country...</option>
                  {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>

            {/* Row 2: City + District */}
            <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={LABEL}>Your City {REQ}</label>
                <input name="city" value={form.city} onChange={set} placeholder="e.g. London" required className="input-field" />
              </div>
              <div>
                <label style={LABEL}>District in Sarawak {OPT}</label>
                <input name="district" value={form.district} onChange={set} placeholder="e.g. Kuching, Miri…" className="input-field" />
              </div>
            </div>

            {/* Row 3: One word */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={LABEL}>One word that describes Sarawak {OPT}</label>
              <input name="one_word" value={form.one_word} onChange={set} placeholder="e.g. Home, Beautiful, Pride…" maxLength={20} className="input-field" />
            </div>

            {/* Message */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <label style={{ ...LABEL, marginBottom: 0 }}>Your Love Message {REQ}</label>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: charLeft < 50 ? '#E8192C' : 'rgba(245,240,232,0.35)',
                  transition: 'color 0.2s',
                }}>
                  {charLeft} left
                </span>
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={set}
                placeholder="Write your love message to Sarawak... a memory, a feeling, a dream. Tell Sarawak what it means to you."
                maxLength={300}
                rows={5}
                required
                className="input-field"
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
                style={{ width: 20, height: 20, marginTop: 2, accentColor: '#E8192C', cursor: 'pointer', flexShrink: 0 }}
              />
              <span style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                I agree for my message to be displayed publicly on the Kamek Sayang Sarawak Global Love Map. 🌏
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
                    background: 'rgba(232,25,44,0.12)',
                    border: '1px solid rgba(232,25,44,0.4)',
                    borderRadius: 10,
                    padding: '12px 16px',
                    color: '#ff8888',
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
                  Share My Love for Sarawak
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
