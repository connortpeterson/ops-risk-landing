import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../utilities/supabaseClient';
import { sendThankYouEmail } from '../../utilities/email';

interface SubmissionBody {
  email: string;
  answers: unknown[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body: SubmissionBody;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    res.status(400).json({ error: 'Invalid JSON' });
    return;
  }

  const { email, answers } = body;

  if (typeof email !== 'string' || !Array.isArray(answers)) {
    res.status(400).json({ error: 'Invalid payload' });
    return;
  }

  try {
    const { error } = await supabase
      .from('execution_leads')
      .insert({ email, answers });

    if (error) throw error;

    await sendThankYouEmail(email);
    res.status(200).json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
}
