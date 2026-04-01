'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 group">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-4.5 h-4.5 text-white" style={{width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              <img src="/icon.svg" alt="" className="w-7 h-7" />
              Contractor<span className="text-teal-600">OverBid</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/analyze"
              className="btn-teal px-5 py-2 rounded-lg text-sm inline-block"
            >
              Get Free Analysis
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 animate-fadeIn">
            <nav className="flex flex-col gap-2">
              <Link
                href="/#how-it-works"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2.5 px-3 rounded-lg hover:bg-slate-50"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/analyze"
                className="btn-teal px-4 py-3 rounded-lg text-sm font-semibold text-center mt-1 inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Free Analysis
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
