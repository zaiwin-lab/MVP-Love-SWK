'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

interface Props {
  data: Record<string, unknown>
  onReset: () => void
}

const HEART_POSITIONS = [8, 18, 29, 40, 51, 62, 73, 84, 92, 5, 35, 65]

export default function ThankYou({ data, onReset }: Props) {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  const name = data.name as string | undefined
  const city = data.city as string
  const country = data.country as string
  const url = typeof window !== 'undefined' ? window.location.href : 'https://kameknusamapalove.com'
  const shareText = (t(T.thankyou.shareMsg) as string).replace('{url}', url)

  // Auto-scroll to map after 4s
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('global-map')?.scrollIntoView({ behavior: 'smooth' })
    }, 4500)
    return () => clearTimeout(timer)
  }, [])

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'relative', textAlign: 'center' }}
    >
      {/* Falling hearts overlay */}
      <div className="heart-rain" style={{ position: 'absolute', inset: 0, height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 10 }}>
        {HEART_POSITIONS.map((left, i) => (
          <div
            key={i}
            className="falling-heart"
            style={{
              left: `${left}%`,
              '--duration': `${2.2 + (i % 4) * 0.4}s`,
              '--delay': `${(i * 0.18).toFixed(2)}s`,
              '--size': `${1.1 + (i % 3) * 0.4}rem`,
              '--rotation': `${(i % 2 === 0 ? 1 : -1) * (i * 7 % 20)}deg`,
            } as React.CSSProperties}
          >
            ❤️
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
        className="glass-light"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem)', position: 'relative', zIndex: 20 }}
      >
        {/* Big animated heart */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 1.2, times: [0, 0.4, 0.7, 1], delay: 0.5 }}
          style={{ fontSize: '4.5rem', lineHeight: 1, marginBottom: '1.25rem' }}
        >
          ❤️
        </motion.div>

        <h2
          className="font-playfair"
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 800,
            fontStyle: 'italic',
            color: '#CC1020',
            marginBottom: '1rem',
          }}
        >
          {name ? `Thank you, ${name}!` : (t(T.thankyou.heading) as string)}
        </h2>

        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
          color: '#4A1A1A',
          lineHeight: 1.8,
          marginBottom: '0.75rem',
          maxWidth: 460,
          margin: '0 auto 0.75rem',
        }}>
          {t(T.thankyou.sub) as string}
        </p>

        <p style={{ color: '#CC1020', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
          {t(T.thankyou.pin) as string} <strong>{city}, {country}</strong> 🌟
        </p>

        <p style={{ color: '#9A5A5A', fontSize: '0.82rem', marginBottom: '2rem' }}>
          Your message will appear on the map shortly after review. 💛
        </p>

        {/* Share buttons */}
        <p style={{ color: '#9A5A5A', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          {t(T.thankyou.share) as string}
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.75rem' }}>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#25D366',
              color: '#fff',
              borderRadius: 99,
              padding: '11px 22px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
            }}
          >
            💬 {t(T.thankyou.whatsapp) as string}
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#1877F2',
              color: '#fff',
              borderRadius: 99,
              padding: '11px 22px',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
            }}
          >
            📘 {t(T.thankyou.facebook) as string}
          </a>
          <button
            onClick={copyLink}
            style={{
              background: copied ? 'rgba(204,16,32,0.12)' : 'rgba(204,16,32,0.08)',
              border: '1px solid rgba(204,16,32,0.25)',
              color: '#CC1020',
              borderRadius: 99,
              padding: '11px 22px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              transition: 'all 0.2s',
            }}
          >
            🔗 {copied ? (t(T.thankyou.copied) as string) : (t(T.thankyou.copy) as string)}
          </button>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('global-map')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'rgba(204,16,32,0.08)',
              border: '1px solid rgba(204,16,32,0.2)',
              color: '#CC1020',
              borderRadius: 12,
              padding: '11px 22px',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
            }}
          >
            🌍 See My Pin on the Map
          </button>
          <button
            onClick={onReset}
            style={{
              background: 'rgba(74,26,26,0.04)',
              border: '1px solid rgba(74,26,26,0.12)',
              color: 'rgba(74,26,26,0.5)',
              borderRadius: 12,
              padding: '11px 22px',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
            }}
          >
            + {t(T.thankyou.another) as string}
          </button>
        </div>

        {/* Auto scroll note */}
        <p style={{ color: 'rgba(74,26,26,0.25)', fontSize: '0.74rem', marginTop: '1.5rem' }}>
          You&apos;ll be taken to the map in a moment…
        </p>
      </motion.div>
    </motion.div>
  )
}
