import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Is Your House Painter Quote Too High? | ContractorOverBid',
  description: 'Find out if your painting contractor is overcharging you. AI-powered analysis of interior and exterior painting quotes. Know the fair price before you sign. Free verdict in 60 seconds.',
  keywords: ['house painter quote too high', 'painting contractor overcharging', 'interior painting cost fair price', 'exterior painting quote', 'is my painter overcharging', 'house painting pricing'],
}

const redFlags = [
  'Interior painting quoted above $3.50–$5.00/sq ft for walls only (standard prep + 2 coats)',
  'No mention of paint brand or grade — contractor-grade paint vs. premium costs significantly different',
  'Separate line items for "prep work" that seem excessive relative to scope',
  'Exterior quote with no caulking, sanding, or surface prep included',
  'Color changes charged at the same rate as same-color repaint (extra coats are legitimate but should be itemized)',
  'Travel or mobilization fees for local jobs that seem inflated',
]

const whatToKnow = [
  { label: 'Interior painting (1,500 sq ft home)', range: '$2,500 – $6,000', note: 'walls only, 2 coats, standard prep — ceilings and trim add 20–40%' },
  { label: 'Exterior painting (1,500 sq ft home)', range: '$2,500 – $7,000', note: 'includes scraping, caulking, 2 coats — varies by siding type and condition' },
  { label: 'Single room (12x12)', range: '$300 – $800', note: 'walls only — add $100–$200 for ceiling, trim extra' },
  { label: 'Deck or fence staining/painting', range: '$1.50 – $4.00/sq ft', note: 'includes pressure washing and prep — varies by condition and product type' },
]

export default function PaintingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium mb-6">
            🎨 Painting Quote Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Is Your Painter Quote <span style={{ color: '#F5921D' }}>Too High?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            Painting quotes vary wildly — a 3x spread for the same job is common. Our AI analyzes your quote line by line and tells you what's fair before you hand over the deposit.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Painting Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-sm text-slate-400 mt-3">Free verdict · Full report $4.99 · No subscription</p>
        </div>
      </section>

      {/* Typical Ranges */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Typical Painting Cost Ranges</h2>
          <p className="text-slate-500 mb-8">Industry benchmarks — your quote should be in the ballpark. If it's 50%+ above these, ask why.</p>
          <div className="space-y-4">
            {whatToKnow.map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.note}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold" style={{ color: '#F5921D' }}>{item.range}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">* Ranges are general industry estimates. Actual fair prices vary by region, ceiling height, number of colors, and surface condition. Our AI uses your specific details for a more accurate analysis.</p>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16 px-4" style={{ background: '#1B2E4A' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-2">Painting Red Flags to Watch For</h2>
          <p className="text-slate-400 mb-8">These don't always mean you're being overcharged — but they're worth clarifying before you commit.</p>
          <div className="space-y-3">
            {redFlags.map((flag) => (
              <div key={flag} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-lg flex-shrink-0">🚩</span>
                <p className="text-slate-300 text-sm">{flag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Know the fair price before you hand over the deposit.</h2>
          <p className="text-slate-500 text-lg mb-8">Paste your quote into our analyzer. Free verdict in under 60 seconds. Full line-by-line breakdown + negotiation scripts for $4.99.</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Painting Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
