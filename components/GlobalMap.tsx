'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { MOCK_MESSAGES } from '@/lib/mockData'

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

const SARAWAK = { lat: 1.5533, lng: 110.3592 }

interface TooltipInfo {
  name: string
  city: string
  country: string
  message: string
  x: number
  y: number
}

export default function GlobalMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 800, h: 560 })
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null)

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const w = Math.min(containerRef.current.offsetWidth - 40, 960)
      const h = window.innerWidth < 768 ? 380 : 600
      setDims({ w, h })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const arcsData = MOCK_MESSAGES.map(m => ({
    startLat: m.latitude,
    startLng: m.longitude,
    endLat: SARAWAK.lat,
    endLng: SARAWAK.lng,
    color: ['rgba(255,215,0,0.95)', 'rgba(232,25,44,0.95)'],
  }))

  return (
    <section id="global-map" className="section-pad" style={{ background: '#090912', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,25,44,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1040, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="section-title">Hearts Around the World</h2>
          <p className="section-sub">Every ❤️ is a love note arcing back to Sarawak</p>
          <div className="divider" />
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1 }}
          className="glass"
          style={{ padding: '1.25rem', display: 'flex', justifyContent: 'center', position: 'relative' }}
        >
          <Globe
            width={dims.w}
            height={dims.h}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            atmosphereColor="#E8192C"
            atmosphereAltitude={0.22}
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.18}
            arcDashAnimateTime={2200}
            arcStroke={0.7}
            htmlElementsData={MOCK_MESSAGES}
            htmlLat={(d: object) => (d as typeof MOCK_MESSAGES[0]).latitude}
            htmlLng={(d: object) => (d as typeof MOCK_MESSAGES[0]).longitude}
            htmlElement={(d: object) => {
              const m = d as typeof MOCK_MESSAGES[0]
              const el = document.createElement('div')
              el.className = 'globe-heart'
              el.innerHTML = '❤️'
              el.style.cssText = 'font-size:22px; cursor:pointer;'
              el.addEventListener('mouseenter', (e) => {
                const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
                setTooltip({ name: m.name, city: m.city, country: m.country, message: m.message, x: r.left + r.width / 2, y: r.top })
              })
              el.addEventListener('mouseleave', () => setTooltip(null))
              return el
            }}
            enablePointerInteraction={true}
          />

          {tooltip && (
            <div style={{ position: 'fixed', left: tooltip.x, top: tooltip.y - 12, transform: 'translate(-50%,-100%)', zIndex: 9999, pointerEvents: 'none' }}>
              <div className="glass" style={{ padding: '12px 16px', maxWidth: 240, borderRadius: 14, boxShadow: '0 12px 40px rgba(0,0,0,0.6)', fontSize: '0.82rem' }}>
                <div style={{ color: '#FFD700', fontWeight: 700, marginBottom: 4 }}>{tooltip.name}</div>
                <div style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.74rem', marginBottom: 6 }}>📍 {tooltip.city}, {tooltip.country}</div>
                <div style={{ color: 'rgba(245,240,232,0.8)', lineHeight: 1.5 }}>
                  &ldquo;{tooltip.message.slice(0, 90)}{tooltip.message.length > 90 ? '...' : ''}&rdquo;
                </div>
              </div>
              <div style={{ width: 10, height: 10, background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,215,0,0.15)', transform: 'rotate(45deg)', margin: '-5px auto 0', borderTop: 'none', borderLeft: 'none' }} />
            </div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', color: 'rgba(245,240,232,0.2)', fontSize: '0.78rem', marginTop: '1rem' }}
        >
          {MOCK_MESSAGES.length} love messages · Drag to explore · Hover hearts for messages
        </motion.p>
      </div>
    </section>
  )
}
