'use client'
import { FormBuilderContext } from "../../context/form-builder-context";
import { useFormData } from "@/hooks/form/useFormData";
import { useQuestionLogic } from "@/hooks/form/useQuestionLogic";
import Loading from "../loading";
import { ReactNode, useState } from "react";
import { QuestionFormType, ValidateQuestionsResult } from "@/types";
import { useTranslations } from "next-intl";
import axios from "axios";
import { useLocale } from "@/app/context/locale-context";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FormBuilder = ({ children, formId }: { children: ReactNode, formId: string | undefined }) => {
  const {
    descriptionsForm,
    setDesctiprionForm,
    questionsForm,
    setQuestionsForm,
    formImage,
    setFormImage,
    isLoaded,
    isSubmitting, 
    setIsSubmitting,
    formCategory, 
    setFormCategory,
    tags, 
    setTags
  } = useFormData(formId);

  const {
    updateAnswer,
    deleteAnswer,
    addAnswer,
    updateQuestion,
    deleteQuestion,
  } = useQuestionLogic(questionsForm, setQuestionsForm);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const t= useTranslations()
  const isEditMode = Boolean(formId)
  if (!isLoaded) return <Loading />

  const validateQuestions = (): ValidateQuestionsResult => {
    const validQuestions: QuestionFormType[] = []
    const currentErrors: Record<string, string> = {}
    if (!descriptionsForm.title.trim()) {
      currentErrors["_title"] = t('errors.titleRequired')
    }
  
    if (!descriptionsForm.description.trim()) {
      currentErrors["_description"] = t('errors.descriptionRequired')
    }
    
    const hasRequired = questionsForm.some((q) => q.required)
    if (!hasRequired) {
      currentErrors["_form"] = t('errors.atLeastOneRequiredQuestion')
    }

    questionsForm.forEach((q) => {
      const title = q.title?.trim()
      const filteredAnswers = q.answersList?.filter((a) => a.value.trim() !== "") || []

      if (!title) {
        if (q.required) {
          currentErrors[q.id] = t('errors.requiredQuestionTitleMissing')
        }
        return
      }

      if (q.typeOfAnswer === "select_one" && filteredAnswers.length < 2) {
        currentErrors[q.id] = t('errors.minTwoOptions')
        return
      }

      validQuestions.push({
        ...q,
        title: title || "",
        answersList: filteredAnswers,
      })
    })
    setValidationErrors(currentErrors)
    return {currentErrors, validQuestions}
  }

  return (
    <FormBuilderContext.Provider
      value={{
        formImage,
        setFormImage,
        updateAnswer,
        deleteAnswer,
        addAnswer,
        tags, 
        setTags,
        updateQuestion,
        deleteQuestion,
        descriptionsForm,
        setDesctiprionForm,
        questionsForm,
        setQuestionsForm,
        isEditMode,
        isSubmitting, 
        setIsSubmitting,
        formCategory, 
        setFormCategory,
        validationErrors,
        setValidationErrors,
        validateQuestions,
        formId
      }}
    >
      <div className="my-4 w-full">{children}</div>
    </FormBuilderContext.Provider>
  );
};

export default FormBuilder;
