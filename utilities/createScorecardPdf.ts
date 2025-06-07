import { PDFDocument, StandardFonts } from 'pdf-lib'
import type { Scorecard } from '../lib/computeScorecard'

export async function createScorecardPdf(scorecard: Scorecard): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  let page = pdfDoc.addPage()
  const { height } = page.getSize()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontSize = 12
  let y = height - 50

  page.drawText(`Scorecard for ${scorecard.ticker}`, {
    x: 50,
    y,
    size: 18,
    font,
  })

  y -= 30
  page.drawText(`Total Score: ${scorecard.total}/24`, { x: 50, y, size: fontSize, font })
  y -= 20

  for (const category of scorecard.categories) {
    page.drawText(`${category.name}: ${category.score}/3`, { x: 50, y, size: fontSize, font })
    y -= 16
    for (const factor of category.factors) {
      page.drawText(`- ${factor.label}: ${factor.score}/3`, { x: 70, y, size: fontSize - 2, font })
      y -= 14
      if (y < 60) {
        page = pdfDoc.addPage()
        y = height - 50
      }
    }
    y -= 10
  }

  if (scorecard.comments) {
    page.drawText(`Notes: ${scorecard.comments}`, { x: 50, y, size: fontSize, font })
  }

  return pdfDoc.save()
}
