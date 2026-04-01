import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { analyzeQuote } from '@/lib/claude'
import { saveReport } from '@/lib/storage'
import { QuoteData, Report } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.jobType || !body.location?.city || !body.location?.state || !body.scopeDescription || !body.totalPrice) {
      return NextResponse.json(
        { error: 'Missing required fields: jobType, location (city, state), scopeDescription, and totalPrice are required.' },
        { status: 400 }
      )
    }

    const quoteData: QuoteData = {
      jobType: body.jobType,
      location: {
        city: body.location.city,
        state: body.location.state,
      },
      squareFootage: body.squareFootage,
      scopeDescription: body.scopeDescription,
      lineItems: body.lineItems || [],
      totalPrice: Number(body.totalPrice),
      contractorName: body.contractorName,
      quoteText: body.quoteText,
    }

    // Run AI analysis
    const analysisResult = await analyzeQuote(quoteData)

    // Create and save report
    const reportId = uuidv4()
    const report: Report = {
      id: reportId,
      createdAt: new Date().toISOString(),
      quoteData,
      analysisResult,
      isPaid: false,
    }

    saveReport(report)

    return NextResponse.json({
      reportId,
      // Return teaser data (free preview)
      teaser: {
        verdict: analysisResult.verdict,
        totalQuotedPrice: analysisResult.totalQuotedPrice,
        estimatedFairPriceMin: analysisResult.estimatedFairPriceMin,
        estimatedFairPriceMax: analysisResult.estimatedFairPriceMax,
        potentialSavings: analysisResult.potentialSavings,
        summary: analysisResult.summary,
      },
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('Analysis error:', errMsg, error)
    return NextResponse.json(
      { error: `Analysis failed: ${errMsg}` },
      { status: 500 }
    )
  }
}
