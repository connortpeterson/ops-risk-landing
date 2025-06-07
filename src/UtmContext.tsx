import { createContext, useContext, useEffect, useState } from 'react'
import posthog from 'posthog-js'

export type UtmData = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

const UtmContext = createContext<UtmData>({})

export const UtmProvider = ({ children }: { children: React.ReactNode }) => {
  const [utms, setUtms] = useState<UtmData>({})

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const stored = localStorage.getItem('utmParams')
    const data: UtmData = stored ? JSON.parse(stored) : {}

    const keys: (keyof UtmData)[] = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
    ]
    keys.forEach((k) => {
      const v = params.get(k)
      if (v) data[k] = v
    })
    setUtms(data)
    localStorage.setItem('utmParams', JSON.stringify(data))

    posthog.init('YOUR_POSTHOG_KEY', {
      api_host: 'https://app.posthog.com',
    })
  }, [])

  return <UtmContext.Provider value={utms}>{children}</UtmContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUtm = () => useContext(UtmContext)
