'use client'
import { useTranslations } from "next-intl";

type ViewMode = 'split' | 'table'

export function ViewModeToggle({
  viewMode,
  setViewMode,
}: {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}) {
  const t = useTranslations()
  return (
    <div className="btn-group" role="group">
      <input 
        type="radio" 
        className="btn-check" 
        name="viewMode" 
        id="view-split" 
        autoComplete="off"
        checked={viewMode === 'split'}
        onChange={() => setViewMode('split')}
      />
      <label className="btn btn-outline-primary" htmlFor="view-split">{t('ui.singleView')}</label>

      <input 
        type="radio" 
        className="btn-check" 
        name="viewMode" 
        id="view-table" 
        autoComplete="off"
        checked={viewMode === 'table'}
        onChange={() => setViewMode('table')}
      />
      <label className="btn btn-outline-primary" htmlFor="view-table">{t('ui.summaryTable')}</label>
    </div>
  )
}
