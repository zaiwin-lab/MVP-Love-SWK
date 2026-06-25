import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kamek Sayang Sarawak — A Global Love Letter to Sarawak',
  description: 'Join thousands around the world in sending love messages to Sarawak. One Sarawak. One World. One Heart.',
  keywords: ['Sarawak', 'Malaysia', 'Hari Sarawak', 'love', 'community', 'Borneo'],
  openGraph: {
    title: 'Kamek Sayang Sarawak — A Global Love Letter to Sarawak',
    description: 'Join thousands around the world in sending love messages to Sarawak.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kamek Sayang Sarawak',
    description: 'A Global Love Letter to Sarawak. One Sarawak. One World. One Heart.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased" style={{ background: '#FFFBF5', color: '#1A0408' }}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
