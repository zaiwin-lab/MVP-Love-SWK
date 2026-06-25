'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  data: Record<string, unknown>
  onReset: () => void
}

const HEART_POSITIONS = [8, 18, 29, 40, 51, 62, 73, 84, 92, 5, 35, 65]

export default function ThankYou({ data, onReset }: Props) {
  const name = data.name as string | undefined
  const city = data.city as string
  const country = data.country as string
  const url = typeof window !== 'undefined' ? window.location.href : 'https://kameknusamapalove.com'
  const shareText = `❤️ I just added my love message to Sarawak on the Kamek Sayang Sarawak Global Love Map. Add yours here: ${url} #KamekSayangSarawak #HariSarawak`

  // Auto-scroll to map after 4s
  useEffect(() => {
    const t = setTimeout(() => {
      document.getElementById('global-map')?.scrollIntoView({ behavior: 'smooth' })
    }, 4500)
    return () => clearTimeout(t)
  }, [])

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    // Brief visual feedback via title momentarily changing
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
        className="glass"
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
            color: '#FFD700',
            marginBottom: '1rem',
          }}
        >
          {name ? `Thank you, ${name}!` : 'Your love is on the map!'}
        </h2>

        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
          color: 'rgba(245,240,232,0.8)',
          lineHeight: 1.8,
          marginBottom: '0.75rem',
          maxWidth: 460,
          margin: '0 auto 0.75rem',
        }}>
          Your message is now part of the{' '}
          <strong style={{ color: '#E8192C' }}>Global Love Letter to Sarawak.</strong>
        </p>

        <p style={{ color: '#FFD700', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
          Your love pin glows from <strong>{city}, {country}</strong> 🌟
        </p>

        <p style={{ color: 'rgba(245,240,232,0.35)', fontSize: '0.82rem', marginBottom: '2rem' }}>
          Your message will appear on the map shortly after review. 💛
        </p>

        {/* Share buttons */}
        <p style={{ color: 'rgba(245,240,232,0.45)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Spread the love
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
              transition: 'opacity 0.2s',
            }}
          >
            💬 WhatsApp
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
            📘 Facebook
          </a>
          <button
            onClick={copyLink}
            style={{
              background: 'rgba(255,215,0,0.12)',
              border: '1px solid rgba(255,215,0,0.4)',
              color: '#FFD700',
              borderRadius: 99,
              padding: '11px 22px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
            }}
          >
            🔗 Copy Link
          </button>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('global-map')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'rgba(232,25,44,0.12)',
              border: '1px solid rgba(232,25,44,0.3)',
              color: '#ff8899',
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
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(245,240,232,0.5)',
              borderRadius: 12,
              padding: '11px 22px',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
            }}
          >
            + Submit Another
          </button>
        </div>

        {/* Auto scroll note */}
        <p style={{ color: 'rgba(245,240,232,0.2)', fontSize: '0.74rem', marginTop: '1.5rem' }}>
          You&apos;ll be taken to the map in a moment…
        </p>
      </motion.div>
    </motion.div>
  )
}
