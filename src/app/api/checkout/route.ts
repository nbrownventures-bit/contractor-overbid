import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { reportId } = await req.json()

    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 })
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    const stripe = new Stripe(stripeKey)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://contractor-overbid.vercel.app'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'ContractorOverBid Full Report',
              description: 'Complete line-by-line contractor quote analysis with negotiation tips and savings breakdown.',
            },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/payment/success?reportId=${reportId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment/cancel?reportId=${reportId}`,
      metadata: { reportId },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('Checkout error:', errMsg)
    return NextResponse.json({ error: `Checkout failed: ${errMsg}` }, { status: 500 })
  }
}
