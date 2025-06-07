import React from 'react'

export type QA = {
  question: string
  answer: string
}

interface SnapshotPreviewProps {
  answers: QA[]
}

const getSeverity = (answer: string): 'Low' | 'Medium' | 'High' => {
  const a = answer.toLowerCase()
  if (a.includes('yes')) return 'Low'
  if (a.includes('no')) return 'High'
  return 'Medium'
}

const getComment = (severity: 'Low' | 'Medium' | 'High'): string => {
  switch (severity) {
    case 'Low':
      return 'Minimal risk identified.'
    case 'Medium':
      return 'Some risk factors detected.'
    case 'High':
      return 'Significant risk; immediate attention needed.'
  }
}

const severityColor: Record<'Low' | 'Medium' | 'High', string> = {
  Low: 'text-green-600',
  Medium: 'text-blue-600',
  High: 'text-gray-700',
}

export default function SnapshotPreview({ answers }: SnapshotPreviewProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6">
      {answers.map(({ question, answer }, idx) => {
        const severity = getSeverity(answer)
        const comment = getComment(severity)
        return (
          <div
            key={idx}
            className="border-b border-gray-200 pb-4 last:pb-0 last:border-b-0"
          >
            <p className="text-gray-900 font-medium">{question}</p>
            <p className="text-gray-700">Answer: {answer}</p>
            <p className={`font-semibold ${severityColor[severity]}`}>Severity: {severity}</p>
            <p className="text-gray-600 text-sm">{comment}</p>
          </div>
        )
      })}
      <p className="pt-4 text-lg font-medium text-blue-700">
        Your execution risk level: Moderate
      </p>
    </div>
  )
}
