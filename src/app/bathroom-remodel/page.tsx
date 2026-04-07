import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Is Your Bathroom Remodel Quote Too High? | ContractorOverBid',
  description: 'Find out if your bathroom contractor is overcharging you. AI-powered analysis of bathroom renovation quotes — tile, vanity, plumbing fixtures, and more. Free verdict in 60 seconds.',
  keywords: ['bathroom remodel quote too high', 'bathroom renovation cost', 'bathroom contractor overcharging', 'is my bathroom quote fair', 'fair price bathroom remodel', 'bathroom remodel pricing'],
}

const redFlags = [
  'No itemized breakdown — just a single "bathroom remodel" lump sum',
  'Tile labor quoted at $15+/sq ft for basic floor tile installation',
  'Fixtures marked up more than 30–40% above retail prices',
  'Demo and haul-away charged separately at inflated rates (should be $500–$1,500 for most bathrooms)',
  'Pressure to use contractor-supplied materials with no option to supply your own',
  'Permit costs not mentioned — most structural or plumbing changes require permits',
]

const whatToKnow = [
  { label: 'Full bathroom gut & remodel (mid-range)', range: '$10,000 – $25,000', note: 'new tile, vanity, tub/shower, fixtures — varies hugely by finishes and square footage' },
  { label: 'Tile installation (labor only)', range: '$5 – $12/sq ft', note: 'floor or wall tile — complex patterns or large-format tile runs higher' },
  { label: 'Vanity installation (labor)', range: '$200 – $600', note: 'not including the vanity itself — varies by plumbing complexity' },
  { label: 'Tub-to-shower conversion', range: '$1,500 – $5,000', note: 'depends on whether structural changes are needed and finish level chosen' },
]

export default function BathroomRemodelPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium mb-6">
            🛁 Bathroom Remodel Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Is Your Bathroom Remodel Quote <span style={{ color: '#F5921D' }}>Too High?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            Bathroom remodels are notorious for scope creep and inflated markups. Our AI analyzes your quote line by line and tells you what's fair before you commit.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Bathroom Quote
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
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Typical Bathroom Remodel Cost Ranges</h2>
          <p className="text-slate-500 mb-8">General market context — your quote should be in the ballpark. If it's not, that's a red flag worth investigating.</p>
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
          <h2 className="text-2xl font-extrabold text-white mb-2">Bathroom Remodel Red Flags to Watch For</h2>
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
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Know the number before you write the check.</h2>
          <p className="text-slate-500 text-lg mb-8">Paste your quote into our analyzer. Free verdict in under 60 seconds. Full line-by-line breakdown + negotiation scripts for $4.99.</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Bathroom Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
