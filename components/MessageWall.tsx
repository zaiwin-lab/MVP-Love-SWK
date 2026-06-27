'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOCK_MESSAGES } from '@/lib/mockData'
import { useLang } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

const INITIAL = 6
const PAGE = 6

type Msg = { id: string; name: string | null; city: string; country: string; one_word: string | null; message: string }

export default function MessageWall() {
  const [messages, setMessages] = useState<Msg[]>(MOCK_MESSAGES as Msg[])
  const [visible, setVisible] = useState(INITIAL)
  const [total, setTotal] = useState(MOCK_MESSAGES.length)
  const [loading, setLoading] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    fetch(`/api/messages?limit=${INITIAL}&offset=0`)
      .then(r => r.json())
      .then(data => {
        if (data.messages?.length > 0) {
          setMessages(data.messages)
          setTotal(data.total)
          setVisible(data.messages.length)
        }
      })
      .catch(() => {})
  }, [])

  const loadMore = async () => {
    setLoading(true)
    const res = await fetch(`/api/messages?limit=${PAGE}&offset=${visible}`)
    const data = await res.json()
    if (data.messages?.length > 0) {
      setMessages(prev => [...prev, ...data.messages])
      setVisible(v => v + data.messages.length)
    }
    setLoading(false)
  }

  const shown = messages.slice(0, visible)
  const hasMore = visible < total

  return (
    <section className="section-pad" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2 className="section-title">{t(T.wall.title) as string}</h2>
          <p className="section-sub">{t(T.wall.sub) as string}</p>
          <div className="rule" />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          <AnimatePresence>
            {shown.map((msg, i) => (
              <motion.div
                key={msg.id}
                className="card card-lift"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  cursor: 'default',
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                {/* Opening quote mark */}
                <div style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: '2.5rem',
                  lineHeight: 0.8,
                  color: 'var(--gold)',
                  opacity: 0.5,
                }}>
                  &ldquo;
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    color: 'var(--ink-mid)',
                    lineHeight: 1.75,
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    flex: 1,
                  }}
                >
                  {msg.message.slice(0, 200)}{msg.message.length > 200 ? '…' : ''}
                </p>

                {/* Attribution */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.875rem' }}>
                  <div style={{ color: 'var(--green)', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-body, sans-serif)' }}>
                    {msg.name || (t(T.wall.anon) as string)}
                  </div>
                  <div style={{ color: 'var(--ink-faint)', fontSize: '0.78rem', marginTop: '0.2rem', fontFamily: 'var(--font-body, sans-serif)' }}>
                    {msg.city}, {msg.country}
                  </div>
                  {msg.one_word && (
                    <span style={{
                      display: 'inline-block',
                      marginTop: '0.5rem',
                      background: 'var(--green-light)',
                      border: '1px solid var(--border)',
                      borderRadius: 99,
                      padding: '2px 12px',
                      fontSize: '0.74rem',
                      color: 'var(--green)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      fontFamily: 'var(--font-body, sans-serif)',
                    }}>
                      {msg.one_word}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <motion.div
            style={{ textAlign: 'center', marginTop: '3rem' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={loadMore}
              disabled={loading}
              className="btn-outline"
              style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'wait' : 'pointer' }}
            >
              {loading ? 'Loading…' : (t(T.wall.loadMore) as string)}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
