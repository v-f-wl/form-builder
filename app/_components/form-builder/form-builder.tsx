'use client'
import { FormBuilderContext } from "../../context/form-builder-context";
import { useFormData } from "@/hooks/form/useFormData";
import { useQuestionLogic } from "@/hooks/form/useQuestionLogic";
import Loading from "../loading";
import { ReactNode, useState } from "react";
import { QuestionFormType } from "@/types";

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
    setFormCategory
  } = useFormData(formId);

  const {
    updateAnswer,
    deleteAnswer,
    addAnswer,
    updateQuestion,
    deleteQuestion,
  } = useQuestionLogic(questionsForm, setQuestionsForm);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const isEditMode = Boolean(formId);
  if (!isLoaded) return <Loading />;

  const validateQuestions = (): QuestionFormType[] => {
    const validQuestions: QuestionFormType[] = []
    const currentErrors: Record<string, string> = {}

    if (!descriptionsForm.title.trim()) {
      currentErrors["_title"] = "Название формы обязательно";
    }
  
    if (!descriptionsForm.description.trim()) {
      currentErrors["_description"] = "Описание формы обязательно";
    }
    
    const hasRequired = questionsForm.some((q) => q.required)
    if (!hasRequired) {
      currentErrors["_form"] = "В форме должен быть хотя бы один обязательный вопрос"
    }

    questionsForm.forEach((q) => {
      const title = q.title?.trim()
      const filteredAnswers = q.answersList?.filter((a) => a.value.trim() !== "") || []

      if (!title) {
        if (q.required) {
          currentErrors[q.id] = "У обязательного вопроса должен быть заголовок";
        }
        return
      }

      if (q.typeOfAnswer === "select_one" && filteredAnswers.length < 2) {
        currentErrors[q.id] = "Минимум 2 варианта ответа"
        return
      }

      validQuestions.push({
        ...q,
        title: title || "",
        answersList: filteredAnswers,
      })
    })
    console.log(currentErrors)
    setValidationErrors(currentErrors)
    return validQuestions
  }

  return (
    <FormBuilderContext.Provider
      value={{
        formImage,
        setFormImage,
        updateAnswer,
        deleteAnswer,
        addAnswer,
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
      }}
    >
      <div className="my-4 w-full">{children}</div>
    </FormBuilderContext.Provider>
  );
};

export default FormBuilder;
