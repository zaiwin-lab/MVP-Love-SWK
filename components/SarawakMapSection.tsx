'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'
import type { Lang } from '@/lib/translations'

const LANG_T = {
  title:  { en: 'Sarawak Love Map', ms: 'Peta Cinta Sarawak', iban: 'Peta Pengarap Sarawak', zh: '砂拉越爱心地图' },
  sub:    { en: 'Every registration plants a heart in your division — watch Bumi Kenyalang bloom', ms: 'Setiap pendaftaran menanam hati di bahagian anda — lihat Bumi Kenyalang mekar', iban: 'Tiap pendaftaran nutuka ati ba bahagian nuan — ninga Bumi Kenyalang merekah', zh: '每次注册在您的区域种下一颗心——见证布米肯雅兰盛放' },
  total:  { en: 'hearts blooming across Sarawak', ms: 'hati mekar di seluruh Sarawak', iban: 'ati merekah dalam Sarawak', zh: '颗心在砂拉越盛放' },
  cta:    { en: 'Submit a message below to plant your heart on this map ❤️', ms: 'Hantar mesej di bawah untuk tanam hati di peta ini ❤️', iban: 'Hantar ensera bah nulung nutuka ati ba peta tu ❤️', zh: '在下方提交留言，在此地图上种下您的心 ❤️' },
}

// 12 Sarawak divisions — polygon points in SVG viewBox 0 0 720 490
// NW coast faces upper-left; S/Indonesia border faces lower-right
const DIVISIONS = [
  {
    id: 'kuching',   name: 'Kuching',
    points: '20,445 44,406 67,378 90,356 120,332 136,370 116,415 80,437',
    cx: 83,  cy: 390, initHearts: 89,
  },
  {
    id: 'samarahan', name: 'Samarahan',
    points: '90,356 120,332 158,310 168,342 150,374 136,370',
    cx: 135, cy: 348, initHearts: 42,
  },
  {
    id: 'serian',    name: 'Serian',
    points: '80,437 116,415 136,370 150,374 168,342 188,396 162,446 118,463 72,463 28,452',
    cx: 120, cy: 420, initHearts: 28,
  },
  {
    id: 'sri_aman',  name: 'Sri Aman',
    points: '158,310 200,286 222,308 206,345 186,362 168,342',
    cx: 190, cy: 326, initHearts: 18,
  },
  {
    id: 'betong',    name: 'Betong',
    points: '200,286 244,266 260,290 243,315 222,308',
    cx: 234, cy: 293, initHearts: 12,
  },
  {
    id: 'sarikei',   name: 'Sarikei',
    points: '244,266 290,248 308,272 288,296 260,290',
    cx: 278, cy: 274, initHearts: 22,
  },
  {
    id: 'sibu',      name: 'Sibu',
    points: '290,248 334,230 378,213 402,240 380,266 340,280 308,272',
    cx: 347, cy: 250, initHearts: 52,
  },
  {
    id: 'mukah',     name: 'Mukah',
    points: '378,213 422,195 468,176 490,202 462,228 426,242 402,240',
    cx: 434, cy: 214, initHearts: 15,
  },
  {
    id: 'bintulu',   name: 'Bintulu',
    points: '468,176 505,158 542,138 560,162 540,198 502,212 490,202',
    cx: 516, cy: 177, initHearts: 31,
  },
  {
    // Kapit = large interior — fills all space inland of coastal divisions
    id: 'kapit',     name: 'Kapit',
    points: '28,452 72,463 118,463 162,446 188,396 168,342 186,362 206,345 222,308 243,315 260,290 288,296 308,272 340,280 380,266 402,240 426,242 462,228 490,202 502,212 540,198 558,246 545,326 560,346 585,372 550,416 508,448 462,464 408,470 352,468 292,460 228,450 165,440 108,432 62,442',
    cx: 360, cy: 380, initHearts: 35,
  },
  {
    id: 'miri',      name: 'Miri',
    points: '542,138 575,116 610,94 628,78 635,65 628,54 632,44 642,36 645,78 628,148 610,220 585,292 560,346 545,326 558,246 540,198 560,162',
    cx: 583, cy: 196, initHearts: 47,
  },
  {
    id: 'limbang',   name: 'Limbang',
    points: '642,36 650,30 660,22 670,16 688,32 672,98 656,168 645,78',
    cx: 659, cy: 66,  initHearts: 15,
  },
]

// Exported so SubmissionForm can show the same list
export const SARAWAK_DIVISION_OPTIONS = DIVISIONS.map(d => ({ id: d.id, name: d.name }))

