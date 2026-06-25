'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { MOCK_MESSAGES } from '@/lib/mockData'

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

const SARAWAK = { lat: 1.5533, lng: 110.3592 }

export default function GlobalMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [renderDims, setRenderDims] = useState({ w: 800, h: 560 })

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const w = Math.min(containerRef.current.offsetWidth - 40, 960)
      const h = window.innerWidth < 768 ? 380 : 600
      setRenderDims({ w, h })
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
    color: ['rgba(255,215,0,0.9)', 'rgba(232,25,44,0.9)'],
  }))

  return (
    <section id="global-map" className="section-pad" style={{ background: '#090912', position: 'relative', overflow: 'hidden' }}>
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
            width={renderDims.w}
            height={renderDims.h}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            atmosphereColor="#E8192C"
            atmosphereAltitude={0.22}
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.18}
            arcDashAnimateTime={2200}
            arcStroke={0.6}
            htmlElementsData={MOCK_MESSAGES}
            htmlLat={(d: object) => (d as typeof MOCK_MESSAGES[0]).latitude}
            htmlLng={(d: object) => (d as typeof MOCK_MESSAGES[0]).longitude}
            htmlElement={(d: object) => {
              const m = d as typeof MOCK_MESSAGES[0]
              const wrap = document.createElement('div')
              wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; pointer-events:none; gap:3px;'

              const dot = document.createElement('div')
              dot.style.cssText = `
                width: 9px;
                height: 9px;
                border-radius: 50%;
                background: #E8192C;
                box-shadow: 0 0 6px 3px rgba(232,25,44,0.55), 0 0 14px 6px rgba(232,25,44,0.2);
                animation: heartPulse 2.2s ease-in-out infinite;
              `

              const label = document.createElement('span')
              label.textContent = m.city
              label.style.cssText = `
                font-size: 8.5px;
                font-family: Inter, sans-serif;
                color: rgba(245,240,232,0.72);
                white-space: nowrap;
                letter-spacing: 0.4px;
                text-shadow: 0 1px 5px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.8);
              `

              wrap.appendChild(dot)
              wrap.appendChild(label)
              return wrap
            }}
            enablePointerInteraction={true}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', color: 'rgba(245,240,232,0.2)', fontSize: '0.78rem', marginTop: '1rem' }}
        >
          {MOCK_MESSAGES.length} love messages · Drag to explore
        </motion.p>
      </div>
    </section>
  )
}
