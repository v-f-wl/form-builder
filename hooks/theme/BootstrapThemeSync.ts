'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export const BootstrapThemeSync = () => {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-bs-theme', resolvedTheme || 'light')
    }
  }, [resolvedTheme])

  return null
}
