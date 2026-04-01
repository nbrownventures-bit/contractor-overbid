import { NextRequest, NextResponse } from 'next/server'

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

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://contractor-overbid.vercel.app'

    // Use fetch directly to avoid Stripe SDK connection issues on Vercel
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: [
        'payment_method_types[0]=card',
        'line_items[0][price_data][currency]=usd',
        `line_items[0][price_data][product_data][name]=${encodeURIComponent('ContractorOverBid Full Report')}`,
        `line_items[0][price_data][product_data][description]=${encodeURIComponent('Complete line-by-line quote analysis with negotiation tips.')}`,
        'line_items[0][price_data][unit_amount]=999',
        'line_items[0][quantity]=1',
        'mode=payment',
        `success_url=${encodeURIComponent(baseUrl + '/payment/success?reportId=' + reportId)}`,
        `cancel_url=${encodeURIComponent(baseUrl + '/payment/cancel?reportId=' + reportId)}`,
        `metadata[reportId]=${reportId}`,
      ].join('&'),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Stripe error:', JSON.stringify(data))
      return NextResponse.json({ error: `Stripe error: ${data.error?.message || 'Unknown'}` }, { status: 500 })
    }

    return NextResponse.json({ url: data.url })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('Checkout error:', errMsg)
    return NextResponse.json({ error: `Checkout failed: ${errMsg}` }, { status: 500 })
  }
}
