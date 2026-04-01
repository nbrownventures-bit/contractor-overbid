'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const reportId = searchParams.get('reportId')
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Mark report as paid in localStorage
    if (reportId) {
      try {
        const stored = localStorage.getItem(`report-${reportId}`)
        if (stored) {
          const report = JSON.parse(stored)
          report.isPaid = true
          localStorage.setItem(`report-${reportId}`, JSON.stringify(report))
        }
      } catch {}
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = `/report?id=${reportId}`
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [reportId])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card rounded-2xl p-10 text-center max-w-md border border-green-500/20">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">Payment Successful!</h1>
        <p className="text-gray-400 mb-6">
          Your full report is now unlocked. Redirecting in {countdown} seconds...
        </p>
        <Link
          href={`/report?id=${reportId}`}
          className="btn-orange px-8 py-3 rounded-xl font-semibold inline-block"
        >
          View Full Report Now
        </Link>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  )
}
