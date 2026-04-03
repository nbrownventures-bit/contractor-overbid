'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const JOB_TYPES = [
  'Roofing',
  'Plumbing',
  'Electrical',
  'HVAC',
  'Kitchen Remodel',
  'Bathroom Remodel',
  'Painting',
  'Flooring',
  'General Renovation',
  'Deck/Patio',
  'Fencing',
  'Landscaping',
  'Siding',
  'Windows/Doors',
  'Foundation/Structural',
  'Other',
]

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
]

interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function AnalyzePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [loadingStep, setLoadingStep] = useState(0)

  const loadingSteps = [
    { icon: '📋', text: 'Reading your quote details...' },
    { icon: '🔍', text: 'Researching market rates for your area...' },
    { icon: '📊', text: 'Comparing line items against fair pricing...' },
    { icon: '🚩', text: 'Identifying red flags and overcharges...' },
    { icon: '💬', text: 'Generating negotiation strategies...' },
    { icon: '✅', text: 'Finalizing your report...' },
  ]

  useEffect(() => {
    if (!isSubmitting) { setLoadingStep(0); return }
    const interval = setInterval(() => {
      setLoadingStep(prev => prev < loadingSteps.length - 1 ? prev + 1 : prev)
    }, 4000)
    return () => clearInterval(interval)
  }, [isSubmitting])

  const [jobType, setJobType] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [squareFootage, setSquareFootage] = useState('')
  const [scopeDescription, setScopeDescription] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [contractorName, setContractorName] = useState('')
  const [quoteText, setQuoteText] = useState('')
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0 },
  ])

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: String(lineItems.length + 1), description: '', quantity: 1, unitPrice: 0 },
    ])
  }

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id))
    }
  }

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(
      lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const validLineItems = lineItems
        .filter((item) => item.description.trim() !== '')
        .map((item) => ({
          id: item.id,
          description: item.description,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          totalPrice: Number(item.quantity) * Number(item.unitPrice),
        }))

      const payload = {
        jobType,
        location: { city, state },
        squareFootage: squareFootage ? Number(squareFootage) : undefined,
        scopeDescription,
        lineItems: validLineItems,
        totalPrice: Number(totalPrice),
        contractorName: contractorName || undefined,
        quoteText: quoteText || undefined,
      }

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Analysis failed')
      }

      const data = await res.json()
      // Store report in localStorage for the report page
      localStorage.setItem(`report-${data.report.id}`, JSON.stringify(data.report))
      router.push(`/report?id=${data.report.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-10">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
              <div className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Analyzing Your Quote</h2>
            <p className="text-slate-400 text-sm mb-8">This usually takes 15–30 seconds</p>
            <div className="space-y-3 text-left">
              {loadingSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: i <= loadingStep ? 1 : 0.3 }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    i < loadingStep ? 'bg-teal-50' : i === loadingStep ? 'bg-slate-50' : ''
                  }`}
                >
                  <span className="text-lg">{i < loadingStep ? '✅' : step.icon}</span>
                  <span className={`text-sm ${
                    i < loadingStep ? 'text-teal-700 font-medium' : i === loadingStep ? 'text-slate-700 font-medium' : 'text-slate-400'
                  }`}>{step.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Page header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-teal-500 rounded-full" />
            Free Analysis
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Analyze Your Contractor Quote
          </motion.h1>
          <motion.p variants={fadeUp} className="text-slate-500 text-lg max-w-xl mx-auto">
            Enter your quote details and our AI will analyze it against real market rates in seconds.
          </motion.p>
        </motion.div>

        {/* Progress stepper */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          {[
            { n: '1', label: 'Job Details' },
            { n: '2', label: 'Quote Details' },
            { n: '3', label: 'Analysis' },
          ].map((step, i) => (
            <div key={step.n} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${i < 2 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                <span>{step.n}</span>
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {i < 2 && <div className="w-6 h-px bg-slate-300" />}
            </div>
          ))}
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Card 1: Job Details ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Job Details</h2>
                <p className="text-xs text-slate-400">Tell us about the project</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Type <span className="text-teal-600">*</span>
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  required
                  className="w-full input-light rounded-xl px-4 py-3 text-sm"
                >
                  <option value="">Select job type...</option>
                  {JOB_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Contractor Name <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={contractorName}
                  onChange={(e) => setContractorName(e.target.value)}
                  placeholder="e.g., ABC Roofing Co."
                  className="w-full input-light rounded-xl px-4 py-3 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  City <span className="text-teal-600">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="e.g., Austin"
                  className="w-full input-light rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  State <span className="text-teal-600">*</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="w-full input-light rounded-xl px-4 py-3 text-sm"
                >
                  <option value="">Select...</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Sq Footage <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="number"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(e.target.value)}
                  placeholder="e.g., 1500"
                  className="w-full input-light rounded-xl px-4 py-3 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Scope of Work <span className="text-teal-600">*</span>
              </label>
              <textarea
                value={scopeDescription}
                onChange={(e) => setScopeDescription(e.target.value)}
                required
                rows={3}
                placeholder="Describe the work being done (e.g., 'Full roof replacement, tear off existing shingles, install new architectural shingles, replace flashing and vents')"
                className="w-full input-light rounded-xl px-4 py-3 text-sm resize-none"
              />
            </div>
          </motion.div>

          {/* ── Card 2: Quote Details ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Quote Details</h2>
                <p className="text-xs text-slate-400">What did the contractor quote you?</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Total Quoted Price <span className="text-teal-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">$</span>
                <input
                  type="number"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  required
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full input-light rounded-xl pl-9 pr-4 py-3 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Line Items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">
                    Line Items
                  </label>
                  <p className="text-xs text-slate-400 mt-0.5">Optional but recommended for a better analysis</p>
                </div>
                <button
                  type="button"
                  onClick={addLineItem}
                  className="text-sm text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Item
                </button>
              </div>

              {/* Header row */}
              <div className="hidden sm:grid grid-cols-[1fr_64px_120px_32px] gap-2 mb-2 px-1">
                <p className="text-xs font-medium text-slate-400">Description</p>
                <p className="text-xs font-medium text-slate-400 text-center">Qty</p>
                <p className="text-xs font-medium text-slate-400">Unit Price</p>
                <div />
              </div>

              <div className="space-y-2.5">
                {lineItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[1fr_64px_120px_32px] gap-2 items-start">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                      placeholder={`Item ${index + 1} description`}
                      className="input-light rounded-xl px-3 py-2.5 text-sm"
                    />
                    <input
                      type="number"
                      value={item.quantity || ''}
                      onChange={(e) => updateLineItem(item.id, 'quantity', Number(e.target.value))}
                      placeholder="1"
                      min="1"
                      className="input-light rounded-xl px-2 py-2.5 text-sm text-center"
                    />
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
                      <input
                        type="number"
                        value={item.unitPrice || ''}
                        onChange={(e) => updateLineItem(item.id, 'unitPrice', Number(e.target.value))}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full input-light rounded-xl pl-7 pr-3 py-2.5 text-sm"
                      />
                    </div>
                    {lineItems.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeLineItem(item.id)}
                        className="p-2 text-slate-300 hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 self-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : <div />}
                  </div>
                ))}
              </div>
            </div>

            {/* Full Quote Text */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Paste Full Quote <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <p className="text-xs text-slate-400 mb-2">Adding the full quote text gives the AI more context for a better analysis.</p>
              <textarea
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                rows={5}
                placeholder="Paste the full text of your contractor's quote or estimate here for a more detailed analysis..."
                className="w-full input-light rounded-xl px-4 py-3 resize-none text-sm"
              />
            </div>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm flex items-start gap-3"
            >
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </motion.div>
          )}

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-teal py-4 rounded-xl text-base font-bold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing Your Quote...
                </>
              ) : (
                <>
                  Analyze My Quote
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400 mt-3">
              Free initial analysis. Full detailed report for $4.99. No subscription needed.
            </p>
          </motion.div>

        </form>
      </div>
    </div>
  )
}
