import { Resend } from 'resend'
import { NextResponse } from 'next/server'

// initialization of Resend API
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    // extract the form data
    const { name, email, message } = await request.json()

    // verification of the data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Send email with the HTML template
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['osaveaux@gmail.com'],
      subject: `New message from ${name}`,
      // HTML email template
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f9fafb;">
          <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="margin: 0 0 25px 0; color: #1f2937; font-size: 24px; font-weight: 600;">New message from contact form</h2>
            
            <!-- Name -->
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e5e7eb;">
              <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Name</p>
              <p style="margin: 0; color: #111827; font-size: 16px;">${name}</p>
            </div>
            
            <!-- Email -->
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e5e7eb;">
              <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Email</p>
              <p style="margin: 0;">
                <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-size: 16px;">${email}</a>
              </p>
            </div>
            
            <!-- Message (replace /n with <br>) -->
            <div>
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Message</p>
              <div style="color: #374151; font-size: 16px; line-height: 1.6; white-space: pre-wrap; background-color: #f9fafb; padding: 15px; border-radius: 6px;">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      `,
    })

    // errors
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Return success response
    return NextResponse.json({ success: true, data })
  } catch (error) {
    // errors
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Error sending message' },
      { status: 500 }
    )
  }
}