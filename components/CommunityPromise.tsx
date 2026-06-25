'use client'
import { motion } from 'framer-motion'
import { MOCK_STATS } from '@/lib/mockData'

const MILESTONE = MOCK_STATS.milestone
const COUNT = MOCK_STATS.total
const PCT = Math.min((COUNT / MILESTONE) * 100, 100)

export default function CommunityPromise() {
  return (
    <section
      className="section-pad"
      style={{
        background: '#0a0a0f',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 800, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(232,25,44,0.07) 0%, rgba(255,215,0,0.04) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Animated hearts row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          {[0.0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
            <motion.span
              key={i}
              style={{ fontSize: '1.4rem' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.2, delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              ❤️
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          style={{
            border: '1px solid rgba(255,215,0,0.25)',
            borderRadius: 28,
            padding: 'clamp(2.5rem, 6vw, 5rem)',
            background: 'linear-gradient(145deg, rgba(232,25,44,0.06) 0%, rgba(8,8,16,0.8) 50%, rgba(255,215,0,0.04) 100%)',
            boxShadow: '0 0 80px rgba(232,25,44,0.12), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Quote mark decoration */}
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '6rem',
            lineHeight: 0.6,
            color: 'rgba(232,25,44,0.15)',
            marginBottom: '1rem',
            fontWeight: 900,
            userSelect: 'none',
          }}>
            &ldquo;
          </div>

          <h2
            className="font-playfair"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
              fontWeight: 800,
              fontStyle: 'italic',
              color: '#F5F0E8',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            Our Community Promise
          </h2>

          <div style={{ width: 64, height: 3, background: 'linear-gradient(90deg, #E8192C, #FFD700)', margin: '0 auto 2rem', borderRadius: 2 }} />

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.18rem)',
            color: 'rgba(245,240,232,0.72)',
            lineHeight: 1.95,
            marginBottom: '2.5rem',
            maxWidth: 580,
            margin: '0 auto 2.5rem',
          }}>
            When we reach our milestone of{' '}
            <strong style={{ color: '#FFD700' }}>{MILESTONE.toLocaleString()} messages</strong>,
            every message collected will become part of a{' '}
            <strong style={{ color: '#E8192C' }}>Community Wall of Love for Sarawak</strong> —
            to be showcased during a future community event.
            A living testament to the love that Sarawakians and
            friends of Sarawak carry in their hearts, wherever they are in the world.
          </p>

          {/* Progress */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
              <span style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Progress to milestone
              </span>
              <span style={{ color: '#FFD700', fontWeight: 800, fontSize: '0.95rem' }}>
                {COUNT} / {MILESTONE.toLocaleString()}
              </span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 99, height: 14, overflow: 'hidden', position: 'relative' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${PCT}%` }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  background: 'linear-gradient(90deg, #E8192C 0%, #ff6644 50%, #FFD700 100%)',
                  borderRadius: 99,
                }}
              />
              <div className="progress-shimmer" style={{ position: 'absolute', inset: 0 }} />
            </div>
          </div>

          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '17px 50px', fontSize: '1.08rem', border: 'none', cursor: 'pointer', letterSpacing: '0.04em' }}
          >
            ❤️ Add Your Voice
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: '3rem', color: 'rgba(245,240,232,0.2)', fontSize: '0.82rem', letterSpacing: '0.08em' }}
        >
          Made with ❤️ for Sarawak · #KamekSayangSarawak · #HariSarawak
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem', justifyContent: 'center', fontSize: '0.75rem' }}>
            <span>© 2024 Kamek Sayang Sarawak</span>
            <span>One Sarawak · One World · One Heart</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
