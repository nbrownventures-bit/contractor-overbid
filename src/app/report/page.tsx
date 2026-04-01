'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

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

const verdictLabels: Record<string, { label: string; color: string; bg: string }> = {
  fair: { label: '✅ Fair Price', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  slightly_high: { label: '⚠️ Slightly High', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  overpriced: { label: '🔴 Overpriced', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  significantly_overpriced: { label: '🚨 Significantly Overpriced', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
}

const statusColors: Record<string, string> = {
  fair: 'bg-green-500',
  slightly_high: 'bg-yellow-500',
  overpriced: 'bg-orange-500',
  significantly_overpriced: 'bg-red-500',
  missing: 'bg-purple-500',
  vague: 'bg-blue-500',
}

function ReportContent() {
  const searchParams = useSearchParams()
  const reportId = searchParams.get('id')
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    if (!reportId) return
    fetchReport()
  }, [reportId])

  const fetchReport = async () => {
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
        fetchReport()
      }
    } catch {
      setError('Failed to start checkout. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg className="w-10 h-10 animate-spin text-orange-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-400">Loading your report...</p>
        </div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card rounded-2xl p-8 text-center max-w-md">
          <p className="text-red-400 mb-4">{error || 'Report not found'}</p>
          <Link href="/analyze" className="btn-orange px-6 py-3 rounded-lg font-semibold inline-block">
            Analyze a New Quote
          </Link>
        </div>
      </div>
    )
  }

  const verdict = report.isPaid
    ? verdictLabels[report.analysisResult?.verdict || 'fair']
    : verdictLabels[report.teaser?.verdict || 'fair']

  const savings = report.isPaid ? report.analysisResult?.potentialSavings : report.teaser?.potentialSavings
  const summary = report.isPaid ? report.analysisResult?.summary : report.teaser?.summary
  const fairMin = report.isPaid ? report.analysisResult?.estimatedFairPriceMin : report.teaser?.estimatedFairPriceMin
  const fairMax = report.isPaid ? report.analysisResult?.estimatedFairPriceMax : report.teaser?.estimatedFairPriceMax

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Quote Analysis</h1>
          <p className="text-gray-500 text-sm">
            {report.quoteData.jobType} • {report.quoteData.location.city}, {report.quoteData.location.state}
          </p>
        </div>

        {/* Verdict Card */}
        <div className={`rounded-2xl p-8 border ${verdict.bg} mb-8 text-center`}>
          <p className={`text-3xl font-bold mb-2 ${verdict.color}`}>{verdict.label}</p>
          <p className="text-gray-300 text-lg mb-6">{summary}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Quoted Price</p>
              <p className="text-2xl font-bold">${report.quoteData.totalPrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Fair Price Range</p>
              <p className="text-2xl font-bold text-green-400">
                ${fairMin?.toLocaleString()} – ${fairMax?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Potential Savings</p>
              <p className="text-2xl font-bold text-orange-500">
                ${savings?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Full Report or Paywall */}
        {report.isPaid && report.analysisResult ? (
          <>
            {/* Line Item Analysis */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 mb-6">
              <h2 className="text-xl font-bold mb-6">Line-by-Line Analysis</h2>
              <div className="space-y-4">
                {report.analysisResult.lineItemAnalyses.map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${statusColors[item.status]}`} />
                        <h3 className="font-semibold">{item.description}</h3>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full status-${item.status}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                      <div>
                        <span className="text-gray-500">Quoted:</span>{' '}
                        <span className="font-medium">${item.quotedPrice.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Fair range:</span>{' '}
                        <span className="text-green-400 font-medium">
                          ${item.fairPriceMin.toLocaleString()} – ${item.fairPriceMax.toLocaleString()}
                        </span>
                      </div>
                      {item.percentageOver > 0 && (
                        <div>
                          <span className="text-orange-400 font-medium">{item.percentageOver}% over</span>
                        </div>
                      )}
                    </div>
                    {item.flagReason && (
                      <p className="text-sm text-gray-400 mt-1">{item.flagReason}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Red Flags */}
            {report.analysisResult.redFlags.length > 0 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  🚩 Red Flags
                </h2>
                <ul className="space-y-3">
                  {report.analysisResult.redFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Missing Items */}
            {report.analysisResult.missingItems.length > 0 && (
              <div className="glass-card rounded-2xl p-6 sm:p-8 mb-6">
                <h2 className="text-xl font-bold mb-4">📋 Missing Items</h2>
                <ul className="space-y-3">
                  {report.analysisResult.missingItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Negotiation Tips */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 mb-6">
              <h2 className="text-xl font-bold mb-4">💬 Negotiation Scripts</h2>
              <div className="space-y-4">
                {report.analysisResult.negotiationTips.map((tip, i) => (
                  <div key={i} className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-4">
                    <p className="text-gray-300 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions to Ask */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 mb-6">
              <h2 className="text-xl font-bold mb-4">❓ Questions to Ask Your Contractor</h2>
              <ul className="space-y-3">
                {report.analysisResult.questionsToAsk.map((q, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-orange-500 font-bold text-sm mt-0.5">{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
              <Link href="/analyze" className="btn-orange px-8 py-3 rounded-xl font-semibold inline-block">
                Analyze Another Quote
              </Link>
            </div>
          </>
        ) : (
          /* Paywall */
          <div className="glass-card rounded-2xl p-8 border border-orange-500/20 text-center">
            <h2 className="text-2xl font-bold mb-3">Unlock Your Full Report</h2>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Get the complete line-by-line analysis, negotiation scripts, red flags, and questions to ask your contractor.
            </p>

            {/* Blurred preview */}
            <div className="relative mb-8">
              <div className="blur-locked space-y-3">
                <div className="bg-white/5 rounded-xl p-4 h-16" />
                <div className="bg-white/5 rounded-xl p-4 h-16" />
                <div className="bg-white/5 rounded-xl p-4 h-16" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/80 rounded-xl px-6 py-3 border border-orange-500/20">
                  <p className="text-sm text-gray-400">
                    <span className="text-orange-500 font-bold">{report.teaser?.lineItemCount || 0}</span> line items analyzed •{' '}
                    <span className="text-red-400 font-bold">{report.teaser?.redFlagCount || 0}</span> red flags •{' '}
                    <span className="text-green-400 font-bold">{report.teaser?.negotiationTipCount || 0}</span> negotiation tips
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleUnlockReport}
                disabled={checkoutLoading}
                className="btn-orange px-10 py-4 rounded-xl text-lg font-bold inline-flex items-center gap-2 disabled:opacity-50"
              >
                {checkoutLoading ? (
                  'Redirecting to checkout...'
                ) : (
                  <>
                    Unlock Full Report — $9.99
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </>
                )}
              </button>
              <p className="text-xs text-gray-600">One-time payment. No subscriptions. Instant access.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    }>
      <ReportContent />
    </Suspense>
  )
}
