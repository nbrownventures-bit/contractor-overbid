import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-orange-900/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            AI-Powered Analysis in 60 Seconds
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Are You Getting{' '}
            <span className="gradient-text">OverBid?</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Get an AI-powered second opinion on your contractor quote in 60 seconds. Stop overpaying
            and negotiate with confidence.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/analyze"
              className="btn-orange animate-pulse-orange px-8 py-4 rounded-xl text-lg font-bold inline-flex items-center gap-2"
            >
              Analyze My Quote For Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          {/* Trust text */}
          <p className="text-sm text-gray-500">
            Join{' '}
            <span className="text-orange-400 font-semibold">10,000+ homeowners</span> who saved an
            average of{' '}
            <span className="text-orange-400 font-semibold">$2,400</span> on their projects
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-black border-y border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">$4.2M+</p>
              <p className="text-sm text-gray-400">in overcharges exposed</p>
            </div>
            <div className="sm:border-x border-white/5">
              <p className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">10,000+</p>
              <p className="text-sm text-gray-400">quotes analyzed</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">$2,400</p>
              <p className="text-sm text-gray-400">average savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three simple steps to find out if your contractor is overcharging you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="glass-card rounded-2xl p-8 text-center relative">
              <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-7 h-7 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                <span className="text-orange-500 font-bold text-sm">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Upload Your Quote</h3>
              <p className="text-gray-400 leading-relaxed">
                Paste your quote text or manually enter the line items from your contractor&apos;s
                estimate.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card rounded-2xl p-8 text-center relative border border-orange-500/20">
              <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-7 h-7 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                <span className="text-orange-500 font-bold text-sm">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Analyzes It</h3>
              <p className="text-gray-400 leading-relaxed">
                Our AI compares your quote against real market rates for your area and job type,
                flagging overpriced items.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card rounded-2xl p-8 text-center relative">
              <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-7 h-7 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                <span className="text-orange-500 font-bold text-sm">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Your Report</h3>
              <p className="text-gray-400 leading-relaxed">
                See exactly where you&apos;re being overcharged, with negotiation scripts and
                questions to ask your contractor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Homeowners Who Saved Big
            </h2>
            <p className="text-gray-400 text-lg">Real savings from real homeowners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                &quot;My roofing contractor quoted me $18,500. ContractorOverBid showed me I was
                being overcharged by nearly $4,000. I negotiated down to $14,200 using their script.
                Worth every penny!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-orange-400 font-bold text-sm">MR</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Michael R.</p>
                  <p className="text-xs text-gray-500">Austin, TX — Saved $4,300</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="glass-card rounded-2xl p-6 border border-orange-500/20">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                &quot;I was about to sign a $32,000 kitchen remodel contract. The AI found 6
                overpriced line items and I ended up paying $27,500. That $10 report saved me
                $4,500!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-orange-400 font-bold text-sm">SL</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Sarah L.</p>
                  <p className="text-xs text-gray-500">Denver, CO — Saved $4,500</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                &quot;The HVAC quote I received was $8,800. ContractorOverBid flagged two items as
                significantly overpriced. I got the job done for $6,200 with a different contractor.
                Amazing tool!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-orange-400 font-bold text-sm">JT</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">James T.</p>
                  <p className="text-xs text-gray-500">Chicago, IL — Saved $2,600</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12 border border-orange-500/20">
            <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Don&apos;t Sign Until You Read This
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              67% of contractor quotes contain at least one significantly overpriced line item.
              Before you sign anything, get your free AI analysis and negotiate with the facts on
              your side.
            </p>
            <Link
              href="/analyze"
              className="btn-orange px-10 py-4 rounded-xl text-lg font-bold inline-flex items-center gap-2"
            >
              Analyze My Quote — It&apos;s Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <p className="text-xs text-gray-600 mt-4">Free initial analysis. Full report for $9.99.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
