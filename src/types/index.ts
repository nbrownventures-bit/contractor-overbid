export interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface QuoteData {
  jobType: string
  location: {
    city: string
    state: string
  }
  squareFootage?: number
  scopeDescription: string
  lineItems: LineItem[]
  totalPrice: number
  contractorName?: string
  quoteText?: string
  imageUrl?: string
}

export interface LineItemAnalysis {
  lineItemId: string
  description: string
  quotedPrice: number
  fairPriceMin: number
  fairPriceMax: number
  status: 'fair' | 'slightly_high' | 'overpriced' | 'missing' | 'vague'
  flagReason?: string
  percentageOver?: number
}

export interface AnalysisResult {
  verdict: 'fair' | 'slightly_high' | 'overpriced' | 'significantly_overpriced'
  totalQuotedPrice: number
  estimatedFairPriceMin: number
  estimatedFairPriceMax: number
  potentialSavings: number
  lineItemAnalyses: LineItemAnalysis[]
  missingItems: string[]
  vagueItems: string[]
  redFlags: string[]
  negotiationTips: string[]
  questionsToAsk: string[]
  summary: string
}

export interface Report {
  id: string
  createdAt: string
  quoteData: QuoteData
  analysisResult: AnalysisResult
  isPaid: boolean
  stripeSessionId?: string
}
