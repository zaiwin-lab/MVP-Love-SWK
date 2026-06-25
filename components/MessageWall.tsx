'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MOCK_MESSAGES } from '@/lib/mockData'

const INITIAL = 6

export default function MessageWall() {
  const [visible, setVisible] = useState(INITIAL)

  const shown = MOCK_MESSAGES.slice(0, visible)
  const hasMore = visible < MOCK_MESSAGES.length

  return (
    <section className="section-pad" style={{ background: '#080810', position: 'relative', overflow: 'hidden' }}>
      {/* Top fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120,
        background: 'linear-gradient(to bottom, #090912, transparent)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="section-title">Messages of Love</h2>
          <p className="section-sub">Words from hearts around the world</p>
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
                className="glass card-lift"
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
                    color: 'rgba(245,240,232,0.85)',
                    lineHeight: 1.75,
                    fontSize: '0.95rem',
                    fontStyle: 'italic',
                    flex: 1,
                  }}
                >
                  &ldquo;{msg.message.slice(0, 200)}{msg.message.length > 200 ? '…' : ''}&rdquo;
                </p>

                {/* Attribution */}
                <div style={{ borderTop: '1px solid rgba(255,215,0,0.1)', paddingTop: '0.875rem' }}>
                  <div style={{ color: '#FFD700', fontWeight: 700, fontSize: '0.9rem' }}>
                    {msg.name || 'Anonymous'}
                  </div>
                  <div style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.78rem', marginTop: '0.2rem' }}>
                    📍 {msg.city}, {msg.country}
                  </div>
                  {msg.one_word && (
                    <span style={{
                      display: 'inline-block',
                      marginTop: '0.5rem',
                      background: 'rgba(232,25,44,0.15)',
                      border: '1px solid rgba(232,25,44,0.25)',
                      borderRadius: 99,
                      padding: '2px 12px',
                      fontSize: '0.74rem',
                      color: '#ff8888',
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
              onClick={() => setVisible(v => v + 3)}
              className="btn-primary"
              style={{ padding: '14px 44px', fontSize: '1rem', border: 'none', cursor: 'pointer' }}
            >
              Load More Messages ❤️
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
