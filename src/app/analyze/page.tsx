'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

export default function AnalyzePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

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
      router.push(`/report?id=${data.reportId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Analyze Your <span className="gradient-text">Contractor Quote</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Enter your quote details below and our AI will analyze it in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Details */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 text-sm font-bold">1</span>
              Job Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Type <span className="text-orange-500">*</span>
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  required
                  className="w-full input-dark rounded-lg px-4 py-3"
                >
                  <option value="">Select job type...</option>
                  {JOB_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contractor Name <span className="text-gray-600">(optional)</span>
                </label>
                <input
                  type="text"
                  value={contractorName}
                  onChange={(e) => setContractorName(e.target.value)}
                  placeholder="e.g., ABC Roofing Co."
                  className="w-full input-dark rounded-lg px-4 py-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  City <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="e.g., Austin"
                  className="w-full input-dark rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  State <span className="text-orange-500">*</span>
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="w-full input-dark rounded-lg px-4 py-3"
                >
                  <option value="">Select...</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Square Footage <span className="text-gray-600">(optional)</span>
                </label>
                <input
                  type="number"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(e.target.value)}
                  placeholder="e.g., 1500"
                  className="w-full input-dark rounded-lg px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Scope of Work <span className="text-orange-500">*</span>
              </label>
              <textarea
                value={scopeDescription}
                onChange={(e) => setScopeDescription(e.target.value)}
                required
                rows={3}
                placeholder="Describe the work being done (e.g., 'Full roof replacement, tear off existing shingles, install new architectural shingles, replace flashing and vents')"
                className="w-full input-dark rounded-lg px-4 py-3 resize-none"
              />
            </div>
          </div>

          {/* Quote Details */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 text-sm font-bold">2</span>
              Quote Details
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Total Quoted Price <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  type="number"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  required
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full input-dark rounded-lg pl-8 pr-4 py-3"
                />
              </div>
            </div>

            {/* Line Items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-300">
                  Line Items <span className="text-gray-600">(optional but recommended)</span>
                </label>
                <button
                  type="button"
                  onClick={addLineItem}
                  className="text-sm text-orange-500 hover:text-orange-400 font-medium"
                >
                  + Add Item
                </button>
              </div>

              <div className="space-y-3">
                {lineItems.map((item, index) => (
                  <div key={item.id} className="flex gap-2 items-start">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                      placeholder={`Item ${index + 1} description`}
                      className="flex-1 input-dark rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      value={item.quantity || ''}
                      onChange={(e) => updateLineItem(item.id, 'quantity', Number(e.target.value))}
                      placeholder="Qty"
                      min="1"
                      className="w-16 input-dark rounded-lg px-2 py-2 text-sm text-center"
                    />
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600 text-sm">$</span>
                      <input
                        type="number"
                        value={item.unitPrice || ''}
                        onChange={(e) => updateLineItem(item.id, 'unitPrice', Number(e.target.value))}
                        placeholder="Price"
                        min="0"
                        step="0.01"
                        className="w-28 input-dark rounded-lg pl-6 pr-2 py-2 text-sm"
                      />
                    </div>
                    {lineItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLineItem(item.id)}
                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Full Quote Text */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Paste Full Quote <span className="text-gray-600">(optional)</span>
              </label>
              <textarea
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                rows={6}
                placeholder="Paste the full text of your contractor's quote or estimate here for a more detailed analysis..."
                className="w-full input-dark rounded-lg px-4 py-3 resize-none text-sm"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-orange py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

          <p className="text-center text-xs text-gray-600">
            Free initial analysis. Full detailed report for $9.99.
          </p>
        </form>
      </div>
    </div>
  )
}
