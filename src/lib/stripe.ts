import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function createCheckoutSession(
  reportId: string,
  baseUrl: string
): Promise<Stripe.Checkout.Session> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'ContractorOverBid Full Report',
            description:
              'Complete line-by-line contractor quote analysis with negotiation tips, red flags, and potential savings breakdown.',
            images: [],
          },
          unit_amount: 999, // $9.99 in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${baseUrl}/payment/success?reportId=${reportId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/payment/cancel?reportId=${reportId}`,
    metadata: {
      reportId,
    },
  })

  return session
}
