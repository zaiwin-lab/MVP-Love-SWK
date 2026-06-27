'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { MOCK_MESSAGES } from '@/lib/mockData'
import { useLang } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

const SARAWAK = { lat: 1.5533, lng: 110.3592 }

export default function Hero() {
  const [globeReady, setGlobeReady] = useState(false)
  const [dimensions, setDimensions] = useState({ w: 1200, h: 700 })
  const { t } = useLang()
  const words = t(T.hero.title) as string[]

  useEffect(() => {
    const resize = () => setDimensions({ w: window.innerWidth, h: window.innerHeight })
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => setGlobeReady(true), 500)
    return () => clearTimeout(id)
  }, [])

  const arcsData = MOCK_MESSAGES.map(m => ({
    startLat: m.latitude,
    startLng: m.longitude,
    endLat: SARAWAK.lat,
    endLng: SARAWAK.lng,
    color: ['rgba(200,134,10,0.7)', 'rgba(238,245,240,0.5)'],
  }))

  const scrollToForm = () => {
    document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0F2E1C 0%, #1B4E30 55%, #0F2E1C 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Pua kumbu trim — top accent only, 4px */}
      <div className="pua-stripe" />

      {/* Globe — background, right-anchored on desktop */}
      {globeReady && (
        <div style={{
          position: 'absolute',
          right: dimensions.w > 768 ? '-8%' : '-40%',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.28,
          pointerEvents: 'none',
        }}>
          <Globe
            width={Math.min(dimensions.w * 0.72, 720)}
            height={Math.min(dimensions.h, 720)}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            atmosphereColor="#C8860A"
            atmosphereAltitude={0.15}
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.35}
            arcDashGap={0.15}
            arcDashAnimateTime={2800}
            arcStroke={0.5}
            enablePointerInteraction={false}
          />
        </div>
      )}

      {/* Left content — vertically centered */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: 1100,
        margin: '0 auto',
        width: '100%',
      }}>
        <div style={{ maxWidth: 680 }}>

          {/* Campaign badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              border: '1px solid rgba(200,134,10,0.45)',
              borderRadius: 6,
              padding: '6px 16px',
              marginBottom: '2.25rem',
              color: '#C8860A',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-body, sans-serif)',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#C8860A',
              animation: 'heartPulse 2s ease-in-out infinite',
              display: 'inline-block',
            }} />
            {t(T.hero.eyebrow) as string} · Bumi Kenyalang
          </motion.div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display, EB Garamond, Georgia, serif)',
              fontSize: 'clamp(3.2rem, 7vw, 5.8rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#EEF5F0',
              marginBottom: '1.75rem',
              textWrap: 'balance',
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.4 + i * 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  display: 'inline-block',
                  marginRight: i < words.length - 1 ? '0.28em' : 0,
                  color: i === 2 ? '#C8860A' : '#EEF5F0',
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
              color: 'rgba(238,245,240,0.62)',
              fontFamily: 'var(--font-body, sans-serif)',
              lineHeight: 1.75,
              marginBottom: '0.5rem',
              maxWidth: 52,
            }}
          >
            {t(T.hero.tagline) as string}
          </motion.p>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{
              width: 56,
              height: 2,
              background: '#C8860A',
              borderRadius: 2,
              margin: '1.5rem 0 2.25rem',
            }}
          />

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.3 }}
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
              fontFamily: 'var(--font-display, EB Garamond, Georgia, serif)',
              fontStyle: 'italic',
              color: 'rgba(238,245,240,0.48)',
              marginBottom: '2.75rem',
              maxWidth: 480,
              lineHeight: 1.7,
            }}
          >
            {t(T.hero.quote) as string}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}
          >
            <motion.button
              onClick={scrollToForm}
              className="btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{ fontSize: '1rem', padding: '16px 44px' }}
            >
              {t(T.hero.cta) as string}
            </motion.button>

            <span style={{
              color: 'rgba(238,245,240,0.38)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-body, sans-serif)',
              letterSpacing: '0.05em',
            }}>
              {t(T.hero.tagline) as string}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            color: 'rgba(238,245,240,0.28)',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body, sans-serif)',
          }}
        >
          <span>{t(T.hero.scroll) as string}</span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <path d="M7 2v18M2 15l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
