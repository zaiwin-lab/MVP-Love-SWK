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
      className="section-pad"
      style={{ background: 'var(--green-dark)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle texture — thin pua stripe at top only */}
      <div className="pua-stripe" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Hornbill mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <svg viewBox="0 0 60 42" width="60" height="42" style={{ opacity: 0.6 }}>
            <ellipse cx="24" cy="28" rx="20" ry="11" fill="#C8860A"/>
            <circle cx="44" cy="16" r="8" fill="#C8860A"/>
            <path d="M 42,8 Q 58,3 60,7 Q 57,12 46,11 Z" fill="#CC1020"/>
            <path d="M 46,16 Q 62,14 62,18 Q 60,22 46,20 Z" fill="#CC1020"/>
            <circle cx="46" cy="14" r="2" fill="#0F2E1C"/>
          </svg>
        </motion.div>

        <motion.h2
          className="section-title section-title--light"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: 680, margin: '0 auto 1.25rem' }}
        >
          {t(T.promise.title) as string}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            width: 48, height: 2,
            background: 'var(--gold)',
            borderRadius: 2,
            margin: '1.25rem auto 2.25rem',
          }}
        />

        <motion.p
          className="section-sub section-sub--light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ maxWidth: 560, margin: '0 auto 3rem' }}
        >
          {(t(T.promise.body) as string)
            .replace('{n}', `${MILESTONE.toLocaleString()} messages`)
            .replace('Community Wall of Love for Sarawak', 'Community Wall of Love for Sarawak')
          }
        </motion.p>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            maxWidth: 520,
            margin: '0 auto 3rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(200,134,10,0.2)',
            borderRadius: 'var(--r-lg)',
            padding: '1.5rem 2rem',
          }}
        >
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '0.875rem',
            fontFamily: 'var(--font-body, sans-serif)',
          }}>
            <span style={{ color: 'rgba(238,245,240,0.55)', fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {t(T.promise.progress) as string}
            </span>
            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.95rem' }}>
              {COUNT.toLocaleString()} / {MILESTONE.toLocaleString()}
            </span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${PCT}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--green-mid) 0%, var(--gold) 100%)',
                borderRadius: 99,
              }}
            />
          </div>
        </motion.div>

        <motion.button
          className="btn-primary"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ fontSize: '1rem', padding: '16px 44px', marginBottom: '4rem' }}
        >
          {t(T.promise.addVoice) as string}
        </motion.button>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid rgba(238,245,240,0.10)',
          paddingTop: '2.5rem',
          color: 'rgba(238,245,240,0.35)',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-body, sans-serif)',
          letterSpacing: '0.06em',
        }}>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span>{t(T.promise.copyright) as string}</span>
            <span>{t(T.promise.oneworld) as string}</span>
          </div>
          <div style={{ marginBottom: '0.75rem', color: 'rgba(238,245,240,0.28)' }}>
            {t(T.promise.footer) as string}
          </div>
          <div style={{ color: 'rgba(238,245,240,0.22)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            Innovated by{' '}
            <strong style={{ color: 'var(--gold)', fontWeight: 600 }}>Azam</strong>
            {' '}&amp;{' '}
            <strong style={{ color: 'var(--gold)', fontWeight: 600 }}>KOBIS AI Prodigy Team</strong>
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <a
              href="/admin"
              style={{
                fontSize: '0.68rem',
                color: 'rgba(238,245,240,0.2)',
                textDecoration: 'none',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(238,245,240,0.2)')}
            >
              ⚙ Admin
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
