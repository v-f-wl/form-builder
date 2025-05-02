'use client'

import { FormSubmission } from "@/types"
import Link from "next/link"

export function SubmissionDetails({ submission }: { submission: FormSubmission }) {
  return (
    <div>
      <h5>Ответ от: {submission.submittedBy}</h5>
      <Link href={`mailto:${submission.submittedEmail}`} className="d-inline-block mb-2 text-reset">
        Email: {submission.submittedEmail}
      </Link>

      <ul className="list-group mb-3">
        {submission.answers.map((a, idx) => (
          <li key={a.id} className="list-group-item">
            <div className="mb-1">
              <strong>{idx + 1}. {a.title}</strong>
              {a.required && <span className="badge bg-danger ms-2">Обязательный</span>}
            </div>
            <div className="p-2 rounded">
              {a.answer ? a.answer : <em className="text-muted">Без ответа</em>}
            </div>
          </li>
        ))}
      </ul>

      <div className="border-top pt-2 text-muted small">
        Всего вопросов: {submission.answers.length}, 
        Пропущено: {submission.answers.filter(a => !a.answer).length}
      </div>
    </div>
  )
}
