'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import LanguageSwitcher from './LanguageSwitcher'

export default function StickyNav() {
  const [visible, setVisible] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="sticky-nav"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
        >
          {/* Brand mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 28,
              background: 'var(--green)',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
                <path d="M10 17s-7-4.5-7-9a4 4 0 0 1 7-2.66A4 4 0 0 1 17 8c0 4.5-7 9-7 9z" fill="#C8860A"/>
              </svg>
            </div>
            <span style={{
              fontFamily: 'var(--font-display, EB Garamond, serif)',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--green)',
              letterSpacing: '-0.01em',
            }}>
              {t(T.nav.brand) as string}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <LanguageSwitcher />
            <button
              className="btn-primary"
              onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            >
              {t(T.nav.cta) as string}
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
