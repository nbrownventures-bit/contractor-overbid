import { NextRequest, NextResponse } from 'next/server'
import { getReport } from '@/lib/storage'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Report ID is required' }, { status: 400 })
  }

  const report = getReport(id)

  if (!report) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 })
  }

  // If not paid, only return teaser data
  if (!report.isPaid) {
    return NextResponse.json({
      id: report.id,
      createdAt: report.createdAt,
      isPaid: false,
      quoteData: {
        jobType: report.quoteData.jobType,
        location: report.quoteData.location,
        totalPrice: report.quoteData.totalPrice,
      },
      teaser: {
        verdict: report.analysisResult.verdict,
        totalQuotedPrice: report.analysisResult.totalQuotedPrice,
        estimatedFairPriceMin: report.analysisResult.estimatedFairPriceMin,
        estimatedFairPriceMax: report.analysisResult.estimatedFairPriceMax,
        potentialSavings: report.analysisResult.potentialSavings,
        summary: report.analysisResult.summary,
        lineItemCount: report.analysisResult.lineItemAnalyses.length,
        redFlagCount: report.analysisResult.redFlags.length,
        negotiationTipCount: report.analysisResult.negotiationTips.length,
      },
    })
  }

  // Return full report
  return NextResponse.json(report)
}
