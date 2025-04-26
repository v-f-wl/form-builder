'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import ILight from '../icons/light-icon'
import IDark from '../icons/dark-icon'
import ISystem from '../icons/system-icon'
import { useTranslations } from "next-intl";

export const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === 'system' ? resolvedTheme : theme

  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle d-flex align-items-center"
        type="button"
        id="themeDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {currentTheme === 'light' && <ILight/>}
        {currentTheme === 'dark' && <IDark/>}
        {currentTheme === 'system' && <ISystem/>}
        {t('ui.theme')}
      </button>

      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="themeDropdown">
        <li>
          <button
            className={`dropdown-item d-flex gap-2 align-items-center ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
          >
            <ILight/>
            {t('ui.light')}
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item d-flex gap-2 align-items-center ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <IDark/>
            {t('ui.dark')}
          </button>
        </li>
        <li>
          <button
            className={`dropdown-item d-flex gap-2 align-items-center ${theme === 'system' ? 'active' : ''}`}
            onClick={() => setTheme('system')}
          >
            <ISystem/>
            {t('ui.system')}
          </button>
        </li>
      </ul>
    </div>
  )
}
