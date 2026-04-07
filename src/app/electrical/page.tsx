import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Is Your Electrical Quote Too High? | ContractorOverBid',
  description: 'Find out if your electrician is overcharging you. AI-powered analysis of panel upgrades, wiring, and electrical installation quotes. Get a fair price in 60 seconds.',
  keywords: ['electrician quote too high', 'electrical panel upgrade cost', 'electrician overcharging', 'is my electrical quote fair', 'fair price electrical work', 'electrical contractor pricing'],
}

const redFlags = [
  'Flat "trip fee" or "diagnostic fee" that isn\'t credited toward the job',
  'Per-outlet or per-switch pricing with no itemized materials breakdown',
  'Panel upgrade quoted without specifying panel brand or amperage',
  'No mention of permit costs — electrical work almost always requires permits',
  'Pressure to rewire the whole house when only a circuit is affected',
  'Vague "code compliance" charge with no explanation of what code issues exist',
]

const whatToKnow = [
  { label: 'Main panel upgrade (100A → 200A)', range: '$1,500 – $4,000', note: 'installed with permit — varies by panel brand, location, and utility company requirements' },
  { label: 'Electrical outlet installation', range: '$100 – $250 each', note: 'new outlet with wiring run — varies by accessibility and distance to panel' },
  { label: 'Whole-home rewiring (1,500 sq ft)', range: '$8,000 – $20,000', note: 'full rewire is disruptive and expensive — make sure it\'s actually necessary' },
  { label: 'EV charger installation (Level 2)', range: '$500 – $1,500', note: 'includes dedicated 240V circuit — price varies by panel capacity and distance' },
]

export default function ElectricalPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium mb-6">
            ⚡ Electrical Quote Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Is Your Electrical Quote <span style={{ color: '#F5921D' }}>Too High?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            Electrical work is hard to price-check — most homeowners have no reference point. Our AI analyzes your quote line by line and flags anything that doesn't add up.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Electrical Quote
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
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Typical Electrical Cost Ranges</h2>
          <p className="text-slate-500 mb-8">Industry benchmarks — your quote should be in the ballpark. Significant deviations warrant a closer look.</p>
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
          <p className="text-xs text-slate-400 mt-4">* Ranges are general industry estimates. Actual fair prices vary by region, job complexity, and local permit costs. Our AI uses your specific details for a more accurate analysis.</p>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16 px-4" style={{ background: '#1B2E4A' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-2">Electrical Red Flags to Watch For</h2>
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
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Don't overpay for electrical work.</h2>
          <p className="text-slate-500 text-lg mb-8">Paste your quote and get a free verdict in under 60 seconds. Full line-by-line breakdown + negotiation scripts for $4.99.</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Electrical Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
