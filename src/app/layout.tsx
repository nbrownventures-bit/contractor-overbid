import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    apple: '/icon.svg',
  },
  title: 'ContractorOverBid — AI-Powered Contractor Quote Analysis',
  description:
    'Get an AI-powered second opinion on your contractor quote in 60 seconds. Find out if you\'re being overcharged and save thousands on your next home project.',
  keywords: [
    'contractor quote analysis',
    'contractor overcharging',
    'home improvement costs',
    'contractor pricing',
    'second opinion contractor',
    'contractor bid review',
  ],
  openGraph: {
    title: 'ContractorOverBid — Are You Getting OverBid?',
    description:
      'Get an AI-powered second opinion on your contractor quote in 60 seconds. Find out if you\'re being overcharged.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://contractor-overbid.vercel.app',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Contractor OverBid - AI Quote Analysis' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContractorOverBid — Are You Getting OverBid?',
    description:
      'Get an AI-powered second opinion on your contractor quote in 60 seconds. Find out if you\'re being overcharged.',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-navy-900 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
