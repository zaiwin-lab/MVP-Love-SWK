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
        className="card"
        style={{ padding: 'clamp(2rem, 5vw, 3.5rem)', position: 'relative', zIndex: 20 }}
      >
        {/* Hornbill icon as success mark */}
        <div style={{ marginBottom: '1.25rem' }}>
          <svg viewBox="0 0 60 42" width="48" height="34" style={{ opacity: 0.7 }}>
            <ellipse cx="24" cy="28" rx="20" ry="11" fill="#C8860A"/>
            <circle cx="44" cy="16" r="8" fill="#C8860A"/>
            <path d="M 42,8 Q 58,3 60,7 Q 57,12 46,11 Z" fill="#CC1020"/>
            <path d="M 46,16 Q 62,14 62,18 Q 60,22 46,20 Z" fill="#CC1020"/>
            <circle cx="46" cy="14" r="2" fill="#0F2E1C"/>
          </svg>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display, serif)',
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 700,
            color: 'var(--green)',
            marginBottom: '1rem',
          }}
        >
          {name ? `Thank you, ${name}!` : (t(T.thankyou.heading) as string)}
        </h2>

        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
          color: 'var(--ink-mid)',
          fontFamily: 'var(--font-body, sans-serif)',
          lineHeight: 1.8,
          maxWidth: 460,
          margin: '0 auto 0.75rem',
        }}>
          {t(T.thankyou.sub) as string}
        </p>

        <p style={{ color: 'var(--green)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-body, sans-serif)' }}>
          {t(T.thankyou.pin) as string} <strong>{city}, {country}</strong>
        </p>

        <p style={{ color: 'var(--ink-faint)', fontSize: '0.82rem', marginBottom: '2rem', fontFamily: 'var(--font-body, sans-serif)' }}>
          Your message will appear on the map shortly after review.
        </p>

        {/* Share buttons */}
        <p style={{ color: 'var(--ink-muted)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'var(--font-body, sans-serif)' }}>
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
              background: copied ? 'var(--green-light)' : 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--green)',
              borderRadius: 99,
              padding: '11px 22px',
              fontWeight: 700,
              fontFamily: 'var(--font-body, sans-serif)',
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
            className="btn-outline"
            style={{ fontSize: '0.88rem', padding: '11px 22px' }}
          >
            See My Pin on the Map
          </button>
          <button
            onClick={onReset}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--ink-muted)',
              borderRadius: 'var(--r-md)',
              padding: '11px 22px',
              fontWeight: 600,
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.88rem',
              cursor: 'pointer',
            }}
          >
            + {t(T.thankyou.another) as string}
          </button>
        </div>

        {/* Auto scroll note */}
        <p style={{ color: 'var(--ink-faint)', fontSize: '0.74rem', marginTop: '1.5rem', fontFamily: 'var(--font-body, sans-serif)' }}>
          You&apos;ll be taken to the map in a moment…
        </p>
      </motion.div>
    </motion.div>
  )
}
