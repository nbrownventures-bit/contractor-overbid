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
    const { email, jobType, location, verdict, fairPriceMin, fairPriceMax, quotedPrice, potentialSavings } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const verdictLabel = getVerdictLabel(verdict)
    const verdictEmoji = getVerdictEmoji(verdict)
    const verdictColor = getVerdictColor(verdict)

    // Send branded email via Resend
    const { error: resendError } = await resend.emails.send({
      from: 'Contractor OverBid <noreply@contractoroverbid.com>',
      to: email,
      subject: `${verdictEmoji} Your Contractor Quote Analysis — ${jobType}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Quote Analysis</title>
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
              <p style="color:#F5921D;font-size:13px;font-weight:600;margin:0;letter-spacing:0.08em;text-transform:uppercase;">Quote Analysis Report</p>
            </td>
          </tr>

          <!-- Verdict card -->
          <tr>
            <td style="background:#ffffff;padding:32px 40px 24px;">
              <div style="background:${verdictColor}15;border:1px solid ${verdictColor}30;border-radius:12px;padding:20px 24px;margin-bottom:24px;text-align:center;">
                <p style="font-size:28px;margin:0 0 8px;">${verdictEmoji}</p>
                <p style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 4px;">Verdict</p>
                <p style="font-size:22px;font-weight:800;color:${verdictColor};margin:0;">${verdictLabel}</p>
              </div>

              <p style="font-size:15px;color:#475569;margin:0 0 24px;line-height:1.6;">
                Here's a summary of your <strong>${jobType}</strong> quote analysis${location ? ` for <strong>${location}</strong>` : ''}.
              </p>

              <!-- Numbers -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  ${quotedPrice ? `
                  <td width="33%" style="padding:0 4px 0 0;">
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;text-align:center;">
                      <p style="font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;margin:0 0 4px;">Quoted</p>
                      <p style="font-size:18px;font-weight:800;color:#0f172a;margin:0;">$${Number(quotedPrice).toLocaleString()}</p>
                    </div>
                  </td>
                  ` : ''}
                  ${fairPriceMin && fairPriceMax ? `
                  <td width="33%" style="padding:0 4px;">
                    <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:10px;padding:14px;text-align:center;">
                      <p style="font-size:11px;font-weight:600;color:#0d9488;text-transform:uppercase;margin:0 0 4px;">Fair Range</p>
                      <p style="font-size:14px;font-weight:800;color:#0d9488;margin:0;">$${Number(fairPriceMin).toLocaleString()} – $${Number(fairPriceMax).toLocaleString()}</p>
                    </div>
                  </td>
                  ` : ''}
                  ${potentialSavings && Number(potentialSavings) > 0 ? `
                  <td width="33%" style="padding:0 0 0 4px;">
                    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px;text-align:center;">
                      <p style="font-size:11px;font-weight:600;color:#16a34a;text-transform:uppercase;margin:0 0 4px;">Potential Savings</p>
                      <p style="font-size:18px;font-weight:800;color:#16a34a;margin:0;">$${Number(potentialSavings).toLocaleString()}</p>
                    </div>
                  </td>
                  ` : ''}
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />

              <!-- What's in the full report -->
              <p style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 12px;">Want the full analysis?</p>
              <p style="font-size:14px;color:#64748b;margin:0 0 16px;line-height:1.6;">Your full report includes line-by-line pricing, red flags, negotiation scripts, and questions to ask your contractor — for just $4.99.</p>

              <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:4px 0;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:20px;height:20px;background:#ccfbf1;border-radius:50%;text-align:center;vertical-align:middle;">
                        <span style="color:#0d9488;font-size:11px;font-weight:700;">✓</span>
                      </td>
                      <td style="padding-left:10px;font-size:13px;color:#475569;">Line-by-line price breakdown</td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:20px;height:20px;background:#ccfbf1;border-radius:50%;text-align:center;vertical-align:middle;">
                        <span style="color:#0d9488;font-size:11px;font-weight:700;">✓</span>
                      </td>
                      <td style="padding-left:10px;font-size:13px;color:#475569;">Red flags & missing items</td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:20px;height:20px;background:#ccfbf1;border-radius:50%;text-align:center;vertical-align:middle;">
                        <span style="color:#0d9488;font-size:11px;font-weight:700;">✓</span>
                      </td>
                      <td style="padding-left:10px;font-size:13px;color:#475569;">Word-for-word negotiation scripts</td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:20px;height:20px;background:#ccfbf1;border-radius:50%;text-align:center;vertical-align:middle;">
                        <span style="color:#0d9488;font-size:11px;font-weight:700;">✓</span>
                      </td>
                      <td style="padding-left:10px;font-size:13px;color:#475569;">Questions to ask your contractor</td>
                    </tr></table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://contractoroverbid.com/analyze" style="display:inline-block;background:#F5921D;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:10px;">
                      Unlock Full Report — $4.99 →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
              <p style="font-size:12px;color:#94a3b8;margin:0 0 4px;">ContractorOverBid.com — Know what's fair before you sign.</p>
              <p style="font-size:11px;color:#cbd5e1;margin:0;">You received this because you requested a quote analysis. No subscription, no spam.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    if (resendError) {
      console.error('Resend error:', resendError)
      // Don't fail silently — log it but still notify Discord
    }

    // Also notify via Discord
    const discordToken = process.env.DISCORD_BOT_TOKEN
    const channelId = '1489649727703093449'

    if (discordToken) {
      const message = `📧 **New Email Capture!**\n**Email:** ${email}\n**Job:** ${jobType || 'Unknown'}\n**Location:** ${location || 'Unknown'}\n**Verdict:** ${verdict || 'Unknown'}${resendError ? '\n⚠️ Resend delivery failed: ' + resendError.message : '\n✅ Email sent via Resend'}`

      await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bot ${discordToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email capture error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
