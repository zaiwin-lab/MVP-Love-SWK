'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { MOCK_MESSAGES } from '@/lib/mockData'
import { useLang } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

const SARAWAK = { lat: 1.5533, lng: 110.3592 }

type MsgPoint = { id: string; city: string; country: string; latitude: number; longitude: number }

export default function GlobalMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [renderDims, setRenderDims] = useState({ w: 800, h: 560 })
  const [points, setPoints] = useState<MsgPoint[]>(
    MOCK_MESSAGES.map(m => ({ id: m.id, city: m.city, country: m.country, latitude: m.latitude, longitude: m.longitude }))
  )
  const { t } = useLang()

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

  useEffect(() => {
    fetch('/api/messages?limit=100')
      .then(r => r.json())
      .then(data => {
        if (data.messages?.length > 0) {
          setPoints(data.messages
            .filter((m: MsgPoint) => m.latitude && m.longitude)
            .map((m: MsgPoint) => ({ id: m.id, city: m.city, country: m.country, latitude: m.latitude, longitude: m.longitude }))
          )
        }
      })
      .catch(() => {})
  }, [])

  const arcsData = points.map(m => ({
    startLat: m.latitude,
    startLng: m.longitude,
    endLat: SARAWAK.lat,
    endLng: SARAWAK.lng,
    color: ['rgba(200,134,10,0.8)', 'rgba(238,245,240,0.4)'],
  }))

  return (
    <section id="global-map" className="section-pad" style={{ background: 'var(--green-dark)', position: 'relative', overflow: 'hidden' }}>
      <div className="pua-stripe" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2 className="section-title section-title--light">{t(T.map.title) as string}</h2>
          <p className="section-sub section-sub--light">{t(T.map.sub) as string}</p>
          <div className="rule" />
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1 }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(238,245,240,0.08)',
            borderRadius: 'var(--r-lg)',
            padding: '1.25rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Globe
            width={renderDims.w}
            height={renderDims.h}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            atmosphereColor="#C8860A"
            atmosphereAltitude={0.18}
            arcsData={arcsData}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.18}
            arcDashAnimateTime={2200}
            arcStroke={0.6}
            htmlElementsData={points}
            htmlLat={(d: object) => (d as MsgPoint).latitude}
            htmlLng={(d: object) => (d as MsgPoint).longitude}
            htmlElement={(d: object) => {
              const m = d as MsgPoint
              const wrap = document.createElement('div')
              wrap.style.cssText = 'display:flex; flex-direction:column; align-items:center; pointer-events:none; gap:3px;'

              const dot = document.createElement('div')
              dot.style.cssText = `
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #C8860A;
                box-shadow: 0 0 6px 3px rgba(200,134,10,0.5), 0 0 14px 6px rgba(200,134,10,0.18);
                animation: heartPulse 2.2s ease-in-out infinite;
              `

              const label = document.createElement('span')
              label.textContent = m.city
              label.style.cssText = `
                font-size: 8.5px;
                font-family: sans-serif;
                color: rgba(238,245,240,0.65);
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
          style={{ textAlign: 'center', color: 'rgba(238,245,240,0.25)', fontSize: '0.78rem', marginTop: '1rem', fontFamily: 'var(--font-body, sans-serif)' }}
        >
          {points.length} {t(T.map.hint) as string}
        </motion.p>
      </div>
    </section>
  )
}
