import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-1 mb-2">
              <span className="text-lg font-bold text-white">Contractor</span>
              <span className="text-lg font-bold text-orange-500">OverBid</span>
            </div>
            <p className="text-sm text-gray-500">Don&apos;t pay more than you should.</p>
          </div>

          {/* Links */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="mailto:support@contractoroverbid.com"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} ContractorOverBid. All rights reserved.
            <span className="mx-2">|</span>
            AI-powered estimates are for informational purposes only and do not constitute
            professional advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
