'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { Lang } from '@/lib/translations'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (obj: Record<Lang, string | string[]>) => string | string[]
}

const Ctx = createContext<LangCtx>({
  lang: 'en',
  setLang: () => {},
  t: (obj) => obj['en'],
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const t = (obj: Record<Lang, string | string[]>) => obj[lang] ?? obj['en']
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
