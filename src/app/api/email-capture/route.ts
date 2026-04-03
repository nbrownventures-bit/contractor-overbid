import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, jobType, location, verdict } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Notify via Discord
    const discordToken = process.env.DISCORD_BOT_TOKEN
    const channelId = '1489649727703093449'

    if (discordToken) {
      const message = `📧 **New Email Capture!**\n**Email:** ${email}\n**Job:** ${jobType || 'Unknown'}\n**Location:** ${location || 'Unknown'}\n**Verdict:** ${verdict || 'Unknown'}`
      
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
    return NextResponse.json({ error: 'Failed to save email' }, { status: 500 })
  }
}
