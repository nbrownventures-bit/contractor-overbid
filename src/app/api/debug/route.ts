import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    stripeKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 12) || 'NOT SET',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'NOT SET',
    hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
  })
}
