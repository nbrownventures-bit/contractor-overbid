import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function getVerdictLabel(verdict: string): string {
  const labels: Record<string, string> = {
    below_market: 'Below Market — Great Deal',
    fair: 'Fair Price',
    slightly_high: 'Slightly High',
    overpriced: 'Overpriced',
    significantly_overpriced: 'Significantly Overpriced',
  }
  return labels[verdict] || 'Analysis Complete'
}

function getVerdictEmoji(verdict: string): string {
  const emojis: Record<string, string> = {
    below_market: '✅',
    fair: '✅',
    slightly_high: '⚠️',
    overpriced: '🚨',
    significantly_overpriced: '🚨',
  }
  return emojis[verdict] || '📊'
}

function getVerdictColor(verdict: string): string {
  const colors: Record<string, string> = {
    below_market: '#16a34a',
    fair: '#16a34a',
    slightly_high: '#d97706',
    overpriced: '#ea580c',
    significantly_overpriced: '#dc2626',
  }
  return colors[verdict] || '#0d9488'
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, reportId, reportData } = await req.json()

    if (!sessionId || !reportId) {
      return NextResponse.json({ error: 'Missing sessionId or reportId' }, { status: 400 })
    }

    // Get customer email from Stripe
    const stripeRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    })

    if (!stripeRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch Stripe session' }, { status: 500 })
    }

    const session = await stripeRes.json()
    const email = session.customer_details?.email

    if (!email) {
      return NextResponse.json({ error: 'No email found in Stripe session' }, { status: 400 })
    }

    // Build email from report data
    const analysis = reportData?.analysisResult
    const teaser = reportData?.teaser
    const verdict = analysis?.verdict || teaser?.verdict || 'fair'
    const jobType = reportData?.quoteData?.jobType || 'Your Job'
    const location = reportData?.quoteData?.location
      ? `${reportData.quoteData.location.city}, ${reportData.quoteData.location.state}`
      : ''
    const quotedPrice = reportData?.quoteData?.totalPrice
    const fairMin = analysis?.estimatedFairPriceMin ?? teaser?.estimatedFairPriceMin
    const fairMax = analysis?.estimatedFairPriceMax ?? teaser?.estimatedFairPriceMax

    const verdictLabel = getVerdictLabel(verdict)
    const verdictEmoji = getVerdictEmoji(verdict)
    const verdictColor = getVerdictColor(verdict)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://contractoroverbid.com'

    // Build line items HTML (if paid report available)
    let lineItemsHtml = ''
    if (analysis?.lineItemAnalyses?.length) {
      const statusColors: Record<string, string> = {
        below_market: '#16a34a',
        fair: '#16a34a',
        slightly_high: '#d97706',
        overpriced: '#ea580c',
        significantly_overpriced: '#dc2626',
      }
      const statusLabels: Record<string, string> = {
        below_market: 'Below Market',
        fair: 'Fair',
        slightly_high: 'Slightly High',
        overpriced: 'Overpriced',
        significantly_overpriced: 'Significantly Overpriced',
      }
      lineItemsHtml = `
        <tr><td style="padding:24px 40px 8px;">
          <p style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 12px;">Line-by-Line Breakdown</p>
          ${analysis.lineItemAnalyses.map((item: { description: string; quotedPrice: number; fairPriceMin: number; fairPriceMax: number; status: string; flagReason?: string; percentageOver?: number }) => `
          <div style="border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin-bottom:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <p style="font-size:13px;font-weight:600;color:#0f172a;margin:0;">${item.description}</p>
              <span style="font-size:11px;font-weight:700;color:${statusColors[item.status] || '#64748b'};background:${statusColors[item.status] || '#64748b'}15;padding:2px 8px;border-radius:20px;">${statusLabels[item.status] || item.status}</span>
            </div>
            <p style="font-size:12px;color:#64748b;margin:0;">Quoted: <strong>$${item.quotedPrice.toLocaleString()}</strong> &nbsp;·&nbsp; Fair: <strong>$${item.fairPriceMin.toLocaleString()} – $${item.fairPriceMax.toLocaleString()}</strong>${item.percentageOver && item.percentageOver > 0 ? ` &nbsp;·&nbsp; <span style="color:#dc2626;">+${item.percentageOver}% over</span>` : ''}</p>
            ${item.flagReason ? `<p style="font-size:11px;color:#94a3b8;margin:4px 0 0;">${item.flagReason}</p>` : ''}
          </div>`).join('')}
        </td></tr>`
    }

    // Red flags HTML
    let redFlagsHtml = ''
    if (analysis?.redFlags?.length) {
      redFlagsHtml = `
        <tr><td style="padding:8px 40px;">
          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px;">
            <p style="font-size:13px;font-weight:700;color:#dc2626;margin:0 0 10px;">🚩 Red Flags (${analysis.redFlags.length})</p>
            ${analysis.redFlags.map((flag: string) => `<p style="font-size:13px;color:#7f1d1d;margin:0 0 6px;padding-left:12px;border-left:3px solid #fca5a5;">• ${flag}</p>`).join('')}
          </div>
        </td></tr>`
    }

    // Negotiation tips HTML
    let negotiationHtml = ''
    if (analysis?.negotiationTips?.length) {
      negotiationHtml = `
        <tr><td style="padding:8px 40px;">
          <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:10px;padding:16px;">
            <p style="font-size:13px;font-weight:700;color:#0d9488;margin:0 0 10px;">💬 Negotiation Scripts</p>
            ${analysis.negotiationTips.map((tip: string, i: number) => `<p style="font-size:13px;color:#134e4a;margin:0 0 8px;">${i + 1}. ${tip}</p>`).join('')}
          </div>
        </td></tr>`
    }

    // Questions HTML
    let questionsHtml = ''
    if (analysis?.questionsToAsk?.length) {
      questionsHtml = `
        <tr><td style="padding:8px 40px 24px;">
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:16px;">
            <p style="font-size:13px;font-weight:700;color:#1d4ed8;margin:0 0 10px;">❓ Questions to Ask Your Contractor</p>
            ${analysis.questionsToAsk.map((q: string, i: number) => `<p style="font-size:13px;color:#1e3a5f;margin:0 0 6px;">${i + 1}. ${q}</p>`).join('')}
          </div>
        </td></tr>`
    }

    const { error: resendError } = await resend.emails.send({
      from: 'Contractor OverBid <noreply@contractoroverbid.com>',
      to: email,
      subject: `${verdictEmoji} Your Full Report Is Ready — ${jobType}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Full Report</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1B2E4A;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <img src="https://contractoroverbid.com/logo-horizontal.svg" alt="Contractor OverBid" height="36" style="height:36px;margin-bottom:12px;" onerror="this.style.display='none'" />
              <p style="color:#F5921D;font-size:13px;font-weight:600;margin:0;letter-spacing:0.08em;text-transform:uppercase;">Full Analysis Report</p>
            </td>
          </tr>

          <!-- Verdict card -->
          <tr>
            <td style="background:#ffffff;padding:32px 40px 24px;">
              <p style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 4px;">Your report is ready 🎉</p>
              <p style="font-size:14px;color:#64748b;margin:0 0 24px;">Here's your complete analysis for <strong>${jobType}</strong>${location ? ` in <strong>${location}</strong>` : ''}.</p>

              <div style="background:${verdictColor}15;border:1px solid ${verdictColor}30;border-radius:12px;padding:20px 24px;text-align:center;margin-bottom:24px;">
                <p style="font-size:28px;margin:0 0 8px;">${verdictEmoji}</p>
                <p style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 4px;">Verdict</p>
                <p style="font-size:22px;font-weight:800;color:${verdictColor};margin:0;">${verdictLabel}</p>
              </div>

              <!-- Numbers -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  ${quotedPrice ? `
                  <td width="50%" style="padding:0 4px 0 0;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;text-align:center;">
                      <p style="font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;margin:0 0 4px;">Quoted</p>
                      <p style="font-size:20px;font-weight:800;color:#0f172a;margin:0;">$${Number(quotedPrice).toLocaleString()}</p>
                    </div>
                  </td>
                  ` : ''}
                  ${fairMin && fairMax ? `
                  <td width="50%" style="padding:0 0 0 4px;">
                    <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:10px;padding:14px;text-align:center;">
                      <p style="font-size:11px;font-weight:600;color:#0d9488;text-transform:uppercase;margin:0 0 4px;">Fair Range</p>
                      <p style="font-size:16px;font-weight:800;color:#0d9488;margin:0;">$${Number(fairMin).toLocaleString()} – $${Number(fairMax).toLocaleString()}</p>
                    </div>
                  </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>

          <!-- View online CTA -->
          <tr>
            <td style="background:#ffffff;padding:0 40px 24px;text-align:center;">
              <a href="${baseUrl}/report?id=${reportId}" style="display:inline-block;background:#F5921D;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:10px;">
                View Full Report Online →
              </a>
              <p style="font-size:12px;color:#94a3b8;margin:12px 0 0;">Or scroll down to read everything right here.</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="background:#ffffff;padding:0 40px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" /></td></tr>

          <!-- Line items -->
          ${lineItemsHtml}

          <!-- Red flags -->
          ${redFlagsHtml}

          <!-- Negotiation -->
          ${negotiationHtml}

          <!-- Questions -->
          ${questionsHtml}

          <!-- Footer CTA -->
          <tr>
            <td style="background:#ffffff;padding:8px 40px 32px;text-align:center;">
              <a href="${baseUrl}/analyze" style="display:inline-block;background:#1B2E4A;color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:10px;">
                Analyze Another Quote
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
              <p style="font-size:12px;color:#94a3b8;margin:0 0 4px;">ContractorOverBid.com — Know what's fair before you sign.</p>
              <p style="font-size:11px;color:#cbd5e1;margin:0;">You received this because you purchased a report. No subscription, no spam.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    })

    if (resendError) {
      console.error('Resend error:', resendError)
      return NextResponse.json({ error: 'Email failed to send' }, { status: 500 })
    }

    console.log(`Post-purchase email sent to ${email} for report ${reportId}`)
    return NextResponse.json({ success: true, email })
  } catch (error) {
    console.error('Send report email error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
