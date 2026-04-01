import Anthropic from '@anthropic-ai/sdk'
import { QuoteData, AnalysisResult } from '@/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

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

A homeowner has received a contractor quote and wants to know if they are being overcharged. Please analyze this quote thoroughly and provide a detailed assessment.

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

## Your Task

Analyze this contractor quote and provide a comprehensive assessment. Consider:
1. Regional pricing variations (labor costs differ significantly by state/city)
2. Current material costs and supply chain factors
3. Typical contractor markups (usually 15-30% on materials, hourly labor rates by trade)
4. What items seem priced fairly vs. inflated
5. Any missing items that should be included
6. Any vague line items that could lead to disputes
7. Red flags that suggest this contractor may not be reputable or is taking advantage of the homeowner
8. Practical negotiation tactics specific to this type of job
9. Important questions the homeowner should ask before signing

For regional pricing reference:
- High cost areas (NYC, SF, LA, Seattle, Boston): 30-50% above national average
- Medium cost areas (Chicago, Denver, Austin, Miami): 10-20% above national average
- Low cost areas (rural Midwest, Southeast): 10-20% below national average

Typical labor rates by trade (national average, 2024-2025):
- General contractor: $50-100/hr
- Electrician: $80-150/hr
- Plumber: $75-150/hr
- HVAC technician: $75-150/hr
- Roofer: $50-100/hr
- Painter: $40-80/hr
- Flooring installer: $40-80/hr
- Carpenter: $50-100/hr
- Kitchen/Bath remodel GC: $60-120/hr

Material markup ranges:
- Standard: 15-25% over wholesale
- High end: 25-40% over wholesale
- Suspicious: >50% over wholesale

Please respond with ONLY a valid JSON object (no markdown, no code blocks, just raw JSON) matching this exact structure:

{
  "verdict": "fair" | "slightly_high" | "overpriced" | "significantly_overpriced",
  "totalQuotedPrice": number,
  "estimatedFairPriceMin": number,
  "estimatedFairPriceMax": number,
  "potentialSavings": number,
  "lineItemAnalyses": [
    {
      "lineItemId": "string (use the id from input, or generate sequential ids like 'item-1' if not provided)",
      "description": "string",
      "quotedPrice": number,
      "fairPriceMin": number,
      "fairPriceMax": number,
      "status": "fair" | "slightly_high" | "overpriced" | "missing" | "vague",
      "flagReason": "string (explain why this is flagged, be specific and actionable)",
      "percentageOver": number (0 if fair, positive percentage if overpriced)
    }
  ],
  "missingItems": ["string (items that should typically be included but are missing from this quote)"],
  "vagueItems": ["string (line items that are too vague and need clarification)"],
  "redFlags": ["string (specific red flags about this quote or contractor)"],
  "negotiationTips": ["string (specific, actionable negotiation tips for this job type and situation)"],
  "questionsToAsk": ["string (important questions the homeowner should ask the contractor)"],
  "summary": "string (2-3 sentence plain English summary of the overall assessment, be direct and honest)"
}

Be specific with dollar amounts. Use your knowledge of the ${quoteData.location.city}, ${quoteData.location.state} market. If line items aren't provided individually, analyze based on the total and scope description. Always provide at least 3 negotiation tips and 3 questions to ask. Always identify at least 1 potential red flag or missing item even if the quote seems fair, as there are always areas to verify.`

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
