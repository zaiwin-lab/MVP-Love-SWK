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
      className="glass"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      style={{ flex: 1, minWidth: 280, padding: '2rem' }}
    >
      <h3
        className="font-playfair"
        style={{
          fontSize: '1.35rem',
          fontWeight: 700,
          fontStyle: 'italic',
          color: '#F5F0E8',
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
              {/* Medal or number */}
              <span style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                background: i < 3 ? MEDAL_COLORS[i] : 'rgba(255,255,255,0.07)',
                color: i < 3 ? '#000' : 'rgba(245,240,232,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: i < 3 ? '0.9rem' : '0.78rem',
              }}>
                {i < 3 ? MEDAL_LABELS[i] : i + 1}
              </span>
              <span style={{
                flex: 1,
                color: i < 3 ? '#FFD700' : 'rgba(245,240,232,0.75)',
                fontWeight: i < 3 ? 700 : 400,
                fontSize: '0.92rem',
              }}>
                {item.name}
              </span>
              <span style={{ color: '#E8192C', fontWeight: 800, fontSize: '0.85rem' }}>
                {item.count} ❤️
              </span>
            </div>
            {/* CSS bar */}
            <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div
                className="lb-bar"
                initial={{ width: 0 }}
                animate={inView ? { width: `${(item.count / maxCount) * 100}%` } : {}}
                transition={{ duration: 1.2, delay: delay + i * 0.1 + 0.2, ease: 'easeOut' }}
                style={{
                  background: i < 3
                    ? `linear-gradient(90deg, #E8192C, ${MEDAL_COLORS[i]})`
                    : 'linear-gradient(90deg, rgba(232,25,44,0.5), rgba(255,215,0,0.5))',
                }}
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
    <section className="section-pad" style={{ background: '#0c0c18' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="section-title">Love Leaderboard</h2>
          <p className="section-sub">Where in the world is love flowing from?</p>
          <div className="divider" />
        </motion.div>

        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <Board title="Top Countries" items={MOCK_COUNTRIES} icon="🌍" delay={0} />
          <Board title="Top Cities" items={MOCK_CITIES} icon="🏙️" delay={0.15} />
        </div>
      </div>
    </section>
  )
}
