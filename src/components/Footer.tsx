import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img src="/logo-light.svg" alt="ContractorOverBid" className="h-8" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              AI-powered second opinions on contractor quotes. Stop overpaying and negotiate with confidence.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1.5">
                <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium text-orange-400">AI-Powered</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-700/50 border border-slate-600/30 rounded-full px-3 py-1.5">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-xs font-medium text-slate-400">Secure Checkout</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-slate-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Analyze a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Trade Types */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">By Trade</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/roofing" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Roofing Quotes
                </Link>
              </li>
              <li>
                <Link href="/hvac" className="text-sm text-slate-400 hover:text-white transition-colors">
                  HVAC Quotes
                </Link>
              </li>
              <li>
                <Link href="/plumbing" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Plumbing Quotes
                </Link>
              </li>
              <li>
                <Link href="/electrical" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Electrical Quotes
                </Link>
              </li>
              <li>
                <Link href="/kitchen-remodel" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Kitchen Remodel
                </Link>
              </li>
              <li>
                <Link href="/general-contractor" className="text-sm text-slate-400 hover:text-white transition-colors">
                  General Contractor
                </Link>
              </li>
              <li>
                <Link href="/bathroom-remodel" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Bathroom Remodel
                </Link>
              </li>
              <li>
                <Link href="/deck-patio" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Deck &amp; Patio
                </Link>
              </li>
              <li>
                <Link href="/painting" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Painting
                </Link>
              </li>
              <li>
                <Link href="/flooring" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Flooring
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="mailto:support@contractoroverbid.com" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-700/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} ContractorOverBid. All rights reserved.
            </p>
            <p className="text-xs text-slate-600 text-center sm:text-right max-w-md">
              AI-powered estimates are for informational purposes only and do not constitute professional advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
