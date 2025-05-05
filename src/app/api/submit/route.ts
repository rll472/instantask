import { createClient } from '@supabase/supabase-js';
import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
);
let isProcessing = false;

async function sendEmailWithRetry(options: any, retries = 2): Promise<void> {
  for (let i = 0; i <= retries; i++) {
    try {
      const [response] = await sgMail.send(options);
      console.log('SendGrid response:', JSON.stringify(response, null, 2));
      return;
    } catch (error: any) {
      if (i === retries) {
        throw error;
      }
      console.log(`Retrying email send (${i + 1}/${retries})...`);
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s before retry
    }
  }
}

export async function POST(request: Request) {
  if (isProcessing) {
    console.log('Submission blocked: Previous request still processing');
    return NextResponse.json({ error: 'Please wait before submitting again' }, { status: 429 });
  }

  isProcessing = true;
  console.log('POST /api/submit received');
  try {
    const { name, email, phone } = await request.json();
    console.log('Form data:', { name, email, phone });

    // Validate input
    if (!name || !email || !phone) {
      console.log('Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert into Supabase
    const { error: dbError } = await supabase
      .from('prospects')
      .insert([{ name, email, phone }]);

    if (dbError) {
      console.error('Supabase insert error:', JSON.stringify(dbError, null, 2));
      return NextResponse.json({ error: 'Failed to save prospect data', details: dbError.message }, { status: 500 });
    }
    console.log('Prospect saved to Supabase:', { name, email, phone });

    let autoresponderError = null;
    let notificationError = null;

    // Send autoresponder
    try {
      await sendEmailWithRetry({
        from: 'russ@instantask.co',
        to: email,
        subject: 'Thank You for Reaching Out to Instantask!',
        text: `
          Hello ${name},

          Thank you for contacting Instantask! We're excited to learn about your project and how we can help streamline your business with custom digital tools.

          Our tasks start at $499, covering a single function or calculation, like a pricing calculator or cost estimator. Learn more at https://instantask.co/pricing.

          We'll reach out soon to discuss your needs, or reply to this email or call us at (123) 456-7890 to share your project details.

          Best regards,
          The Instantask Team
        `,
        html: `
          <h2>Hello ${name},</h2>
          <p>Thank you for contacting Instantask! We're excited to learn about your project and how we can help streamline your business with custom digital tools.</p>
          <p>Our tasks start at $499, covering a single function or calculation, like a pricing calculator or cost estimator. Learn more on our <a href="https://instantask.co/pricing" style="color: #2563eb;">pricing page</a>.</p>
          <p>We'll reach out soon to discuss your needs, or reply to this email or call us at (123) 456-7890 to share your project details.</p>
          <p>Best regards,<br>The Instantask Team</p>
        `,
      });
      console.log('Autoresponder sent to:', email);
    } catch (error: any) {
      autoresponderError = error.response ? JSON.stringify(error.response.body, null, 2) : String(error);
      console.error('Failed to send autoresponder:', autoresponderError);
    }

    // Send notification
    try {
      await sendEmailWithRetry({
        from: 'russ@instantask.co',
        to: 'russ@instantask.co',
        subject: 'New Contact Form Submission',
        text: `
          New Prospect Submission

          Name: ${name}
          Email: ${email}
          Phone: ${phone}

          Please follow up with this prospect to discuss their project.
        `,
        html: `
          <h2>New Prospect Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p>Please follow up with this prospect to discuss their project.</p>
        `,
      });
      console.log('Notification sent to: russ@instantask.co');
    } catch (error: any) {
      notificationError = error.response ? JSON.stringify(error.response.body, null, 2) : String(error);
      console.error('Failed to send notification:', notificationError);
    }

    // Return error if any email failed
    if (autoresponderError || notificationError) {
      return NextResponse.json({
        message: 'Prospect saved, but some emails failed',
        errors: {
          autoresponder: autoresponderError || 'Sent',
          notification: notificationError || 'Sent',
        },
      }, { status: 500 });
    }

    return NextResponse.json({ message: 'Prospect saved and emails sent successfully' });
  } catch (error) {
    console.error('Error in /api/submit:', error);
    return NextResponse.json({ error: 'Failed to process request', details: String(error) }, { status: 500 });
  } finally {
    isProcessing = false;
  }
}