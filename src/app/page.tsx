'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

/* ─── Animation variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

/* ─── Animated counter ────────────────────────────────────── */
function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 1800,
}: {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

/* ─── Star rating ─────────────────────────────────────────── */
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-hero-gradient">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-teal-50 opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-teal-50 opacity-40 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                AI-Powered Analysis in 60 Seconds
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-5"
              >
                Stop Overpaying<br />
                <span className="gradient-text">Contractors.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Get an AI-powered second opinion on your contractor quote in 60 seconds. Negotiate with confidence and save thousands.
              </motion.p>

              {/* CTA */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <Link
                  href="/analyze"
                  className="btn-teal animate-pulse-teal px-8 py-4 rounded-xl text-base font-bold inline-flex items-center justify-center gap-2"
                >
                  Analyze My Quote — Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/#how-it-works"
                  className="btn-teal-outline px-8 py-4 rounded-xl text-base inline-flex items-center justify-center gap-2"
                >
                  How It Works
                </Link>
              </motion.div>

              {/* Trust row */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-slate-400">
                {[
                  { icon: '✓', text: 'Free initial analysis' },
                  { icon: '✓', text: 'No signup required' },
                  { icon: '✓', text: 'Results in 60 seconds' },
                ].map((item) => (
                  <span key={item.text} className="flex items-center gap-1.5">
                    <span className="text-teal-500 font-bold">{item.icon}</span>
                    {item.text}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — visual card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Mock report card */}
                <div className="light-card rounded-2xl p-6 shadow-card-lg">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Quote Analysis</p>
                      <p className="text-lg font-bold text-slate-900">Kitchen Remodel · Austin, TX</p>
                    </div>
                    <span className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-xs font-bold text-red-600">
                      Overpriced
                    </span>
                  </div>

                  {/* Price comparison */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: 'Quoted', value: '$32,000', color: 'text-slate-900' },
                      { label: 'Fair Range', value: '$24–27k', color: 'text-teal-600' },
                      { label: 'Save', value: '$4,500', color: 'text-amber-600' },
                    ].map((item) => (
                      <div key={item.label} className="bg-slate-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                        <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Line items */}
                  <div className="space-y-2.5">
                    {[
                      { name: 'Cabinet installation', status: 'overpriced', pct: '+38%' },
                      { name: 'Countertop materials', status: 'fair', pct: 'Fair' },
                      { name: 'Labor (demo)', status: 'significantly_overpriced', pct: '+62%' },
                      { name: 'Plumbing rough-in', status: 'slightly_high', pct: '+14%' },
                    ].map((item) => {
                      const color =
                        item.status === 'fair' ? 'bg-green-500' :
                        item.status === 'slightly_high' ? 'bg-amber-400' :
                        item.status === 'overpriced' ? 'bg-orange-500' : 'bg-red-500'
                      const textColor =
                        item.status === 'fair' ? 'text-green-600' :
                        item.status === 'slightly_high' ? 'text-amber-600' :
                        item.status === 'overpriced' ? 'text-orange-600' : 'text-red-600'
                      const bgColor =
                        item.status === 'fair' ? 'bg-green-50' :
                        item.status === 'slightly_high' ? 'bg-amber-50' :
                        item.status === 'overpriced' ? 'bg-orange-50' : 'bg-red-50'
                      return (
                        <div key={item.name} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${color}`} />
                            <span className="text-sm text-slate-700">{item.name}</span>
                          </div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${bgColor} ${textColor}`}>{item.pct}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="text-xs text-slate-500">3 negotiation scripts included</p>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-card-md"
                >
                  <p className="text-xs font-bold text-slate-900">Saved $4,500</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-2 h-2 bg-amber-400 rounded-sm" />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-y border-slate-100 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerFast}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {[
              { value: '60 sec', label: 'analysis time', note: 'from paste to report' },
              { value: '50 states', label: 'regional pricing', note: 'localized market data' },
              { value: '24/7', label: 'instant access', note: 'no appointments needed' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className={`text-center ${i === 1 ? 'sm:border-x sm:border-slate-100' : ''}`}
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-teal-600 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-slate-700">{stat.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.note}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">How It Works</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Three steps to find out if your contractor is overcharging you.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                step: '01',
                title: 'Enter Your Quote',
                description: 'Paste your quote text or enter line items from your contractor\'s estimate. Takes about 2 minutes.',
                icon: (
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                bg: 'bg-teal-50',
                border: 'border-teal-100',
              },
              {
                step: '02',
                title: 'AI Analyzes It',
                description: 'Our AI compares your quote against real market data for your area and project type, flagging overpriced items instantly.',
                icon: (
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                bg: 'bg-indigo-50',
                border: 'border-indigo-100',
                featured: true,
              },
              {
                step: '03',
                title: 'Get Your Report',
                description: 'See exactly where you\'re being overcharged, with negotiation scripts and specific questions to ask.',
                icon: (
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                bg: 'bg-emerald-50',
                border: 'border-emerald-100',
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className={`relative bg-white rounded-2xl p-7 border ${item.featured ? 'border-teal-200 shadow-card-md ring-1 ring-teal-100' : 'border-slate-200 shadow-card'} transition-all duration-200 hover:shadow-card-md hover:-translate-y-0.5`}
              >
                <div className="absolute top-5 right-5 text-4xl font-black text-slate-100 select-none leading-none">
                  {item.step}
                </div>
                <div className={`w-12 h-12 ${item.bg} border ${item.border} rounded-xl flex items-center justify-center mb-5`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features alternating ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto space-y-20">

          {/* Feature 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={fadeUp} className="order-2 lg:order-1">
              <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-3">Instant Clarity</p>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                Know if you&apos;re overpaying before you sign
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                Our AI cross-references your quote against a database of real contractor costs across hundreds of job types and US cities. You get a clear verdict — fair, slightly high, overpriced, or significantly overpriced — in under 60 seconds.
              </p>
              <ul className="space-y-3">
                {[
                  'Line-by-line pricing breakdown',
                  'Regional market rate comparisons',
                  'Overpriced item flagging with percentages',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-card-lg border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80"
                  alt="Contractor reviewing documents"
                  className="w-full h-72 object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={fadeUp}>
              <div className="rounded-2xl overflow-hidden shadow-card-lg border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80"
                  alt="Home renovation planning"
                  className="w-full h-72 object-cover"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Negotiate Smarter</p>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                Negotiate with a script, not a guess
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                The full report includes word-for-word negotiation scripts tailored to your specific quote, along with the right questions to ask your contractor. Go into your next conversation knowing your position.
              </p>
              <ul className="space-y-3">
                {[
                  'Word-for-word negotiation scripts',
                  'Specific questions to expose overcharging',
                  'Missing item checklist',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── Why It Matters ── */}
      <section id="testimonials" className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-widest mb-3">Why It Matters</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              The Problem with Contractor Quotes
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Most homeowners have no way to know if a price is fair — until now.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: '📊',
                stat: '20–35%',
                title: 'Average markup on labor',
                description: 'Contractors routinely mark up labor costs well above market rate, especially for homeowners who only get one quote.',
              },
              {
                icon: '🏠',
                stat: '1 in 3',
                title: 'Quotes contain hidden fees',
                description: 'Vague line items, bundled costs, and missing scope details make it nearly impossible to compare quotes fairly.',
                featured: true,
              },
              {
                icon: '💬',
                stat: '85%',
                title: 'Of homeowners don\'t negotiate',
                description: 'Most people accept the first quote because they lack the knowledge to push back. The right data changes that.',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className={`bg-white rounded-2xl p-6 border shadow-card transition-all duration-200 hover:shadow-card-md hover:-translate-y-0.5 ${item.featured ? 'border-teal-200 ring-1 ring-teal-100' : 'border-slate-200'}`}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-3xl font-extrabold text-teal-600 mb-2">{item.stat}</p>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-teal-gradient">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Most homeowners accept the first quote they receive
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5"
          >
            Don&apos;t Sign Until<br className="hidden sm:block" /> You Read This
          </motion.h2>

          <motion.p variants={fadeUp} className="text-teal-100 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Before you hand over a deposit, get your free AI analysis and walk into the negotiation with facts, not feelings.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/analyze"
              className="bg-white text-teal-700 hover:bg-teal-50 font-bold px-10 py-4 rounded-xl text-lg inline-flex items-center gap-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Analyze My Quote — It&apos;s Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} className="text-teal-200/70 text-sm mt-5">
            Free initial analysis. Full report for $9.99. No subscription.
          </motion.p>
        </motion.div>
      </section>

    </div>
  )
}
