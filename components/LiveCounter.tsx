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
    { labelKey: T.counter.messages, value: stats.total, icon: '💌' },
    { labelKey: T.counter.countries, value: stats.countries, icon: '🌍' },
    { labelKey: T.counter.cities, value: stats.cities, icon: '🏙️' },
    { labelKey: T.counter.hearts, value: stats.participants, icon: '❤️' },
  ]

  return (
    <section
      ref={ref}
      className="section-pad"
      style={{
        background: '#FFFBF5',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2 className="section-title-light">{t(T.counter.title) as string}</h2>
          <p className="section-sub-light">{t(T.counter.sub) as string}</p>
          <div className="divider" />
        </motion.div>

        {/* Stat cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="glass-light card-lift"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ padding: '2rem 1.5rem', textAlign: 'center' }}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{stat.icon}</div>
              <div
                className="font-playfair"
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.2rem)',
                  fontWeight: 900,
                  color: '#CC1020',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}
              >
                {inView
                  ? <CountUp end={stat.value} duration={2.2} delay={0.2 + i * 0.1} separator="," />
                  : '0'}
              </div>
              <div style={{ color: 'rgba(74,26,26,0.6)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                {t(stat.labelKey) as string}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Milestone progress */}
        <motion.div
          className="glass-light"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ padding: '1.75rem 2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
            <span style={{ color: 'rgba(74,26,26,0.7)', fontSize: '0.9rem', fontWeight: 600 }}>
              {(t(T.counter.milestone) as string).replace('{n}', MILESTONE.toLocaleString())}
            </span>
            <span style={{ color: '#CC1020', fontWeight: 800, fontSize: '1.05rem' }}>
              {Math.round(pct)}%
            </span>
          </div>

          {/* Track */}
          <div style={{
            background: 'rgba(204,16,32,0.08)',
            borderRadius: 99,
            height: 14,
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Fill */}
            <motion.div
              style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                background: 'linear-gradient(90deg, #CC1020 0%, #E8192C 50%, #FFD700 100%)',
                borderRadius: 99,
              }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ duration: 1.8, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            />
            {/* Shimmer overlay */}
            <div
              className="progress-shimmer"
              style={{ position: 'absolute', inset: 0, borderRadius: 99 }}
            />
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textAlign: 'center', marginTop: '0.75rem' }}>
            {t(T.counter.closer) as string}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
