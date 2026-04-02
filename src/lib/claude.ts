import Anthropic from '@anthropic-ai/sdk'
import { QuoteData, AnalysisResult } from '@/types'

function getClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set')
  }
  return new Anthropic({ apiKey })
}

export async function analyzeQuote(quoteData: QuoteData): Promise<AnalysisResult> {
  const lineItemsText =
    quoteData.lineItems.length > 0
      ? quoteData.lineItems
          .map(
            (item) =>
              `- ${item.description}: ${item.quantity} x $${item.unitPrice.toFixed(2)} = $${item.totalPrice.toFixed(2)}`
          )
          .join('\n')
      : 'No individual line items provided'

  const prompt = `You are an expert contractor pricing analyst with 20+ years of experience in the home improvement and construction industry. You have deep knowledge of fair market rates for all types of contractor work across different regions of the United States.

A homeowner has received a contractor quote and wants an honest, accurate assessment of whether the price is fair.

CRITICAL RULES — READ CAREFULLY:
1. Your #1 job is ACCURACY. If the price is below market rate, say so. If it's fair, say so. If it's high, say so. Never default to "overpriced."
2. Compare the quoted price against the REALISTIC fair market range for this specific job type, scope, and location.
3. If the quoted price falls WITHIN or BELOW the fair range, the verdict MUST be "below_market" or "fair" — NOT overpriced.
4. Only flag as "overpriced" or "significantly_overpriced" if the price clearly exceeds the fair market range.
5. Consider the full scope of work described — a higher price may be justified by a larger scope.
6. When in doubt, lean toward "fair" rather than "overpriced." False overpriced flags damage trust.
7. potentialSavings should be 0 if the quote is fair or below market. Only show savings if genuinely overpriced.

## Quote Details

**Job Type:** ${quoteData.jobType}
**Location:** ${quoteData.location.city}, ${quoteData.location.state}
${quoteData.squareFootage ? `**Square Footage:** ${quoteData.squareFootage} sq ft` : ''}
${quoteData.contractorName ? `**Contractor:** ${quoteData.contractorName}` : ''}
**Total Quoted Price:** $${quoteData.totalPrice.toFixed(2)}

**Scope of Work Description:**
${quoteData.scopeDescription}

**Line Items:**
${lineItemsText}

${quoteData.quoteText ? `**Full Quote Text:**\n${quoteData.quoteText}` : ''}

## Analysis Guidelines

Consider these factors:
1. Regional pricing variations (labor costs differ significantly by state/city)
2. Current material costs (2025-2026 pricing)
3. Typical contractor markups (15-30% on materials, hourly labor rates by trade)
4. Scope of work — more work justifies higher prices
5. Quality of materials implied by the description
6. Whether the price includes permits, cleanup, warranties
7. Any missing items that should be included
8. Any vague line items that could lead to disputes
9. Red flags about the quote structure
10. Practical negotiation tactics

Regional pricing reference:
- High cost areas (NYC, SF, LA, Seattle, Boston): 30-50% above national average
- Medium cost areas (Chicago, Denver, Austin, Miami): 10-20% above national average
- Low cost areas (rural Midwest, Southeast): 10-20% below national average

Common project cost ranges (2025-2026, national averages including labor + materials):
- Full roof replacement (asphalt, 2000 sq ft): $8,000-$15,000
- HVAC system replacement: $5,000-$12,000
- Kitchen remodel (mid-range): $25,000-$50,000
- Bathroom remodel: $10,000-$25,000
- Interior painting (whole house): $3,000-$8,000
- Plumbing repipe: $4,000-$10,000
- Electrical panel upgrade: $1,500-$4,000
- Flooring (hardwood, 1000 sq ft): $6,000-$12,000
- Deck build (300 sq ft): $8,000-$20,000
- Fence installation (200 linear ft): $3,000-$8,000

These are RANGES. Prices within these ranges are FAIR. Prices below are BELOW MARKET. Only prices meaningfully above are overpriced.

Please respond with ONLY a valid JSON object (no markdown, no code blocks, just raw JSON) matching this exact structure:

{
  "verdict": "below_market" | "fair" | "slightly_high" | "overpriced" | "significantly_overpriced",
  "totalQuotedPrice": number,
  "estimatedFairPriceMin": number,
  "estimatedFairPriceMax": number,
  "potentialSavings": number (0 if fair or below market, positive number only if genuinely overpriced),
  "lineItemAnalyses": [
    {
      "lineItemId": "string (use the id from input, or generate sequential ids like 'item-1' if not provided)",
      "description": "string",
      "quotedPrice": number,
      "fairPriceMin": number,
      "fairPriceMax": number,
      "status": "below_market" | "fair" | "slightly_high" | "overpriced" | "missing" | "vague",
      "flagReason": "string (explain the assessment — be specific and honest)",
      "percentageOver": number (0 if fair or below, positive if over, negative if below market)
    }
  ],
  "missingItems": ["string (items that should typically be included but are missing from this quote)"],
  "vagueItems": ["string (line items that are too vague and need clarification)"],
  "redFlags": ["string (genuine red flags only — do not invent problems that don't exist)"],
  "negotiationTips": ["string (specific, actionable tips — if the price is fair, tips should focus on ensuring scope/quality rather than lowering price)"],
  "questionsToAsk": ["string (important questions the homeowner should ask the contractor)"],
  "summary": "string (2-3 sentence plain English summary. Be HONEST — if it's a good price, say so clearly. If it's overpriced, explain why. Don't hedge excessively.)"
}

IMPORTANT VALIDATION: Before you output, check: is the totalQuotedPrice within or below the estimatedFairPriceMin-estimatedFairPriceMax range? If yes, the verdict MUST be "fair" or "below_market", NOT overpriced. Double-check this.

Be specific with dollar amounts. Use your knowledge of the ${quoteData.location.city}, ${quoteData.location.state} market. If line items aren't provided individually, analyze based on the total and scope description. Always provide at least 3 negotiation tips and 3 questions to ask.`

  const anthropic = getClient()
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude API')
  }

  let responseText = content.text.trim()

  // Strip markdown code blocks if present
  if (responseText.startsWith('```')) {
    responseText = responseText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
  }

  try {
    const analysisResult = JSON.parse(responseText) as AnalysisResult
    return analysisResult
  } catch (parseError) {
    console.error('Failed to parse Claude response as JSON:', responseText)
    throw new Error('Failed to parse analysis response. Please try again.')
  }
}
