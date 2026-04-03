import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Is Your Plumbing Quote Too High? | ContractorOverBid',
  description: 'Find out if your plumber is overcharging you. AI-powered analysis of plumbing quotes for water heaters, pipe repairs, remodels, and more. Free verdict in 60 seconds.',
  keywords: ['plumber overcharging', 'plumbing quote fair price', 'is my plumber overcharging', 'water heater installation cost', 'plumbing quote analysis'],
}

const redFlags = [
  'Flat-rate pricing with no breakdown of parts vs. labor',
  'Trip/diagnostic fee that seems disproportionate to the job',
  'Water heater markup significantly above retail price',
  'Vague "pipe repair" with no footage or scope specified',
  'Same-day pressure: "price goes up if you don\'t book now"',
  'No permit mentioned for work that typically requires one',
]

const whatToKnow = [
  { label: 'Water heater replacement (40–50 gal)', range: '$800 – $1,800', note: 'standard tank, installed — tankless units cost more ($1,500–$3,500)' },
  { label: 'Pipe repair (minor leak)', range: '$150 – $500', note: 'accessible pipe — hidden or slab leaks cost significantly more' },
  { label: 'Drain cleaning', range: '$100 – $300', note: 'standard snake or hydro-jet — varies by access and severity' },
  { label: 'Bathroom plumbing rough-in (remodel)', range: '$1,500 – $4,000', note: 'new fixtures, lines, and drain — depends on distance to main stack' },
]

export default function PlumbingPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium mb-6">
            🔧 Plumbing Quote Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Is Your Plumbing Quote <span style={{ color: '#F5921D' }}>Too High?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            Plumbing quotes can vary wildly for the same job. Our AI analyzes every line item against real market rates so you know exactly where you stand before writing a check.
          </p>
          <Link href="/analyze" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg" style={{ background: '#F5921D' }}>
            Analyze My Plumbing Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
          <p className="text-sm text-slate-400 mt-3">Free verdict · Full report $4.99 · No subscription</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Typical Plumbing Cost Ranges</h2>
          <p className="text-slate-500 mb-8">General market context — wide ranges are normal in plumbing due to access, location, and job complexity.</p>
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
          <p className="text-xs text-slate-400 mt-4">* Ranges are general estimates. Our AI uses your specific location and scope for a more accurate analysis.</p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ background: '#1B2E4A' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-2">Plumbing Red Flags to Watch For</h2>
          <p className="text-slate-400 mb-8">These are worth questioning before you agree to anything.</p>
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

      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Get a second opinion before you pay.</h2>
          <p className="text-slate-500 text-lg mb-8">Paste your plumbing quote and get a free verdict in under 60 seconds. Full breakdown + negotiation scripts for $4.99.</p>
          <Link href="/analyze" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg" style={{ background: '#F5921D' }}>
            Analyze My Plumbing Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
