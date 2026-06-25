'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/contexts/LanguageContext'
import { LANGS } from '@/lib/translations'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      background: 'rgba(180,20,30,0.10)',
      borderRadius: 99,
      padding: '3px',
      border: '1px solid rgba(180,20,30,0.18)',
    }}>
      {LANGS.map(l => (
        <motion.button
          key={l.code}
          onClick={() => setLang(l.code)}
          whileTap={{ scale: 0.93 }}
          style={{
            padding: '5px 11px',
            borderRadius: 99,
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            transition: 'all 0.2s',
            background: lang === l.code ? '#CC1020' : 'transparent',
            color: lang === l.code ? '#ffffff' : '#8B1020',
            boxShadow: lang === l.code ? '0 2px 10px rgba(204,16,32,0.35)' : 'none',
          }}
        >
          {l.native}
        </motion.button>
      ))}
    </div>
  )
}
