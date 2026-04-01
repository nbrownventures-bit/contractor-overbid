'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1">
            <span className="text-xl font-bold text-white">Contractor</span>
            <span className="text-xl font-bold text-orange-500">OverBid</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#how-it-works"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/analyze"
              className="btn-orange px-5 py-2 rounded-lg text-sm font-semibold"
            >
              Get Free Analysis
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/#how-it-works"
                className="text-sm text-gray-400 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/#testimonials"
                className="text-sm text-gray-400 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/analyze"
                className="btn-orange px-5 py-3 rounded-lg text-sm font-semibold text-center"
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
