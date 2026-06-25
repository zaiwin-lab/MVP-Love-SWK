'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { MOCK_MESSAGES } from '@/lib/mockData'

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

const SARAWAK = { lat: 1.5533, lng: 110.3592 }

const words = ['Kamek', 'Sayang', 'Sarawak']

export default function Hero() {
  const starsRef = useRef<HTMLDivElement>(null)
  const [globeReady, setGlobeReady] = useState(false)
  const [dimensions, setDimensions] = useState({ w: 1200, h: 700 })

  useEffect(() => {
    // Build star field
    const container = starsRef.current
    if (!container) return
    for (let i = 0; i < 150; i++) {
      const s = document.createElement('div')
      s.className = 'star'
      const sz = Math.random() * 2.5 + 0.5
      s.style.cssText = `
        width:${sz}px; height:${sz}px;
        left:${Math.random() * 100}%; top:${Math.random() * 100}%;
        --dur:${(Math.random() * 4 + 2).toFixed(1)}s;
        --delay:${(Math.random() * 5).toFixed(1)}s;
      `
      container.appendChild(s)
    }

    // Dimensions
    const resize = () => setDimensions({
      w: window.innerWidth,
      h: window.innerHeight,
    })
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Slight delay before showing globe so we get the stagger
  useEffect(() => {
    const t = setTimeout(() => setGlobeReady(true), 600)
    return () => clearTimeout(t)
  }, [])

  const arcsData = MOCK_MESSAGES.map(m => ({
    startLat: m.latitude,
    startLng: m.longitude,
    endLat: SARAWAK.lat,
    endLng: SARAWAK.lng,
    color: ['rgba(255,215,0,0.9)', 'rgba(232,25,44,0.9)'],
  }))

  const scrollToForm = () => {
    document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 30%, #1a050a 0%, #080810 65%)',
      }}
    >
      {/* Star field */}
      <div ref={starsRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Globe background — centered, large, fills hero */}
      {globeReady && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.72,
            pointerEvents: 'none',
          }}
        >
          <Globe
            width={Math.min(dimensions.w, 900)}
            height={Math.min(dimensions.h, 700)}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            atmosphereColor="#E8192C"
            atmosphereAltitude={0.18}
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.35}
            arcDashGap={0.15}
            arcDashAnimateTime={2400}
            arcStroke={0.6}
            htmlElementsData={MOCK_MESSAGES}
            htmlLat={(d: object) => (d as typeof MOCK_MESSAGES[0]).latitude}
            htmlLng={(d: object) => (d as typeof MOCK_MESSAGES[0]).longitude}
            htmlElement={(d: object) => {
              const m = d as typeof MOCK_MESSAGES[0]
              const el = document.createElement('div')
              el.className = 'globe-heart'
              el.innerHTML = '❤️'
              el.style.fontSize = '20px'
              el.title = `${m.name} · ${m.city}`
              return el
            }}
            enablePointerInteraction={false}
          />
        </div>
      )}

      {/* Dark overlay — stronger at bottom so text pops */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(8,8,16,0.1) 0%, rgba(8,8,16,0.6) 100%),
            linear-gradient(to bottom, rgba(8,8,16,0.2) 0%, rgba(8,8,16,0.0) 40%, rgba(8,8,16,0.65) 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Content overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(232,25,44,0.12)',
            border: '1px solid rgba(232,25,44,0.35)',
            borderRadius: 99,
            padding: '6px 18px',
            marginBottom: '2rem',
            color: '#ffaaaa',
            fontSize: '0.78rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <span style={{ animation: 'heartPulse 2s infinite', display: 'inline-block' }}>❤️</span>
          A Global Love Letter
        </motion.div>

        {/* Main title — word by word stagger */}
        <h1
          style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 900,
            fontStyle: 'italic',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            maxWidth: 900,
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.6 + i * 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                display: 'inline-block',
                color: i === 2 ? 'transparent' : '#F5F0E8',
                background: i === 2 ? 'linear-gradient(90deg, #E8192C 0%, #FFD700 60%, #E8192C 100%)' : undefined,
                backgroundSize: i === 2 ? '200% auto' : undefined,
                WebkitBackgroundClip: i === 2 ? 'text' : undefined,
                WebkitTextFillColor: i === 2 ? 'transparent' : undefined,
                backgroundClip: i === 2 ? 'text' : undefined,
                animation: i === 2 ? 'shimmer 5s linear infinite' : undefined,
                marginRight: i < 2 ? '0.3em' : 0,
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
          transition={{ duration: 1.1, delay: 1.4 }}
          style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.65)',
            marginBottom: '0.6rem',
            fontWeight: 500,
          }}
        >
          One Sarawak · One World · One Heart
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.65 }}
          style={{
            width: 80,
            height: 2,
            background: 'linear-gradient(90deg, #E8192C, #FFD700)',
            borderRadius: 2,
            margin: '1.5rem auto 2.5rem',
          }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.85 }}
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'rgba(245,240,232,0.55)',
            fontStyle: 'italic',
            marginBottom: '3rem',
            maxWidth: 500,
          }}
        >
          &ldquo;Every message is a love note carried by the wind back to Sarawak.&rdquo;
        </motion.p>

        {/* CTA button */}
        <motion.button
          onClick={scrollToForm}
          className="btn-primary"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: '18px 52px',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ❤️
          </motion.span>
          Leave Your Love Message
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(245,240,232,0.3)',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            <span>Explore</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path d="M8 2v20M2 16l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
