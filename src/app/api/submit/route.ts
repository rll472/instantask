import { createClient } from '@supabase/supabase-js';
import sgMail, { MailDataRequired, ClientResponse } from '@sendgrid/mail';
import { NextResponse } from 'next/server';

const sendGridApiKey = process.env.SENDGRID_API_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (sendGridApiKey && sendGridApiKey.startsWith('SG.')) {
  sgMail.setApiKey(sendGridApiKey);
} else {
  console.error('SENDGRID_API_KEY is missing or invalid');
}

const supabase = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })
  : null;

let isProcessing = false;

interface SendGridError {
  response?: {
    body: {
      errors?: { message: string; field?: string; help?: string }[];
    };
  };
}

function isSendGridError(error: unknown): error is SendGridError {
  return typeof error === 'object' && error !== null && 'response' in error && typeof (error as SendGridError).response?.body === 'object';
}

async function sendEmailWithRetry(options: MailDataRequired, retries = 2): Promise<void> {
  if (!sendGridApiKey || !sendGridApiKey.startsWith('SG.')) {
    throw new Error('SendGrid API key is not configured');
  }
  for (let i = 0; i <= retries; i++) {
    try {
      const [response]: [ClientResponse, unknown] = await sgMail.send(options);
      console.log('SendGrid response:', JSON.stringify(response, null, 2));
      return;
    } catch (error: unknown) {
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
    if (!supabase) {
      console.error('Supabase client is not configured');
      return NextResponse.json({ error: 'Supabase client is not configured' }, { status: 500 });
    }
    const { error: dbError } = await supabase
      .from('prospects')
      .insert([{ name, email, phone }]);

    if (dbError) {
      console.error('Supabase insert error:', JSON.stringify(dbError, null, 2));
      return NextResponse.json({ error: 'Failed to save prospect data', details: dbError.message }, { status: 500 });
    }
    console.log('Prospect saved to Supabase:', { name, email, phone });

    let autoresponderError: string | null = null;
    let notificationError: string | null = null;

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
    } catch (error: unknown) {
      const errorMessage = isSendGridError(error)
        ? JSON.stringify(error.response?.body, null, 2)
        : error instanceof Error
        ? error.message
        : String(error);
      autoresponderError = errorMessage;
      console.error('Failed to send autoresponder:', errorMessage);
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
    } catch (error: unknown) {
      const errorMessage = isSendGridError(error)
        ? JSON.stringify(error.response?.body, null, 2)
        : error instanceof Error
        ? error.message
        : String(error);
      notificationError = errorMessage;
      console.error('Failed to send notification:', errorMessage);
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