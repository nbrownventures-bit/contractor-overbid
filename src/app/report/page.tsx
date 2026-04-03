'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { motion } from 'framer-motion'

interface ReportData {
  id: string
  createdAt: string
  isPaid: boolean
  quoteData: {
    jobType: string
    location: { city: string; state: string }
    totalPrice: number
    scopeDescription?: string
    contractorName?: string
    lineItems?: Array<{
      description: string
      quantity: number
      unitPrice: number
      totalPrice: number
    }>
  }
  teaser?: {
    verdict: string
    totalQuotedPrice: number
    estimatedFairPriceMin: number
    estimatedFairPriceMax: number
    potentialSavings: number
    summary: string
    lineItemCount: number
    redFlagCount: number
    negotiationTipCount: number
  }
  analysisResult?: {
    verdict: string
    totalQuotedPrice: number
    estimatedFairPriceMin: number
    estimatedFairPriceMax: number
    potentialSavings: number
    lineItemAnalyses: Array<{
      description: string
      quotedPrice: number
      fairPriceMin: number
      fairPriceMax: number
      status: string
      flagReason: string
      percentageOver: number
    }>
    missingItems: string[]
    vagueItems: string[]
    redFlags: string[]
    negotiationTips: string[]
    questionsToAsk: string[]
    summary: string
  }
}

const verdictConfig: Record<string, {
  label: string
  icon: string
  textColor: string
  bgColor: string
  borderColor: string
  gaugeClass: string
  gaugeWidth: string
  badgeBg: string
  badgeText: string
}> = {
  below_market: {
    label: 'Below Market — Great Deal',
    icon: '★',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    gaugeClass: 'gauge-fill-fair',
    gaugeWidth: 'w-[10%]',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
  },
  fair: {
    label: 'Fair Price',
    icon: '✓',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    gaugeClass: 'gauge-fill-fair',
    gaugeWidth: 'w-[25%]',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-700',
  },
  slightly_high: {
    label: 'Slightly High',
    icon: '⚠',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    gaugeClass: 'gauge-fill-slightly_high',
    gaugeWidth: 'w-[50%]',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
  },
  overpriced: {
    label: 'Overpriced',
    icon: '!',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    gaugeClass: 'gauge-fill-overpriced',
    gaugeWidth: 'w-[75%]',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-700',
  },
  significantly_overpriced: {
    label: 'Significantly Overpriced',
    icon: '!!',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    gaugeClass: 'gauge-fill-significantly_overpriced',
    gaugeWidth: 'w-[95%]',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
  },
}

