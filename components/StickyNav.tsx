'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StickyNav() {
  const [visible, setVisible] = useState(false)

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
                color: '#F5F0E8',
              }}
            >
              Kamek Sayang Sarawak
            </span>
          </div>

          <button
            className="btn-primary"
            onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '9px 22px', fontSize: '0.85rem' }}
          >
            Leave a Message ❤️
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
