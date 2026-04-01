'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { motion } from 'framer-motion'

function CancelContent() {
  const searchParams = useSearchParams()
  const reportId = searchParams.get('reportId')

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg border border-slate-100 p-10 text-center max-w-md"
      >
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Payment Cancelled</h1>
        <p className="text-slate-500 mb-6">
          No worries — your free preview is still available. You can unlock the full report anytime.
        </p>
        <div className="flex flex-col gap-3">
          {reportId && (
            <Link
              href={`/report?id=${reportId}`}
              className="inline-flex items-center justify-center px-8 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/20"
            >
              Back to My Report
            </Link>
          )}
          <Link
            href="/analyze"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            Analyze a Different Quote
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><p className="text-slate-400">Loading...</p></div>}>
      <CancelContent />
    </Suspense>
  )
}
