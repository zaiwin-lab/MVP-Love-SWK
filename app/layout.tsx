import type { Metadata } from 'next'
import { EB_Garamond, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '600', '700'],
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
    <html lang="en" className={`${garamond.variable} ${sourceSans.variable}`}>
      <body className="antialiased" style={{ background: '#F7F8F5', color: '#0F1F15' }}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
