'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'
import type { Lang } from '@/lib/translations'

// Hardcoded translations for this component only
const MAP_T = {
  title:   { en: 'Sarawak Love Map', ms: 'Peta Cinta Sarawak', iban: 'Peta Pengarap Sarawak', zh: '砂拉越爱心地图' },
  sub:     {
    en:   'Love blooming across Bumi Kenyalang — Land of the Hornbills',
    ms:   'Cinta mekar di seluruh Bumi Kenyalang — Tanah Enggang',
    iban:  'Pengarap merekah dalam Bumi Kenyalang — Menua Ruai',
    zh:   '爱在犀鸟之地——布米肯雅兰盛放',
  },
  legend:  { en: 'Top cities by love', ms: 'Bandar terkemuka dengan cinta', iban: 'Bandar atas pengarap', zh: '爱心最多城市' },
  hearts:  { en: 'hearts', ms: 'hati', iban: 'ati', zh: '颗心' },
}

interface City {
  name: string
  x: number
  y: number
  count: number
  isCapital?: boolean
}

const CITIES: City[] = [
  { name: 'Kuching',  x: 88,  y: 358, count: 89, isCapital: true },
  { name: 'Sri Aman', x: 198, y: 288, count: 18 },
  { name: 'Betong',   x: 242, y: 268, count: 12 },
  { name: 'Sarikei',  x: 335, y: 232, count: 22 },
  { name: 'Sibu',     x: 422, y: 197, count: 52 },
  { name: 'Mukah',    x: 505, y: 158, count: 15 },
  { name: 'Bintulu',  x: 542, y: 138, count: 31 },
  { name: 'Miri',     x: 610, y: 94,  count: 47 },
  { name: 'Limbang',  x: 650, y: 30,  count: 9  },
  { name: 'Lawas',    x: 662, y: 20,  count: 6  },
  { name: 'Kapit',    x: 485, y: 300, count: 8  },
]

const TOP_CITIES = [...CITIES].sort((a, b) => b.count - a.count).slice(0, 3)

// Dot radius: scale between 4 and 9 based on count
function dotRadius(count: number, isCapital?: boolean): number {
  if (isCapital) return 9
  const min = 4, max = 7.5
  const maxCount = 89
  return min + (count / maxCount) * (max - min)
}

