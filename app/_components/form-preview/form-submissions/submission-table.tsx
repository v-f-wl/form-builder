'use client'

import { FormSubmission, QuestionTemplate } from "@/types"
import { format } from 'date-fns'

export function SubmissionTable({
  submissions,
  questionTemplates,
}: {
  submissions: FormSubmission[] | undefined;
  questionTemplates: QuestionTemplate[] | undefined;
}) {
  if (!submissions) return <div>Загрузка...</div>;

  return (
    <div className="table-responsive" style={{ overflowX: "auto", maxHeight: "70vh" }}>
      <table className="table table-bordered table-hover align-middle" style={{ minWidth: "1000px" }}>
        <thead className="table-light sticky-top" style={{ top: 0 }}>
          <tr>
            <th style={{ minWidth: 150, background: "white", position: "sticky", left: 0, zIndex: 2 }}>Имя</th>
            <th style={{ minWidth: 100, background: "white", position: "sticky", left: 150, zIndex: 2 }}>Дата</th>
            {questionTemplates?.map((q, idx) => (
              <th key={idx} style={{ minWidth: 200 }}>{q.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub.id}>
              <td style={{ background: "#fff", color:'#000', position: "sticky", left: 0, zIndex: 1 }}>{sub.submittedBy}</td>
              <td style={{ background: "#fff", color:'#000', position: "sticky", left: 150, zIndex: 1 }}>{format(new Date(sub.submittedAt), 'dd.MM.yyyy')}</td>
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
  )
}