const statusConfig: Record<string, { dot: string; badge: string; text: string; label: string }> = {
  below_market: { dot: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700 border border-blue-200', text: 'text-blue-700', label: 'Below Market' },
  fair: { dot: 'bg-green-500', badge: 'status-fair', text: 'text-green-700', label: 'Fair' },
  slightly_high: { dot: 'bg-amber-400', badge: 'status-slightly_high', text: 'text-amber-700', label: 'Slightly High' },
  overpriced: { dot: 'bg-orange-500', badge: 'status-overpriced', text: 'text-orange-700', label: 'Overpriced' },
  significantly_overpriced: { dot: 'bg-red-500', badge: 'status-significantly_overpriced', text: 'text-red-700', label: 'Significantly Overpriced' },
  missing: { dot: 'bg-purple-500', badge: 'bg-purple-100 text-purple-700 border border-purple-200', text: 'text-purple-700', label: 'Missing' },
  vague: { dot: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700 border border-blue-200', text: 'text-blue-700', label: 'Vague' },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

function ReportContent() {
  const searchParams = useSearchParams()
  const reportId = searchParams.get('id')
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  useEffect(() => {
    if (!reportId) return
    loadReport()
  }, [reportId])

  const loadReport = () => {
    try {
      // Try localStorage first (primary storage for MVP)
      const stored = localStorage.getItem(`report-${reportId}`)
      if (stored) {
        const parsed = JSON.parse(stored)
        setReport(parsed)
        setLoading(false)
        return
      }
      // Fallback to API
      fetchFromAPI()
    } catch {
      setError('Report not found. Please try analyzing your quote again.')
      setLoading(false)
    }
  }

  const fetchFromAPI = async () => {
    try {
      const res = await fetch(`/api/report?id=${reportId}`)
      if (!res.ok) throw new Error('Report not found')
      const data = await res.json()
      setReport(data)
    } catch {
      setError('Report not found. Please try analyzing your quote again.')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlockReport = async () => {
    setCheckoutLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else if (data.alreadyPaid) {
        loadReport()
      }
    } catch {
      setError('Failed to start checkout. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-3 border-slate-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-5" style={{ borderWidth: '3px' }} />
          <p className="text-slate-500 font-medium">Loading your report...</p>
        </div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-8 text-center max-w-md">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-slate-700 font-semibold mb-2">Report Not Found</p>
          <p className="text-slate-500 text-sm mb-6">{error || 'This report may have expired.'}</p>
          <Link href="/analyze" className="btn-teal px-6 py-3 rounded-xl font-semibold inline-block text-sm">
            Analyze a New Quote
          </Link>
        </div>
      </div>
    )
  }

  const analysis = report.analysisResult
  const verdictKey = analysis?.verdict || report.teaser?.verdict || 'fair'
  const vc = verdictConfig[verdictKey] || verdictConfig.fair
  const savings = analysis?.potentialSavings ?? report.teaser?.potentialSavings
  const summary = analysis?.summary ?? report.teaser?.summary
  const fairMin = analysis?.estimatedFairPriceMin ?? report.teaser?.estimatedFairPriceMin
  const fairMax = analysis?.estimatedFairPriceMax ?? report.teaser?.estimatedFairPriceMax

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 print:bg-white print:py-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Report header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-6"
        >
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-1">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Quote Analysis Report</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {report.quoteData.jobType}
              </h1>
            </div>
            <div className="flex items-center gap-3 no-print">
              <button
                onClick={() => window.print()}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1.5 border border-slate-200 px-3 py-2 rounded-lg transition-colors hover:bg-slate-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Report
              </button>
            </div>
          </motion.div>
          <motion.p variants={fadeUp} className="text-sm text-slate-400">
            {report.quoteData.location.city}, {report.quoteData.location.state}
            {report.quoteData.contractorName && ` · ${report.quoteData.contractorName}`}
          </motion.p>
        </motion.div>

        {/* ── Verdict card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`bg-white rounded-2xl border ${vc.borderColor} shadow-card-md p-6 sm:p-8 mb-6`}
        >
          {/* Verdict badge + summary */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${vc.bgColor} ${vc.borderColor} border rounded-xl flex items-center justify-center`}>
                <span className={`text-lg font-black ${vc.textColor}`}>{vc.icon}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verdict</p>
                <p className={`text-xl font-extrabold ${vc.textColor}`}>{vc.label}</p>
              </div>
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${vc.badgeBg} ${vc.badgeText} self-start sm:self-center`}>
              {verdictKey.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {/* Gauge */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Fair</span>
              <span>Overpriced</span>
            </div>
            <div className="gauge-track">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: undefined }}
                className={`${vc.gaugeClass} ${vc.gaugeWidth}`}
              />
            </div>
          </div>

          {/* Summary */}
          <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">{summary}</p>

          {/* Numbers grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Quoted Price</p>
              <p className="text-2xl font-extrabold text-slate-900">
                ${report.quoteData.totalPrice.toLocaleString()}
              </p>
            </div>
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-2">Fair Price Range</p>
              <p className="text-2xl font-extrabold text-teal-700">
                ${fairMin?.toLocaleString()} – ${fairMax?.toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">Potential Savings</p>
              <p className="text-2xl font-extrabold text-green-700">
                {fairMin && fairMax && report.quoteData.totalPrice > fairMax
                  ? `$${(report.quoteData.totalPrice - fairMax).toLocaleString()} – $${(report.quoteData.totalPrice - fairMin).toLocaleString()}`
                  : savings && savings > 0 ? `$${savings.toLocaleString()}` : 'At Market Rate'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Email capture (unpaid only) ── */}
        {!report.isPaid && !emailSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-2xl border border-orange-100 shadow-card p-5 sm:p-6 mb-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 text-sm mb-1">Get this report emailed to you</p>
                <p className="text-xs text-slate-500 mb-3">Free. We'll send your verdict and fair price range so you have it handy when talking to your contractor.</p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setEmailLoading(true)
                    try {
                      await fetch('/api/email-capture', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          email,
                          jobType: report.quoteData.jobType,
                          location: `${report.quoteData.location.city}, ${report.quoteData.location.state}`,
                          verdict: verdictKey,
                          quotedPrice: report.quoteData.totalPrice,
                          fairPriceMin: fairMin,
                          fairPriceMax: fairMax,
                          potentialSavings: savings,
                        }),
                      })
                      setEmailSubmitted(true)
                    } catch {}
                    finally { setEmailLoading(false) }
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 input-light rounded-xl px-4 py-2.5 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="btn-teal px-4 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0 disabled:opacity-60"
                  >
                    {emailLoading ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
        {!report.isPaid && emailSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-6 flex items-center gap-3"
          >
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm font-medium text-green-700">Got it! Check your inbox shortly.</p>
          </motion.div>
        )}

        {/* ── Full report (paid) or paywall ── */}
        {report.isPaid && analysis ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Line item analysis */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 mb-5">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 text-slate-600" style={{width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-900">Line-by-Line Analysis</h2>
              </div>

              <div className="space-y-3">
                {analysis.lineItemAnalyses.map((item, i) => {
                  const sc = statusConfig[item.status] || statusConfig.fair
                  return (
                    <div key={i} className="border border-slate-100 rounded-xl p-4 hover:border-slate-200 transition-colors">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${sc.dot}`} />
                          <h3 className="font-semibold text-slate-900 text-sm leading-tight">{item.description}</h3>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${sc.badge}`}>
                          {sc.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm pl-5">
                        <div className="bg-slate-50 rounded-lg p-2.5">
                          <p className="text-xs text-slate-400 mb-0.5">Quoted</p>
                          <p className="font-bold text-slate-900">${item.quotedPrice.toLocaleString()}</p>
                        </div>
                        <div className="bg-teal-50 rounded-lg p-2.5">
                          <p className="text-xs text-teal-500 mb-0.5">Fair Range</p>
                          <p className="font-bold text-teal-700 text-xs sm:text-sm">
                            ${item.fairPriceMin.toLocaleString()} – ${item.fairPriceMax.toLocaleString()}
                          </p>
                        </div>
                        {item.percentageOver > 0 && (
                          <div className="bg-red-50 rounded-lg p-2.5">
                            <p className="text-xs text-red-400 mb-0.5">Overcharge</p>
                            <p className="font-bold text-red-600">+{item.percentageOver}%</p>
                          </div>
                        )}
                      </div>
                      {item.flagReason && (
                        <p className="text-xs text-slate-400 mt-2.5 pl-5 leading-relaxed">{item.flagReason}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Red Flags */}
            {analysis.redFlags.length > 0 && (
              <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-red-100 shadow-card p-6 sm:p-8 mb-5">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-red-50">
                  <div className="w-9 h-9 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center">
                    <svg className="w-4.5 h-4.5 text-red-600" style={{width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21l1-3L17 5l3 3L7 21H3zM14 7l3 3" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Red Flags</h2>
                    <p className="text-xs text-red-500">{analysis.redFlags.length} issue{analysis.redFlags.length !== 1 ? 's' : ''} found</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {analysis.redFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 bg-red-100 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      </span>
                      <p className="text-sm text-slate-700 leading-relaxed">{flag}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Missing Items */}
            {analysis.missingItems.length > 0 && (
              <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-purple-100 shadow-card p-6 sm:p-8 mb-5">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-purple-50">
                  <div className="w-9 h-9 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center">
                    <svg className="w-4.5 h-4.5 text-purple-600" style={{width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Missing Items</h2>
                    <p className="text-xs text-purple-500">Items typically included but absent from this quote</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {analysis.missingItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 bg-purple-100 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      </span>
                      <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Negotiation Scripts */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-teal-100 shadow-card p-6 sm:p-8 mb-5">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-teal-50">
                <div className="w-9 h-9 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 text-teal-600" style={{width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Negotiation Scripts</h2>
                  <p className="text-xs text-teal-600">Use these word-for-word with your contractor</p>
                </div>
              </div>
              <div className="space-y-4">
                {analysis.negotiationTips.map((tip, i) => (
                  <div key={i} className="bg-teal-50 border border-teal-100 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-teal-600 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">{i + 1}</span>
                      </span>
                      <p className="text-sm text-slate-700 leading-relaxed">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Questions to Ask */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-blue-100 shadow-card p-6 sm:p-8 mb-6">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-blue-50">
                <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 text-blue-600" style={{width:'18px',height:'18px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Questions to Ask Your Contractor</h2>
                  <p className="text-xs text-blue-600">Ask these before signing anything</p>
                </div>
              </div>
              <ul className="space-y-3">
                {analysis.questionsToAsk.map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">{i + 1}</span>
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed">{q}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="text-center pb-6 no-print">
              <Link href="/analyze" className="btn-teal px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Analyze Another Quote
              </Link>
            </motion.div>

          </motion.div>
        ) : (
          /* ── Paywall ── */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-card-md overflow-hidden"
          >
            {/* Paywall header */}
            <div className="bg-teal-gradient px-6 sm:px-8 py-6">
              <h2 className="text-xl font-extrabold text-white mb-1">Unlock Your Full Report</h2>
              <p className="text-teal-100 text-sm">
                Get the complete analysis, negotiation scripts, red flags, and questions to ask.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {/* Stats preview */}
              <div className="flex flex-wrap justify-center gap-4 mb-7">
                {[
                  { value: report.teaser?.lineItemCount || 0, label: 'Line items analyzed', color: 'text-slate-900', bg: 'bg-slate-50 border-slate-200' },
                  { value: report.teaser?.redFlagCount || 0, label: 'Red flags found', color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
                  { value: report.teaser?.negotiationTipCount || 0, label: 'Negotiation tips', color: 'text-teal-600', bg: 'bg-teal-50 border-teal-100' },
                ].map((s) => (
                  <div key={s.label} className={`flex flex-col items-center border rounded-xl px-5 py-3.5 ${s.bg}`}>
                    <span className={`text-2xl font-extrabold ${s.color}`}>{s.value}</span>
                    <span className="text-xs text-slate-500 mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Blurred preview */}
              <div className="relative mb-7">
                <div className="blur-locked space-y-3 pointer-events-none select-none">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-slate-100 rounded-xl p-4 h-20" />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-5 py-3 border border-slate-200 shadow-card text-center">
                    <svg className="w-6 h-6 text-slate-400 mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="text-sm font-semibold text-slate-700">Full report locked</p>
                    <p className="text-xs text-slate-400">Unlock to see all details</p>
                  </div>
                </div>
              </div>

              {/* What's included */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
                {[
                  'Line-by-line price breakdown',
                  'Red flags & missing items',
                  'Word-for-word negotiation scripts',
                  'Questions to ask your contractor',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={handleUnlockReport}
                disabled={checkoutLoading}
                className="w-full btn-teal py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Redirecting to checkout...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                    Unlock Full Report — $4.99
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 mt-3">
                <p className="text-xs text-slate-400">One-time payment. No subscription.</p>
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-xs text-slate-400">Secured by Stripe</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-slate-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4" style={{ borderWidth: '3px' }} />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    }>
      <ReportContent />
    </Suspense>
  )
}
