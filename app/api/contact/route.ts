import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>',
        to: 'carlosfreund@gmail.com',
        replyTo: email,
        subject: `New message from ${name}${company ? ` (${company})` : ''}`,
        text: `From: ${name} <${email}>${company ? `\nCompany: ${company}` : ''}\n\n${message}`,
      });
    } else {
      console.log('Contact form submission (no RESEND_API_KEY):', { name, email, company, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
