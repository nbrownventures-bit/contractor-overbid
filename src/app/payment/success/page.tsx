'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg border border-slate-100 p-10 text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Payment Successful!</h1>
        <p className="text-slate-500 mb-6">
          Your full report is now unlocked. Redirecting in {countdown} seconds...
        </p>
        <Link
          href={`/report?id=${reportId}`}
          className="inline-flex items-center justify-center px-8 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20"
        >
          View Full Report Now
        </Link>
      </motion.div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><p className="text-slate-400">Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  )
}
