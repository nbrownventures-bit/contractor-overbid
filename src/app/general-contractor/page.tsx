import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Is Your General Contractor Quote Too High? | ContractorOverBid',
  description: 'Find out if your general contractor is overcharging you. AI-powered analysis of home renovation, remodel, and construction quotes. Get a fair price in 60 seconds.',
  keywords: ['general contractor quote too high', 'contractor overcharging', 'is my contractor bid too high', 'home renovation fair price', 'GC markup too high', 'contractor overbid'],
}

const redFlags = [
  'Overhead & profit markup above 20–25% without itemized justification',
  'Allowances for materials that are vague or unrealistically low (sets you up for change orders)',
  'No payment schedule tied to project milestones — lump sums upfront are a red flag',
  'Scope of work described in one sentence — ambiguity always costs you more later',
  'No mention of subcontractor licensing or insurance requirements',
  'Permit costs listed as TBD or omitted entirely',
]

const whatToKnow = [
  { label: 'General contractor markup (O&P)', range: '15–25%', note: 'on top of subcontractor and material costs — above 25% warrants scrutiny on larger jobs' },
  { label: 'Kitchen remodel (mid-range)', range: '$25,000 – $60,000', note: 'full gut remodel — varies dramatically by scope, finishes, and region' },
  { label: 'Bathroom remodel (primary)', range: '$10,000 – $25,000', note: 'full remodel — basic refreshes can be done for less' },
  { label: 'Home addition (per sq ft)', range: '$150 – $350/sq ft', note: 'finished living space — varies by structure type and finishes' },
]

export default function GeneralContractorPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium mb-6">
            🔨 General Contractor Quote Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Is Your Contractor Bid <span style={{ color: '#F5921D' }}>Too High?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            General contractor quotes are notorious for bloated markups, vague allowances, and hidden change-order traps. Our AI reads the fine print so you don't get surprised later.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Contractor Quote
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
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Typical General Contractor Costs</h2>
          <p className="text-slate-500 mb-8">What "fair" looks like across common renovation types — before the scope creep starts.</p>
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
          <p className="text-xs text-slate-400 mt-4">* Ranges are general industry estimates. Actual fair prices vary by region, materials, and project complexity. Our AI uses your specific quote details for a more targeted analysis.</p>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16 px-4" style={{ background: '#1B2E4A' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-2">GC Red Flags to Watch For</h2>
          <p className="text-slate-400 mb-8">These are the patterns that lead to budget overruns. Spot them before you sign.</p>
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
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Read the quote before the quote reads your wallet.</h2>
          <p className="text-slate-500 text-lg mb-8">Paste your contractor bid and get a free verdict in under 60 seconds. Full breakdown + negotiation leverage for $4.99.</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg"
            style={{ background: '#F5921D' }}
          >
            Analyze My Contractor Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
