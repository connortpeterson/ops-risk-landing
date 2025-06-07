import { Resend } from 'resend';

const { RESEND_API_KEY, RESEND_FROM } = process.env;

if (!RESEND_API_KEY || !RESEND_FROM) {
  throw new Error('Missing Resend environment variables');
}

const resend = new Resend(RESEND_API_KEY);

export async function sendThankYouEmail(to: string): Promise<void> {
  await resend.emails.send({
    from: RESEND_FROM,
    to,
    subject: 'Thank you for your submission',
    html: '<p>We appreciate your feedback.</p>',
  });
}
