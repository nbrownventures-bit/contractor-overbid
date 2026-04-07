import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Is Your HVAC Quote Too High? | ContractorOverBid',
  description: 'Find out if your HVAC contractor is overcharging you. AI-powered analysis of AC installation, furnace replacement, and HVAC repair quotes. Get a fair price in 60 seconds.',
  keywords: ['HVAC quote too high', 'AC installation fair price', 'furnace replacement cost', 'HVAC contractor overcharging', 'is my HVAC quote fair'],
}

const redFlags = [
  'No equipment brand/model specified — "standard unit" means nothing',
  'Vague labor charges with no hours or crew size',
  'Unusually high "system design" or "diagnostic" fees',
  'Pressure to replace when repair may be sufficient',
  'No mention of permits (required for most HVAC work)',
  'Extended warranty upsell baked into the base price without disclosure',
]

const whatToKnow = [
  { label: 'Central AC unit replacement (2–3 ton)', range: '$3,500 – $7,500', note: 'installed, mid-range efficiency — high-efficiency or larger systems cost more' },
  { label: 'Gas furnace replacement', range: '$2,500 – $6,000', note: 'installed — varies by BTU output and efficiency rating' },
  { label: 'Full HVAC system replacement', range: '$6,000 – $14,000', note: 'AC + furnace + coil — varies widely by system size and region' },
  { label: 'Ductwork repair/replacement', range: '$25 – $55/linear ft', note: 'new duct runs vary significantly by accessibility' },
]

export default function HVACPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium mb-6">
            ❄️ HVAC Quote Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Is Your HVAC Quote <span style={{ color: '#F5921D' }}>Too High?</span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            HVAC quotes are notoriously hard to compare. Equipment markups, vague labor, and unnecessary upsells add up fast. Our AI breaks it all down and tells you what's fair.
          </p>
          <Link href="/analyze" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg" style={{ background: '#F5921D' }}>
            Analyze My HVAC Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
          <p className="text-sm text-slate-400 mt-3">Free verdict · Full report $4.99 · No subscription</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Typical HVAC Cost Ranges</h2>
          <p className="text-slate-500 mb-8">Equipment + installation. These ranges vary significantly by region, home size, and system type.</p>
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
          <p className="text-xs text-slate-400 mt-4">* Ranges are general industry estimates. Our AI uses your specific location and details for a more accurate analysis.</p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ background: '#1B2E4A' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white mb-2">HVAC Red Flags to Watch For</h2>
          <p className="text-slate-400 mb-8">Ask about these before you sign.</p>
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
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Know the fair price before you commit.</h2>
          <p className="text-slate-500 text-lg mb-8">Paste your HVAC quote and get a free verdict in under 60 seconds. Full breakdown + negotiation scripts for $4.99.</p>
          <Link href="/analyze" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg" style={{ background: '#F5921D' }}>
            Analyze My HVAC Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
