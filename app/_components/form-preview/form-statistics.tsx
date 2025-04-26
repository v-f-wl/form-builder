"use client"

import { useState } from "react"
const questionTemplates = Array.from({ length: 20 }, (_, i) => ({
  id: `q${i + 1}`,
  title: `Вопрос ${i + 1}`,
  required: i % 3 === 0,
}))

const mockSubmissions = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  submittedBy: `Пользователь ${i + 1}`,
  submittedAt: `2025-04-${10 + i}`,
  answers: questionTemplates.map(q => ({
    ...q,
    answer: Math.random() > 0.2 ? `Ответ на ${q.title}` : "",
  }))
}))


type ViewMode = 'split' | 'table'

export default function FormSubmissionsViewer() {
  const [selectedId, setSelectedId] = useState<string | null>(mockSubmissions[0]?.id || null)
  const [viewMode, setViewMode] = useState<ViewMode>('split')

  const selectedSubmission = mockSubmissions.find(sub => sub.id === selectedId)

  return (
    <div className="container-fluid my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Ответы</h4>
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
      </div>

      {viewMode === 'split' ? (
        <div className="row">
          <div className="col-md-4 border-end">
            <h5 className="mb-3">Заполненные формы</h5>
            <ul className="list-group">
              {mockSubmissions.map((sub) => (
                <li 
                  key={sub.id} 
                  className={`list-group-item list-group-item-action ${selectedId === sub.id ? 'active' : ''}`}
                  onClick={() => setSelectedId(sub.id)}
                  role="button"
                >
                  <div className="d-flex justify-content-between">
                    <span>{sub.submittedBy}</span>
                    <small>{sub.submittedAt}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-8">
            {selectedSubmission ? (
              <div>
                <h5 className="mb-3">Ответ от: {selectedSubmission.submittedBy}</h5>
                <ul className="list-group mb-3">
                  {selectedSubmission.answers.map((a, idx) => (
                    <li key={a.id} className="list-group-item">
                      <div className="mb-1">
                        <strong>{idx + 1}. {a.title}</strong>
                        {a.required && <span className="badge bg-danger ms-2">Обязательный</span>}
                      </div>
                      <div className="bg-light p-2 rounded">
                        {a.answer ? a.answer : <em className="text-muted">Без ответа</em>}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-top pt-2 text-muted small">
                  Всего вопросов: {selectedSubmission.answers.length}, 
                  Пропущено: {selectedSubmission.answers.filter(a => !a.answer).length}
                </div>
              </div>
            ) : (
              <div className="text-muted">Выберите отправку слева</div>
            )}
          </div>
        </div>
      ) : (
        <div className="table-responsive" style={{ overflowX: "auto", maxHeight: "70vh" }}>
  <table className="table table-bordered table-hover align-middle" style={{ minWidth: "1000px" }}>
    <thead className="table-light sticky-top" style={{ top: 0 }}>
      <tr>
        <th style={{ minWidth: 150, background: "white", position: "sticky", left: 0, zIndex: 2 }}>Имя</th>
        <th style={{ minWidth: 100, background: "white", position: "sticky", left: 150, zIndex: 2 }}>Дата</th>
        {questionTemplates.map((q, idx) => (
          <th key={idx} style={{ minWidth: 200 }}>{q.title}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {mockSubmissions.map((sub) => (
        <tr key={sub.id}>
          <td style={{ background: "#fff", position: "sticky", left: 0, zIndex: 1 }}>{sub.submittedBy}</td>
          <td style={{ background: "#fff", position: "sticky", left: 150, zIndex: 1 }}>{sub.submittedAt}</td>
          {sub.answers.map((a) => (
            <td key={a.id}>
              {a.answer ? a.answer : <em className="text-muted">—</em>}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
      )}
    </div>
  )
}
