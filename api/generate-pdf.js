import { PDFDocument, StandardFonts } from 'pdf-lib';
import { Resend } from 'resend';

/**
 * Serverless function to create a simple 1-page PDF report from survey answers.
 * Expects JSON body: { email?: string, answers: [{ question, answer, riskLevel }] }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { email, answers = [] } = req.body || {};

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = height - 50;
    page.drawText('Execution Risk Snapshot', { x: 50, y, size: 20, font });
    y -= 40;

    page.drawText('Question', { x: 50, y, size: 12, font });
    page.drawText('Answer', { x: width / 2 - 50, y, size: 12, font });
    page.drawText('Risk Level', { x: width - 150, y, size: 12, font });
    y -= 20;

    const levelScore = { low: 1, medium: 2, high: 3 };
    let score = 0;

    for (const { question, answer, riskLevel } of answers) {
      score += levelScore[riskLevel?.toLowerCase()] || 0;
      page.drawText(String(question), { x: 50, y, size: 10, font });
      page.drawText(String(answer), { x: width / 2 - 50, y, size: 10, font });
      page.drawText(String(riskLevel), { x: width - 150, y, size: 10, font });
      y -= 15;
    }

    y -= 20;
    page.drawText(`Summary Score: ${score}`, { x: 50, y, size: 12, font });

    const pdfBytes = await pdfDoc.save();

    // Optionally send the PDF via email using Resend
    if (email) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'noreply@example.com',
        to: email,
        subject: 'Execution Risk Snapshot',
        attachments: [
          { filename: 'snapshot.pdf', content: pdfBytes }
        ]
      });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="snapshot.pdf"');
    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
