import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Is Your Deck or Patio Quote Too High? | ContractorOverBid',
  description: 'Find out if your deck or patio contractor is overcharging you. AI-powered analysis of deck building, patio installation, and outdoor construction quotes. Free verdict in 60 seconds.',
  keywords: ['deck quote too high', 'patio contractor overcharging', 'deck building cost fair price', 'is my deck quote fair', 'patio installation cost', 'deck contractor pricing'],
}

const redFlags = [
  'Per-square-foot price well above $30–$50/sq ft for pressure-treated lumber decks',
  'No permit included — deck permits are required in most cities and counties',
  'Composite decking quoted without specifying the brand or product line',
  'Footing/post work priced separately without a clear material/labor breakdown',
  'No mention of ledger attachment method for attached decks (critical for structural safety)',
  'Removal of existing deck priced disproportionately high (should be $500–$2,500 for most)',
]

const whatToKnow = [
  { label: 'Pressure-treated wood deck (200 sq ft)', range: '$6,000 – $12,000', note: 'includes framing, decking, basic railing — varies by height, complexity, and local labor rates' },
  { label: 'Composite deck (200 sq ft)', range: '$10,000 – $20,000', note: 'Trex or similar — more expensive upfront but lower maintenance; material brand matters' },
  { label: 'Concrete patio (300 sq ft)', range: '$3,000 – $7,500', note: 'basic broom-finish slab — stamped/colored concrete costs significantly more' },
  { label: 'Paver patio (300 sq ft)', range: '$6,000 – $15,000', note: 'natural stone runs higher; includes base prep, edging, and sand-set installation' },
]

export default function DeckPatioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium mb-6">
            🪵 Deck & Patio Quote Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Is Your Deck or Patio Quote <span style={{ color: '#F5921D' }}>Too High?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            Outdoor projects are easy to overpay on — most homeowners don't know the real cost per square foot. Our AI analyzes your quote and flags anything that doesn't add up.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Deck/Patio Quote
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
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Typical Deck & Patio Cost Ranges</h2>
          <p className="text-slate-500 mb-8">Industry benchmarks — your quote should be in the ballpark. Big deviations are worth questioning.</p>
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
          <p className="text-xs text-slate-400 mt-4">* Ranges are general industry estimates. Actual fair prices vary by region, materials, and job complexity. Our AI uses your specific location and details for a more accurate analysis.</p>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16 px-4" style={{ background: '#1B2E4A' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-2">Deck & Patio Red Flags to Watch For</h2>
          <p className="text-slate-400 mb-8">These don't always mean fraud — but they're worth asking about before you sign.</p>
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
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Don't overpay for your outdoor space.</h2>
          <p className="text-slate-500 text-lg mb-8">Paste your quote into our analyzer. Free verdict in under 60 seconds. Full line-by-line breakdown + negotiation scripts for $4.99.</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Deck/Patio Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
