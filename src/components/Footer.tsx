import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <svg className="text-white" style={{width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Contractor<span className="text-teal-400">OverBid</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              AI-powered second opinions on contractor quotes. Stop overpaying and negotiate with confidence.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-teal-600/10 border border-teal-600/20 rounded-full px-3 py-1.5">
                <svg className="w-3.5 h-3.5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium text-teal-400">AI-Powered</span>
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
                <Link href="/#testimonials" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Analyze a Quote
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
