'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { MOCK_STATS } from '@/lib/mockData'
import { useLang } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

const MILESTONE = 1000

export default function LiveCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLang()
  const [stats, setStats] = useState({
    total: MOCK_STATS.total,
    countries: MOCK_STATS.countries,
    cities: MOCK_STATS.cities,
    participants: MOCK_STATS.participants,
  })

  useEffect(() => {
    fetch('/api/messages?limit=1')
      .then(r => r.json())
      .then(data => {
        if (data.total > 0) {
          setStats({
            total: data.total,
            countries: data.countriesCount,
            cities: data.citiesCount,
            participants: data.total,
          })
        }
      })
      .catch(() => {})
  }, [])

  const pct = Math.min((stats.total / MILESTONE) * 100, 100)

  const STATS = [
    { labelKey: T.counter.messages, value: stats.total,      icon: '💌', label: 'Messages of love' },
    { labelKey: T.counter.countries, value: stats.countries, icon: '🌍', label: 'Countries reached' },
    { labelKey: T.counter.cities,    value: stats.cities,    icon: '🏙️', label: 'Cities represented' },
    { labelKey: T.counter.hearts,    value: stats.participants, icon: '❤️', label: 'Hearts planted' },
  ]

  return (
    <section
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2 className="section-title">{t(T.counter.title) as string}</h2>
          <p className="section-sub">{t(T.counter.sub) as string}</p>
          <div className="rule" />
        </motion.div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
          marginBottom: '3rem',
        }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: 'var(--surface)',
                padding: '2.25rem 1.75rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem', lineHeight: 1 }}>
                {stat.icon}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display, EB Garamond, Georgia, serif)',
                  fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
                  fontWeight: 700,
                  color: 'var(--green)',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {inView
                  ? <CountUp end={stat.value} duration={2.0} delay={0.2 + i * 0.1} separator="," />
                  : '0'}
              </div>
              <div style={{
                color: 'var(--ink-muted)',
                fontSize: '0.8rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body, sans-serif)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {t(stat.labelKey) as string}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Milestone bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-lg)',
            padding: '1.75rem 2rem',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.875rem',
          }}>
            <span style={{ color: 'var(--ink-mid)', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-body, sans-serif)' }}>
              {(t(T.counter.milestone) as string).replace('{n}', MILESTONE.toLocaleString())}
            </span>
            <span style={{
              color: 'var(--green)',
              fontWeight: 800,
              fontFamily: 'var(--font-display, serif)',
              fontSize: '1.1rem',
            }}>
              {Math.round(pct)}%
            </span>
          </div>

          <div className="progress-track">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ duration: 1.8, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </div>

          <p style={{
            color: 'var(--ink-faint)',
            fontSize: '0.78rem',
            textAlign: 'center',
            marginTop: '0.875rem',
            fontFamily: 'var(--font-body, sans-serif)',
          }}>
            {t(T.counter.closer) as string}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
