'use client'

import { useLocale } from "@/app/context/locale-context"
import { FormSubmission, QuestionTemplate } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { ViewModeToggle } from "./form-submissions/view-mode-toggle"
import { SubmissionList } from "./form-submissions/submission-list"
import { SubmissionDetails } from "./form-submissions/submission-details"
import { SubmissionTable } from "./form-submissions/submission-table"
import { useTranslations } from "next-intl"

type ViewMode = 'split' | 'table'

export default function FormSubmissionsViewer({ formId }: { formId: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [submissions, setSubmissions] = useState<FormSubmission[]>()
  const [questionTemplates, setQuestionTemplates] = useState<QuestionTemplate[]>()
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const locale = useLocale()
  const t = useTranslations()

  useEffect(() => {
    const fetchFormAnswers = async () => {
      const response = await axios.get(`/${locale}/api/forms/get-form-answers?formId=${formId}`)
      setSubmissions(response.data.submissions);
      setQuestionTemplates(response.data.questionTemplates);
    }
    fetchFormAnswers()
  }, [formId])

  const selectedSubmission = submissions?.find((sub) => sub.id.toString() === selectedId)

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>{t('ui.answers')}</h4>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {viewMode === 'split' ? (
        <div className="row">
          <div className="col-md-4 border-end">
            <h5 className="mb-3">{t('ui.submittedForms')}</h5>
            <SubmissionList submissions={submissions} selectedId={selectedId} setSelectedId={setSelectedId} />
          </div>

          <div className="col-md-8">
            {selectedSubmission ? (
              <SubmissionDetails submission={selectedSubmission} />
            ) : (
              <div className="text-muted">{t('ui.selectSubmission')}</div>
            )}
          </div>
        </div>
      ) : (
        <SubmissionTable submissions={submissions} questionTemplates={questionTemplates} />
      )}
    </div>
  )
}
