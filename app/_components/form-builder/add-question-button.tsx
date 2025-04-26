'use client'
import IAdd from "../icons/add-icon";
import { useFormBuilder } from "../../context/form-builder-context";
import { nanoid } from "@reduxjs/toolkit";
import { useTranslations } from "next-intl";

export const AddQuestionButton = () => {
  const { setQuestionsForm, isSubmitting } = useFormBuilder()
  const t = useTranslations()
  const addQuestion = () => {
    setQuestionsForm((prev) => [
      ...prev,
      {
        id: nanoid(),
        title: "",
        typeOfAnswer: "short_text",
        answersList: [{ id: nanoid(), value: "" }, { id: nanoid(), value: "" }],
        required: false,
      },
    ])
  }
  if(isSubmitting) return
  return (
    <div className="d-grid">
      <button className='btn d-flex aligh-items-center justify-content-center gap-2 btn-outline-primary' onClick={addQuestion}>
        <span>{t('formBuilder.addQuestions')}</span>
        <IAdd/>
      </button>
    </div>
  )
};