function heatFill(count: number, hovered: boolean, isNew: boolean): string {
  if (isNew)          return 'rgba(232,25,44,0.58)'
  if (hovered)        return 'rgba(204,16,32,0.42)'
  if (count === 0)    return 'rgba(27,78,48,0.07)'
  if (count < 15)     return 'rgba(204,16,32,0.14)'
  if (count < 30)     return 'rgba(204,16,32,0.25)'
  if (count < 55)     return 'rgba(204,16,32,0.37)'
  return                     'rgba(204,16,32,0.52)'
}

// Golden-angle spiral — distributes dots evenly within a division area
function scatter(cx: number, cy: number, count: number, spread = 30) {
  return Array.from({ length: Math.min(count, 22) }, (_, i) => {
    const angle = i * 137.508 * (Math.PI / 180)
    const r = spread * Math.sqrt((i + 0.5) / Math.min(count, 22))
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })
}

export default function SarawakMapSection() {
  const { lang } = useLang()
  const t = (o: Record<string, string>) => (o[lang as Lang] ?? o.en)

  const [hearts, setHearts] = useState<Record<string, number>>(
    () => Object.fromEntries(DIVISIONS.map(d => [d.id, d.initHearts]))
  )
  const [hovered, setHovered] = useState<string | null>(null)
  const [newHeart, setNewHeart] = useState<string | null>(null)

  useEffect(() => {
    // Merge with any locally-persisted additions
    try {
      const stored = localStorage.getItem('swk-div-hearts')
      if (stored) {
        const saved = JSON.parse(stored) as Record<string, number>
        setHearts(prev => {
          const next = { ...prev }
          Object.keys(saved).forEach(k => { if (k in next) next[k] = Math.max(next[k], saved[k]) })
          return next
        })
      }
    } catch { /* storage unavailable */ }

    const handler = (e: Event) => {
      const divId = (e as CustomEvent<{ divisionId: string }>).detail?.divisionId
      if (!divId || !DIVISIONS.find(d => d.id === divId)) return
      setHearts(prev => {
        const next = { ...prev, [divId]: (prev[divId] ?? 0) + 1 }
        try { localStorage.setItem('swk-div-hearts', JSON.stringify(next)) } catch { /* ignore */ }
        return next
      })
      setNewHeart(divId)
      setTimeout(() => setNewHeart(null), 2400)
    }
    window.addEventListener('sarawak-heart-added', handler)
    return () => window.removeEventListener('sarawak-heart-added', handler)
  }, [])

  const total = Object.values(hearts).reduce((a, b) => a + b, 0)
  const topDivisions = [...DIVISIONS]
    .sort((a, b) => (hearts[b.id] ?? 0) - (hearts[a.id] ?? 0))
    .slice(0, 5)

  return (
    <section id="sarawak-map" className="section-pad bg-pattern" style={{ background: '#FFFBF5', position: 'relative', overflow: 'hidden' }}>
      <div className="pua-kumbu-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <motion.div
            animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.8, repeat: Infinity }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(204,16,32,0.08)', border: '1px solid rgba(204,16,32,0.22)',
              borderRadius: 99, padding: '6px 18px', marginBottom: '1.2rem',
              fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#CC1020', fontWeight: 700,
            }}
          >
            ❤ {total.toLocaleString()} {t(LANG_T.total)}
          </motion.div>
          <h2 className="section-title-light">{t(LANG_T.title)}</h2>
          <p className="section-sub-light">{t(LANG_T.sub)}</p>
          <div className="divider" />
        </motion.div>

        {/* SVG Map */}
        <motion.div
          className="glass-light"
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 1 }}
          style={{ padding: '1.5rem 1rem', position: 'relative' }}
        >
          <svg viewBox="0 0 720 490" style={{ width: '100%', height: 'auto' }} role="img" aria-label="Sarawak Division Love Map">
            <defs>
              <filter id="divGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="dotGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.2" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <radialGradient id="seaGrad" cx="30%" cy="45%" r="70%">
                <stop offset="0%" stopColor="#cce8f8" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#9ec8e8" stopOpacity="0.22"/>
              </radialGradient>
            </defs>

            {/* Sea background */}
            <rect width="720" height="490" fill="url(#seaGrad)" rx="14"/>
            <text x="140" y="185" fontSize="9" fill="rgba(70,120,170,0.42)" fontStyle="italic" fontFamily="Georgia,serif" textAnchor="middle">South China Sea</text>
            <text x="420" y="44" fontSize="8" fill="rgba(70,120,170,0.32)" fontStyle="italic" fontFamily="Georgia,serif" textAnchor="middle">South China Sea</text>

            {/* Divisions */}
            {DIVISIONS.map(div => {
              const count = hearts[div.id] ?? 0
              const isH   = hovered === div.id
              const isN   = newHeart === div.id
              const dots  = scatter(div.cx, div.cy, count)
              const major = ['kuching', 'sibu', 'miri', 'kapit'].includes(div.id)

              return (
                <g key={div.id} onMouseEnter={() => setHovered(div.id)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
                  <polygon
                    points={div.points}
                    fill={heatFill(count, isH, isN)}
                    stroke={isH || isN ? '#CC1020' : 'rgba(150,35,35,0.45)'}
                    strokeWidth={isH || isN ? 2 : 0.9}
                    strokeLinejoin="round"
                    filter={isN ? 'url(#divGlow)' : undefined}
                    style={{ transition: 'fill 0.35s, stroke-width 0.2s' }}
                  />

                  {/* Heart dots scattered within division */}
                  {dots.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={2.4} fill="#E8192C" opacity={0.72} filter="url(#dotGlow)"/>
                  ))}

                  {/* Division label + count */}
                  {(isH || major || count > 0) && (
                    <g style={{ pointerEvents: 'none' }}>
                      <text x={div.cx} y={div.cy - 5} fontSize={div.id === 'kuching' ? 9.5 : 7.5}
                        fontWeight={isH || div.id === 'kuching' ? '700' : '500'}
                        fill={isH ? '#CC1020' : '#1A0408'} textAnchor="middle" fontFamily="Inter,sans-serif">
                        {div.name}
                      </text>
                      <text x={div.cx} y={div.cy + 9} fontSize="7" fill="#CC1020" textAnchor="middle" fontFamily="Inter,sans-serif">
                        ❤ {count}
                      </text>
                    </g>
                  )}

                  {/* Pulse ring on new heart */}
                  {isN && (
                    <circle cx={div.cx} cy={div.cy} r="22" fill="none" stroke="#E8192C" strokeWidth="2" opacity="0.45"
                      style={{ animation: 'heartPulse 1.2s ease-out' }}/>
                  )}
                </g>
              )
            })}

            {/* Brunei */}
            <circle cx="636" cy="58" r="4.5" fill="rgba(200,134,10,0.22)" stroke="#C8860A" strokeWidth="0.8"/>
            <text x="622" y="48" fontSize="6.5" fill="rgba(139,94,60,0.65)" textAnchor="middle" fontStyle="italic" fontFamily="Inter,sans-serif">Brunei</text>

            {/* Hornbill watermark */}
            <g transform="translate(650,355) scale(0.5)" opacity="0.09">
              <ellipse cx="20" cy="30" rx="18" ry="12" fill="#1A0408"/>
              <circle cx="38" cy="18" r="9" fill="#1A0408"/>
              <path d="M 35,10 Q 52,4 58,8 Q 55,14 42,14 Z" fill="#C8860A"/>
              <path d="M 44,18 Q 68,16 70,20 Q 68,24 44,22 Z" fill="#CC1020"/>
              <path d="M 4,28 Q -12,35 -8,42 Q 0,38 6,32 Z" fill="#1A0408"/>
              <path d="M 2,32 Q -16,42 -10,50 Q -2,44 4,36 Z" fill="#1A0408"/>
              <path d="M 10,22 Q 20,12 32,16 Q 28,28 14,30 Z" fill="#2A0610"/>
              <circle cx="40" cy="16" r="2" fill="#FFD700"/>
            </g>

            {/* Compass */}
            <g transform="translate(686,468)">
              <circle cx="0" cy="0" r="11" fill="rgba(255,255,255,0.82)" stroke="rgba(204,16,32,0.3)" strokeWidth="0.8"/>
              <text x="0" y="-3" fontSize="6.5" textAnchor="middle" fill="#CC1020" fontWeight="700" fontFamily="Inter,sans-serif">N</text>
              <line x1="0" y1="-1.5" x2="0" y2="2" stroke="#CC1020" strokeWidth="0.9"/>
            </g>
          </svg>

          {/* Heat legend */}
          <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#9A5A5A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Hearts:</span>
            {([['< 15', 5], ['15–29', 18], ['30–54', 38], ['55+', 60]] as [string, number][]).map(([label, val]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.7rem', color: '#4A1A1A' }}>
                <div style={{ width: 16, height: 10, borderRadius: 3, background: heatFill(val, false, false), border: '1px solid rgba(150,35,35,0.3)' }}/>
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top 5 division leaderboard */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}
        >
          {topDivisions.map((d, i) => (
            <div key={d.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: i === 0 ? 'rgba(204,16,32,0.12)' : 'rgba(204,16,32,0.06)',
              border: `1px solid rgba(204,16,32,${i === 0 ? 0.3 : 0.15})`,
              borderRadius: 99, padding: '5px 14px', fontSize: '0.75rem', color: '#1A0408',
            }}>
              <span style={{ color: '#CC1020', fontWeight: 800 }}>{i + 1}</span>
              <span style={{ fontWeight: 700 }}>{d.name}</span>
              <span style={{ color: '#CC1020' }}>❤ {hearts[d.id]}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.83rem', marginTop: '1.2rem' }}
        >
          {t(LANG_T.cta)}
        </motion.p>
      </div>
    </section>
  )
}
