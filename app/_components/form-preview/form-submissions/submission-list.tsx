'use client'

import { FormSubmission } from "@/types"
import { format } from 'date-fns'
import { useTranslations } from "next-intl";

export function SubmissionList({
  submissions,
  selectedId,
  setSelectedId,
}: {
  submissions: FormSubmission[] | undefined;
  selectedId: string | null;
  setSelectedId: (id: string) => void;
}) {
  const t = useTranslations()
  if (!submissions) return <div>{t('ui.loading')}...</div>;

  if(submissions.length === 0){
    return(
      <div className="">{t('ui.noSubmissionsYet')}</div>
    )
  }
  return (
    <ul className="list-group">
      {submissions.map((sub) => (
        <li 
          key={sub.id}
          className={`list-group-item list-group-item-action ${selectedId === sub.id.toString() ? 'active' : ''}`}
          onClick={() => setSelectedId(sub.id.toString())}
          role="button"
        >
          <div className="d-flex justify-content-between">
            <span>{sub.submittedBy}</span>
            <small>{format(new Date(sub.submittedAt), 'dd.MM.yyyy')}</small>
          </div>
        </li>
      ))}
    </ul>
  )
}
