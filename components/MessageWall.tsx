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
    <section className="section-pad" style={{ background: '#FFFBF5', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="section-title-light">{t(T.wall.title) as string}</h2>
          <p className="section-sub-light">{t(T.wall.sub) as string}</p>
          <div className="divider" />
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
                className="glass-light card-lift"
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
                {/* Heart */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                  style={{ fontSize: '1.6rem', lineHeight: 1 }}
                >
                  ❤️
                </motion.div>

                {/* Quote */}
                <p
                  className="font-playfair"
                  style={{
                    color: '#1A0408',
                    lineHeight: 1.75,
                    fontSize: '0.95rem',
                    fontStyle: 'italic',
                    flex: 1,
                  }}
                >
                  &ldquo;{msg.message.slice(0, 200)}{msg.message.length > 200 ? '…' : ''}&rdquo;
                </p>

                {/* Attribution */}
                <div style={{ borderTop: '1px solid rgba(204,16,32,0.12)', paddingTop: '0.875rem' }}>
                  <div style={{ color: '#CC1020', fontWeight: 700, fontSize: '0.9rem' }}>
                    {msg.name || (t(T.wall.anon) as string)}
                  </div>
                  <div style={{ color: '#9A5A5A', fontSize: '0.78rem', marginTop: '0.2rem' }}>
                    📍 {msg.city}, {msg.country}
                  </div>
                  {msg.one_word && (
                    <span style={{
                      display: 'inline-block',
                      marginTop: '0.5rem',
                      background: 'rgba(204,16,32,0.08)',
                      border: '1px solid rgba(204,16,32,0.18)',
                      borderRadius: 99,
                      padding: '2px 12px',
                      fontSize: '0.74rem',
                      color: '#CC1020',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
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
            style={{ textAlign: 'center', marginTop: '2.5rem' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={loadMore}
              disabled={loading}
              style={{
                padding: '14px 44px',
                fontSize: '1rem',
                border: '2px solid #CC1020',
                borderRadius: 14,
                background: 'transparent',
                color: '#CC1020',
                fontWeight: 700,
                cursor: loading ? 'wait' : 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.04em',
                opacity: loading ? 0.6 : 1,
              }}
              onMouseOver={e => {
                if (!loading) {
                  (e.target as HTMLButtonElement).style.background = '#CC1020'
                  ;(e.target as HTMLButtonElement).style.color = '#fff'
                }
              }}
              onMouseOut={e => {
                (e.target as HTMLButtonElement).style.background = 'transparent'
                ;(e.target as HTMLButtonElement).style.color = '#CC1020'
              }}
            >
              {loading ? 'Loading…' : `${t(T.wall.loadMore) as string} ❤️`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
