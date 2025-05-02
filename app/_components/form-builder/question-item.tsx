'use client'
import Button from "@/app/_components/UI/button";
import Input from "@/app/_components/UI/input";
import Subtitle from "@/app/_components/UI/subtitle";
import { useEffect, useMemo, useRef, useState } from "react";
import { CheckboxAnswer, InputPlaceholder } from "./type-of-answer";
import Select from "../UI/select";
import { QuestionType } from "@/types";
import { useFormBuilder } from "../../context/form-builder-context";
import { TYPE_OF_ANSWER_OPTIONS } from "@/lib/constants";
import { useTranslations } from "next-intl";

interface QuestionItemProps{
  order: number;
  id: string;
  title: string;
  typeOfAnswer: QuestionType,
  required: boolean,
}


const QuestionItem = ({
  order,
  id,
  title,
  typeOfAnswer,
  required,
}:QuestionItemProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { updateQuestion, deleteQuestion, isSubmitting, validationErrors } = useFormBuilder()
  const t = useTranslations()

  const TypeOfAnswerRander = useMemo(() => {
    switch (typeOfAnswer) {
      case "short_text":
        return <InputPlaceholder label={t('formBuilder.shortAnswer')}/>
      case "paragraph":
        return <InputPlaceholder label={t('formBuilder.paragraph')}/>
      case "select_one":
        return <CheckboxAnswer id={id}/>
      default:
        return <div className="text-red-500">Unknown question type:</div>;
    }
  },[typeOfAnswer])

  return (  
    <div
      ref={wrapperRef}
      className={`
        card shadow-sm p-4 mb-4
        ${validationErrors[id] ? 'border border-danger' : 'border border-light'}
      `}
    >
      <Subtitle label={`Question ${order}`} />

      <div className="mb-3">
        <Input 
          disabled={isSubmitting}
          id={`form_question_title_${id}`}
          label={t('formBuilder.inputQuestionPlaceholder')}
          name="title"
          onChange={(_, value) => updateQuestion(id, { title: value })}
          value={title}
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-muted">{t('formBuilder.answerType')}</label>
        <Select 
          disabled={isSubmitting}
          selectedValue={TYPE_OF_ANSWER_OPTIONS.find(type => type.value === typeOfAnswer)}
          options={TYPE_OF_ANSWER_OPTIONS}
          onChange={(val) => updateQuestion(id, { typeOfAnswer: val as QuestionType })}
        />
      </div>

      <div className="mb-2">
        {TypeOfAnswerRander}
      </div>

      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center border-top pt-3 gap-3">
        <div className="form-check form-switch">
          <input 
            disabled={isSubmitting}
            className="form-check-input" 
            type="checkbox" 
            role="switch" 
            checked={required}
            id={`form_question_switch_${id}`}
            onChange={(e) => updateQuestion(id, { required: e.target.checked })}
          />
          <label className="form-check-label" htmlFor={`form_question_switch_${id}`}>
            {t('formBuilder.required')}
          </label>
        </div>

        <div>
          <Button
            disabled={isSubmitting}
            onClick={() => deleteQuestion(id)}
            label={t('ui.delete')}
            style="red"
          />
        </div>
      </div>

      {validationErrors[id] && (
        <div className="text-danger mt-2 small">
          {validationErrors[id]}
        </div>
      )}
    </div>
  )
}
 
export default QuestionItem;