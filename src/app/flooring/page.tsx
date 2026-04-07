import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Is Your Flooring Quote Too High? | ContractorOverBid',
  description: 'Find out if your flooring contractor is overcharging you. AI-powered analysis of hardwood, LVP, tile, and carpet installation quotes. Free verdict in 60 seconds.',
  keywords: ['flooring quote too high', 'flooring contractor overcharging', 'hardwood floor installation cost', 'LVP flooring fair price', 'is my flooring quote fair', 'flooring contractor pricing'],
}

const redFlags = [
  'Labor quoted above $4–$6/sq ft for basic LVP or laminate click-lock installation',
  'Subfloor repair or leveling quoted without walking you through what actually needs fixing',
  'Material and labor bundled together with no way to verify material cost markup',
  'Floor removal quoted separately at more than $1–$2/sq ft for standard carpet/tile',
  'No mention of transition strips, baseboards, or quarter-round in the quote scope',
  'Premium "self-leveling compound" added to a flat, new-construction subfloor',
]

const whatToKnow = [
  { label: 'LVP/Laminate installation (1,000 sq ft)', range: '$3,500 – $8,000', note: 'labor + mid-range materials — varies widely by brand, thickness, and subfloor condition' },
  { label: 'Hardwood installation (1,000 sq ft)', range: '$6,000 – $16,000', note: 'solid or engineered, nail-down — more for site-finished solid hardwood' },
  { label: 'Tile flooring installation (labor only)', range: '$5 – $14/sq ft', note: 'includes thin-set and grout — large format or complex patterns cost more' },
  { label: 'Carpet installation (1,000 sq ft)', range: '$2,000 – $5,000', note: 'mid-grade carpet + pad + installation — budget and premium carpet vary significantly' },
]

export default function FlooringPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium mb-6">
            🏠 Flooring Quote Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Is Your Flooring Quote <span style={{ color: '#F5921D' }}>Too High?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            Flooring contractors often bundle materials and labor in ways that obscure massive markups. Our AI breaks down your quote and tells you exactly what's fair.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Flooring Quote
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
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Typical Flooring Cost Ranges</h2>
          <p className="text-slate-500 mb-8">General market benchmarks — if your quote is significantly above these ranges, ask for a detailed breakdown.</p>
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
          <p className="text-xs text-slate-400 mt-4">* Ranges are general industry estimates. Actual fair prices vary by region, subfloor condition, and material choices. Our AI uses your specific details for a more accurate analysis.</p>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16 px-4" style={{ background: '#1B2E4A' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-2">Flooring Red Flags to Watch For</h2>
          <p className="text-slate-400 mb-8">These don't always mean you're being scammed — but they're worth asking about before you sign.</p>
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
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Don't overpay for your new floors.</h2>
          <p className="text-slate-500 text-lg mb-8">Paste your quote into our analyzer. Free verdict in under 60 seconds. Full line-by-line breakdown + negotiation scripts for $4.99.</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Flooring Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