export default function SarawakMapSection() {
  const { t } = useLang()
  const tl = (obj: Record<Lang, string>) => t(obj) as string

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="section-pad bg-pattern"
      style={{ background: '#FFFBF5', position: 'relative', overflow: 'hidden' }}
    >
      {/* Pua kumbu decorative top border */}
      <div className="pua-kumbu-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '0.5rem' }}>
        {/* Pua kumbu SVG diamond row */}
        <svg
          viewBox="0 0 320 24"
          width="320"
          height="24"
          style={{ display: 'block', margin: '0 auto 1.25rem', opacity: 0.75 }}
          aria-hidden="true"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={i}
              x={16 + i * 30}
              y={12}
              width={10}
              height={10}
              transform={`rotate(45 ${21 + i * 30} 12)`}
              fill={i % 3 === 0 ? '#CC1020' : i % 3 === 1 ? '#C8860A' : '#1A0408'}
            />
          ))}
        </svg>

        <h2 className="section-title-light">{tl(MAP_T.title)}</h2>
        <p className="section-sub-light" style={{ marginTop: '0.5rem' }}>
          {tl(MAP_T.sub)}
        </p>
        <div className="divider" />
      </div>

      {/* Map container */}
      <div
        className="glass-light"
        style={{
          maxWidth: 780,
          margin: '0 auto',
          padding: 'clamp(1rem, 3vw, 2rem)',
          position: 'relative',
        }}
      >
        <svg
          viewBox="0 0 720 490"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          aria-label="SVG map of Sarawak with love pins on cities"
        >
          <defs>
            {/* Glow filter for city dots */}
            <filter id="swk-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Radial gradient for map fill */}
            <radialGradient id="swk-fill" cx="50%" cy="50%" r="60%">
              <stop offset="0%"   stopColor="rgba(27,78,48,0.08)" />
              <stop offset="70%"  stopColor="rgba(27,78,48,0.12)" />
              <stop offset="100%" stopColor="rgba(27,78,48,0.20)" />
            </radialGradient>

            {/* Linear gradient for stroke */}
            <linearGradient id="swk-stroke" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#CC1020" />
              <stop offset="100%" stopColor="#C8860A" />
            </linearGradient>

            {/* Soft red glow for Kuching dot */}
            <filter id="swk-dot-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Sarawak outline */}
          <path
            d="
              M 20,445 L 42,408 L 65,380 L 88,358 L 118,335 L 155,312
              L 198,288 L 242,268 L 288,250 L 332,232 L 375,215
              L 420,197 L 465,178 L 505,158 L 542,138 L 575,116
              L 610,94 L 628,78 L 635,65
              L 628,54 L 632,44 L 642,36
              L 650,30 L 660,22 L 670,16
              L 688,32
              L 672,98 L 655,165 L 635,238 L 612,308 L 585,372
              L 550,415 L 508,448 L 462,464 L 408,470 L 352,468
              L 292,460 L 228,450 L 165,440 L 108,432 L 62,440 L 28,450
              Z
            "
            fill="url(#swk-fill)"
            stroke="url(#swk-stroke)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Brunei marker */}
          <circle
            cx={636}
            cy={56}
            r={5}
            fill="#C8860A"
            opacity={0.85}
          />
          <text
            x={636}
            y={47}
            textAnchor="middle"
            fontSize="8.5"
            fill="#C8860A"
            fontWeight="600"
            style={{ fontFamily: 'var(--font-inter, sans-serif)' }}
          >
            Brunei
          </text>

          {/* City dots + labels */}
          {CITIES.map((city) => {
            const r = dotRadius(city.count, city.isCapital)
            const isTop = city.name === 'Kuching'
            return (
              <g key={city.name}>
                {/* Outer glow ring */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={r + 3}
                  fill="rgba(204,16,32,0.12)"
                  filter="url(#swk-glow)"
                />
                {/* Main dot */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={r}
                  fill={isTop ? '#CC1020' : '#E8192C'}
                  filter={isTop ? 'url(#swk-dot-glow)' : undefined}
                  opacity={0.92}
                  style={{ animation: `puaPulse ${2 + (city.count % 3) * 0.4}s ease-in-out infinite` }}
                />
                {/* City name label (above dot) */}
                <text
                  x={city.x}
                  y={city.y - r - 5}
                  textAnchor="middle"
                  fontSize={isTop ? '10' : '8.5'}
                  fontWeight={isTop ? '700' : '500'}
                  fill={isTop ? '#1A0408' : '#4A1A1A'}
                  style={{ fontFamily: 'var(--font-inter, sans-serif)', pointerEvents: 'none' }}
                >
                  {city.name}
                </text>
                {/* Heart count label (below dot) */}
                <text
                  x={city.x}
                  y={city.y + r + 11}
                  textAnchor="middle"
                  fontSize="7.5"
                  fill="#CC1020"
                  fontWeight="600"
                  opacity={0.8}
                  style={{ fontFamily: 'var(--font-inter, sans-serif)', pointerEvents: 'none' }}
                >
                  ❤ {city.count}
                </text>
              </g>
            )
          })}

          {/* Hornbill silhouette (top-right corner) */}
          <g transform="translate(655, 355) scale(0.55)" opacity="0.12">
            {/* Body */}
            <ellipse cx="20" cy="30" rx="18" ry="12" fill="#1A0408"/>
            {/* Head */}
            <circle cx="38" cy="18" r="9" fill="#1A0408"/>
            {/* Casque (top of beak) */}
            <path d="M 35,10 Q 52,4 58,8 Q 55,14 42,14 Z" fill="#C8860A"/>
            {/* Beak */}
            <path d="M 44,18 Q 68,16 70,20 Q 68,24 44,22 Z" fill="#CC1020"/>
            {/* Tail feathers */}
            <path d="M 4,28 Q -12,35 -8,42 Q 0,38 6,32 Z" fill="#1A0408"/>
            <path d="M 2,32 Q -16,42 -10,50 Q -2,44 4,36 Z" fill="#1A0408"/>
            {/* Wing */}
            <path d="M 10,22 Q 20,12 32,16 Q 28,28 14,30 Z" fill="#2A0610"/>
            {/* Eye */}
            <circle cx="40" cy="16" r="2" fill="#FFD700"/>
          </g>
        </svg>

        {/* Legend row: top 3 cities */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(0.75rem, 2vw, 1.5rem)',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(204,16,32,0.10)',
          }}
        >
          <span
            style={{
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              fontWeight: 600,
              alignSelf: 'center',
            }}
          >
            {tl(MAP_T.legend)}:
          </span>
          {TOP_CITIES.map((city) => (
            <div
              key={city.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(204,16,32,0.05)',
                border: '1px solid rgba(204,16,32,0.12)',
                borderRadius: 99,
                padding: '4px 14px',
              }}
            >
              <span style={{ color: '#CC1020', fontSize: '0.82rem' }}>❤</span>
              <span style={{ fontWeight: 700, color: '#1A0408', fontSize: '0.85rem' }}>
                {city.count}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                {tl(MAP_T.hearts)}
              </span>
              <span style={{ color: 'var(--text-body)', fontSize: '0.85rem', fontWeight: 600 }}>
                · {city.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
