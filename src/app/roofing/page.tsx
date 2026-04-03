import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Is Your Roofing Quote Too High? | ContractorOverBid',
  description: 'Find out if your roofing contractor is overcharging you. AI-powered analysis of roof replacement, repair, and installation quotes. Get a fair price in 60 seconds.',
  keywords: ['roofing quote too high', 'roof replacement cost fair price', 'roofing contractor overcharging', 'is my roofer overcharging', 'fair price roof replacement'],
}

const redFlags = [
  'Vague line items like "materials and labor" with no breakdown',
  'Shingle pricing well above $150–$250 per square installed',
  'No mention of permit costs (required in most jurisdictions)',
  'Pressure to sign same day or lose the price',
  'No written warranty for workmanship',
  'Disposal fee that seems disproportionate to job size',
]

const whatToKnow = [
  { label: 'Asphalt shingle replacement', range: '$8,000 – $20,000', note: 'for an average 2,000 sq ft home — varies widely by region, pitch, and shingle grade' },
  { label: 'Tear-off & disposal', range: '$1,000 – $3,000', note: 'for a single-layer roof — additional layers cost more' },
  { label: 'Labor', range: '$1.50 – $4.00/sq ft', note: 'depending on complexity, pitch, and local market' },
  { label: 'Architectural shingles (30yr)', range: '$1.00 – $2.00/sq ft', note: 'materials only — verify the brand and grade quoted' },
]

export default function RoofingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium mb-6">
            🏠 Roofing Quote Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Is Your Roofing Quote <span style={{ color: '#F5921D' }}>Too High?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            Roofing is one of the most commonly overpriced home improvement jobs. Our AI analyzes your quote line by line and tells you what's fair — before you sign anything.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Roofing Quote
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
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Typical Roofing Cost Ranges</h2>
          <p className="text-slate-500 mb-8">General market context — your quote should be in the ballpark. If it's not, that's a red flag.</p>
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
          <h2 className="text-2xl font-extrabold text-white mb-2">Roofing Red Flags to Watch For</h2>
          <p className="text-slate-400 mb-8">These don't always mean you're being scammed — but they're worth asking about.</p>
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
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Don't sign until you know the number is fair.</h2>
          <p className="text-slate-500 text-lg mb-8">Paste your quote into our analyzer. You'll get a free verdict in under 60 seconds. Full line-by-line breakdown + negotiation scripts for $4.99.</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Roofing Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
