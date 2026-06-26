'use client'
import { motion } from 'framer-motion'
import { MOCK_STATS } from '@/lib/mockData'
import { useLang } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

const MILESTONE = MOCK_STATS.milestone
const COUNT = MOCK_STATS.total
const PCT = Math.min((COUNT / MILESTONE) * 100, 100)

export default function CommunityPromise() {
  const { t } = useLang()

  return (
    <section
      className="section-pad bg-pattern"
      style={{
        background: '#FFFBF5',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
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
            border: '1px solid rgba(204,16,32,0.18)',
            borderRadius: 28,
            padding: 'clamp(2.5rem, 6vw, 5rem)',
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 8px 60px rgba(204,16,32,0.10), 0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          {/* Quote mark decoration */}
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '6rem',
            lineHeight: 0.6,
            color: 'rgba(204,16,32,0.10)',
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
              color: '#1A0408',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            {t(T.promise.title) as string}
          </h2>

          <div style={{ width: 64, height: 3, background: 'linear-gradient(90deg, #CC1020, #FFD700)', margin: '0 auto 2rem', borderRadius: 2 }} />

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.18rem)',
            color: '#4A1A1A',
            lineHeight: 1.95,
            marginBottom: '2.5rem',
            maxWidth: 580,
            margin: '0 auto 2.5rem',
          }}>
            {(t(T.promise.body) as string)
              .replace('{n}', `${MILESTONE.toLocaleString()} messages`)
              .split('Community Wall of Love for Sarawak')
              .map((part, idx, arr) =>
                idx < arr.length - 1 ? (
                  <span key={idx}>
                    {part.split(`${MILESTONE.toLocaleString()} messages`).map((p2, j2, a2) =>
                      j2 < a2.length - 1 ? (
                        <span key={j2}>
                          {p2}<strong style={{ color: '#C8860A' }}>{MILESTONE.toLocaleString()} messages</strong>
                        </span>
                      ) : p2
                    )}
                    <strong style={{ color: '#CC1020' }}>Community Wall of Love for Sarawak</strong>
                  </span>
                ) : (
                  part.split(`${MILESTONE.toLocaleString()} messages`).map((p2, j2, a2) =>
                    j2 < a2.length - 1 ? (
                      <span key={j2}>
                        {p2}<strong style={{ color: '#C8860A' }}>{MILESTONE.toLocaleString()} messages</strong>
                      </span>
                    ) : p2
                  )
                )
              )
            }
          </p>

          {/* Progress */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
              <span style={{ color: '#9A5A5A', fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {t(T.promise.progress) as string}
              </span>
              <span style={{ color: '#CC1020', fontWeight: 800, fontSize: '0.95rem' }}>
                {COUNT} / {MILESTONE.toLocaleString()}
              </span>
            </div>
            <div style={{ background: 'rgba(204,16,32,0.08)', borderRadius: 99, height: 14, overflow: 'hidden', position: 'relative' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${PCT}%` }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  background: 'linear-gradient(90deg, #CC1020 0%, #E8192C 50%, #FFD700 100%)',
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
            {t(T.promise.addVoice) as string}
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: '3rem', color: '#9A5A5A', fontSize: '0.82rem', letterSpacing: '0.08em' }}
        >
          {t(T.promise.footer) as string}
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem', justifyContent: 'center', fontSize: '0.75rem', color: '#9A5A5A' }}>
            <span>{t(T.promise.copyright) as string}</span>
            <span>{t(T.promise.oneworld) as string}</span>
          </div>
          <div style={{ marginTop: '1.25rem', fontSize: '0.72rem', color: 'rgba(154,90,90,0.65)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Innovated by <strong style={{ color: '#CC1020', fontWeight: 700 }}>Azam</strong> &amp; <strong style={{ color: '#CC1020', fontWeight: 700 }}>KOBIS AI Prodigy Team</strong>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
