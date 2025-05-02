'use client'

type ViewMode = 'split' | 'table'

export function ViewModeToggle({
  viewMode,
  setViewMode,
}: {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}) {
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
      <label className="btn btn-outline-primary" htmlFor="view-split">Просмотр по одному</label>

      <input 
        type="radio" 
        className="btn-check" 
        name="viewMode" 
        id="view-table" 
        autoComplete="off"
        checked={viewMode === 'table'}
        onChange={() => setViewMode('table')}
      />
      <label className="btn btn-outline-primary" htmlFor="view-table">Сводная таблица</label>
    </div>
  )
}
