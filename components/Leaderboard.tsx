'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MOCK_COUNTRIES, MOCK_CITIES } from '@/lib/mockData'

interface LeaderItem { name: string; count: number }

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32']
const MEDAL_LABELS = ['🥇', '🥈', '🥉']

function Board({ title, items, icon, delay = 0 }: { title: string; items: LeaderItem[]; icon: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const maxCount = Math.max(...items.map(i => i.count))

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      style={{
        flex: 1,
        minWidth: 280,
        padding: '2rem',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-display, serif)',
          fontSize: '1.3rem',
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {icon} {title}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay + i * 0.08, duration: 0.5 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '6px' }}>
              <span style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: i < 3 ? MEDAL_COLORS[i] : 'var(--green-light)',
                color: i < 3 ? '#000' : 'var(--ink-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: i < 3 ? '0.88rem' : '0.75rem',
                fontFamily: 'var(--font-body, sans-serif)',
              }}>
                {i < 3 ? MEDAL_LABELS[i] : i + 1}
              </span>
              <span style={{
                flex: 1,
                color: i < 3 ? 'var(--green)' : 'var(--ink-mid)',
                fontWeight: i < 3 ? 700 : 400,
                fontSize: '0.92rem',
                fontFamily: 'var(--font-body, sans-serif)',
              }}>
                {item.name}
              </span>
              <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'var(--font-body, sans-serif)' }}>
                {item.count}
              </span>
            </div>
            <div style={{ height: 4, background: 'var(--border)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div
                className="lb-bar"
                initial={{ width: 0 }}
                animate={inView ? { width: `${(item.count / maxCount) * 100}%` } : {}}
                transition={{ duration: 1.2, delay: delay + i * 0.1 + 0.2, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Leaderboard() {
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
          <h2 className="section-title">Where Love Flows From</h2>
          <p className="section-sub">Countries and cities sending their support to Sarawak</p>
          <div className="rule" />
        </motion.div>

        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Board title="Top Countries" items={MOCK_COUNTRIES} icon="🌍" delay={0} />
          <Board title="Top Cities" items={MOCK_CITIES} icon="🏙️" delay={0.15} />
        </div>
      </div>
    </section>
  )
}
