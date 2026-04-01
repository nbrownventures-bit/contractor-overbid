import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ContractorOverBid - AI-Powered Contractor Quote Analysis',
  description:
    'Get an AI-powered second opinion on your contractor quote in 60 seconds. Find out if you are being overcharged and save thousands on your next home project.',
  keywords: [
    'contractor quote analysis',
    'contractor overcharging',
    'home improvement costs',
    'contractor pricing',
    'second opinion contractor',
  ],
  openGraph: {
    title: 'ContractorOverBid - Are You Getting OverBid?',
    description:
      'AI-powered second opinion on contractor quotes. Average savings of $2,400 for homeowners.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://contractoroverbid.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContractorOverBid - Are You Getting OverBid?',
    description:
      'AI-powered second opinion on contractor quotes. Average savings of $2,400 for homeowners.',
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
        className={`${inter.className} bg-background text-white min-h-screen flex flex-col`}
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
