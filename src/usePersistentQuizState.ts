import { useState, useEffect } from 'react'

export interface QuizAnswers {
  urgency: number
  area: string
  canPay: boolean
}

export interface QuizState {
  email: string
  answers: QuizAnswers
}

export const STORAGE_KEY = 'quizState'

export const DEFAULT_STATE: QuizState = {
  email: '',
  answers: {
    urgency: 3,
    area: '',
    canPay: false,
  },
}

export default function usePersistentQuizState(): [QuizState, React.Dispatch<React.SetStateAction<QuizState>>] {
  const [state, setState] = useState<QuizState>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_STATE
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<QuizState>
        return {
          email: parsed.email ?? DEFAULT_STATE.email,
          answers: {
            urgency: parsed.answers?.urgency ?? DEFAULT_STATE.answers.urgency,
            area: parsed.answers?.area ?? DEFAULT_STATE.answers.area,
            canPay: parsed.answers?.canPay ?? DEFAULT_STATE.answers.canPay,
          },
        }
      }
    } catch {
      // ignore parse errors
    }
    return DEFAULT_STATE
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore write errors
    }
  }, [state])

  return [state, setState]
}
