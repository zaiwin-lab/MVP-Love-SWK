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
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="sticky-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.1rem' }}>❤️</span>
            <span
              style={{
                fontFamily: 'var(--font-playfair, Georgia, serif)',
                fontSize: '1rem',
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#CC1020',
              }}
            >
              {t(T.nav.brand) as string}
            </span>
          </div>

          <LanguageSwitcher />

          <button
            className="btn-primary"
            onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '9px 22px', fontSize: '0.85rem' }}
          >
            {t(T.nav.cta) as string}
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
