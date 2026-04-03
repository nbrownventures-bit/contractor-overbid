import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Is Your Kitchen Remodel Quote Too High? | ContractorOverBid',
  description: 'Find out if your kitchen contractor is overcharging you. AI-powered analysis of kitchen remodel quotes — cabinets, countertops, labor, and more. Free verdict in 60 seconds.',
  keywords: ['kitchen remodel quote too high', 'kitchen contractor overcharging', 'fair price kitchen renovation', 'kitchen remodel cost analysis', 'is my kitchen quote fair'],
}

const redFlags = [
  'Lump sum price with no itemized breakdown by trade or material',
  'Cabinet pricing that doesn\'t specify brand, line, or material',
  'Labor percentage that seems high relative to material costs',
  'No allowance items defined — vague "owner selections" with no budget',
  'Countertop pricing without specifying slab size, edge profile, or fabrication',
  'Contingency fee over 10–15% on a straightforward remodel',
]

const whatToKnow = [
  { label: 'Minor kitchen remodel (cosmetic)', range: '$10,000 – $25,000', note: 'new appliances, paint, hardware, countertops — keeping existing layout' },
  { label: 'Mid-range kitchen remodel', range: '$25,000 – $60,000', note: 'semi-custom cabinets, new countertops, some layout changes' },
  { label: 'High-end / full gut remodel', range: '$60,000 – $130,000+', note: 'custom cabinets, premium appliances, full layout reconfiguration' },
  { label: 'Cabinet installation (labor only)', range: '$1,500 – $4,000', note: 'for an average kitchen — excludes cabinet cost' },
  { label: 'Quartz countertop (installed)', range: '$55 – $120/sq ft', note: 'varies by slab thickness, edge profile, and brand' },
]

export default function KitchenRemodelPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium mb-6">
            🍳 Kitchen Remodel Quote Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Is Your Kitchen Remodel Quote <span style={{ color: '#F5921D' }}>Too High?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            Kitchen remodels are complex and easy to overbid. Vague line items and material markups can inflate a quote by thousands. Our AI breaks it down and tells you what's fair.
          </p>
          <Link href="/analyze" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg" style={{ background: '#F5921D' }}>
            Analyze My Kitchen Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
          <p className="text-sm text-slate-400 mt-3">Free verdict · Full report $4.99 · No subscription</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Typical Kitchen Remodel Cost Ranges</h2>
          <p className="text-slate-500 mb-8">These ranges vary significantly by region, scope, and material choices — but they give you a starting baseline.</p>
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
          <p className="text-xs text-slate-400 mt-4">* Ranges are general estimates. Our AI uses your specific location, scope, and materials for a more accurate analysis.</p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ background: '#1B2E4A' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-2">Kitchen Remodel Red Flags</h2>
          <p className="text-slate-400 mb-8">Kitchen quotes are notoriously vague. These are the things worth pushing back on.</p>
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
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Know what's fair before the first hammer swings.</h2>
          <p className="text-slate-500 text-lg mb-8">Paste your kitchen remodel quote and get a free verdict in under 60 seconds. Full breakdown + negotiation scripts for $4.99.</p>
          <Link href="/analyze" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg" style={{ background: '#F5921D' }}>
            Analyze My Kitchen Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
