'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MOCK_WORDS } from '@/lib/mockData'
import { useLang } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

// Palette for word cloud on dark green bg: cream, gold, light greens
const PALETTE = [
  '#EEF5F0', '#C8860A', '#F5E6C0', 'rgba(238,245,240,0.9)',
  '#C8860A', '#EEF5F0', 'rgba(245,230,192,0.95)', '#EEF5F0',
  'rgba(200,134,10,0.85)', '#EEF5F0', 'rgba(238,245,240,0.8)', '#C8860A',
]

const FLOAT_DURATIONS = [2.6, 3.1, 2.3, 3.5, 2.8, 3.8, 2.4, 3.2, 2.9, 3.6, 2.7, 3.3, 2.5, 3.0, 3.4]
const FLOAT_DELAYS    = [0.0, 0.3, 0.6, 0.9, 0.2, 0.5, 0.8, 0.1, 0.4, 0.7, 0.15, 0.45, 0.65, 0.25, 0.55]

// Hero word overrides for big impact
const HERO_WORDS: Record<string, number> = {
  'Home': 5,
  'Family': 4.5,
  'Beautiful': 4,
}

interface WordItemProps {
  text: string
  fontSize: number
  color: string
  isLarge: boolean
  isMed: boolean
  floatAmt: number
  floatDur: number
  floatDelay: number
  entryDelay: number
}

function WordItem({ text, fontSize, color, isLarge, isMed, floatAmt, floatDur, floatDelay, entryDelay }: WordItemProps) {
  return (
    <motion.span
      className="font-display"
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: entryDelay, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.2, filter: `brightness(1.2) drop-shadow(0 0 14px rgba(255,255,255,0.6))` }}
      style={{
        fontSize: `${fontSize}rem`,
        fontWeight: isLarge ? 900 : isMed ? 700 : 400,
        fontStyle: isLarge ? 'italic' : 'normal',
        color,
        cursor: 'default',
        userSelect: 'none',
        letterSpacing: '0.02em',
        textShadow: isLarge ? `0 2px 20px rgba(0,0,0,0.25)` : `0 1px 8px rgba(0,0,0,0.2)`,
        display: 'inline-block',
        lineHeight: 1.2,
        animation: `floatWord${Math.round(floatAmt)} ${floatDur}s ease-in-out ${floatDelay}s infinite`,
      }}
    >
      {text}
    </motion.span>
  )
}

export default function WordCloud() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLang()
  const maxVal = Math.max(...MOCK_WORDS.map(w => w.value))

  return (
    <section className="section-pad" style={{ background: 'var(--green-dark)', position: 'relative', overflow: 'hidden' }}>
      <div className="pua-stripe" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      {/* Inline keyframes for word floating */}
      <style>{`
        @keyframes floatWord4 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes floatWord5 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-7.5px); } }
        @keyframes floatWord6 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
        @keyframes floatWord7 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10.5px); } }
        @keyframes floatWord8 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
      `}</style>

      <div ref={ref} className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2 className="section-title section-title--light">{t(T.words.title) as string}</h2>
          <p className="section-sub section-sub--light">{t(T.words.sub) as string}</p>
          <div className="rule" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(238,245,240,0.08)',
            borderRadius: 'var(--r-lg)',
            padding: 'clamp(2rem, 5vw, 3.5rem) 2rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(0.7rem, 1.5vw, 1.1rem)',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 320,
          }}
        >
          {MOCK_WORDS.map((word, i) => {
            const ratio = word.value / maxVal
            // Check for hero word override
            const heroSize = HERO_WORDS[word.text]
            const fontSize = heroSize ?? (0.78 + ratio * 2.4)
            const color = PALETTE[i % PALETTE.length]
            const isLarge = heroSize ? true : ratio > 0.65
            const isMed = !isLarge && ratio > 0.35

            return (
              <WordItem
                key={word.text}
                text={word.text}
                fontSize={fontSize}
                isLarge={isLarge}
                isMed={isMed}
                color={color}
                floatAmt={4 + i % 5}
                floatDur={FLOAT_DURATIONS[i % FLOAT_DURATIONS.length]}
                floatDelay={FLOAT_DELAYS[i % FLOAT_DELAYS.length]}
                entryDelay={i * 0.05}
              />
            )
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{ textAlign: 'center', color: 'rgba(238,245,240,0.35)', fontSize: '0.78rem', marginTop: '1.25rem', fontFamily: 'var(--font-body, sans-serif)' }}
        >
          Submit your word below and watch it join the cloud
        </motion.p>
      </div>
    </section>
  )
}
