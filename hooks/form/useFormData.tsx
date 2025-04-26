import { useEffect, useState } from "react";
import { QuestionFormType } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { useLocale } from "@/app/context/locale-context";

export const useFormData = (formId?: string) => {
  const [descriptionsForm, setDesctiprionForm] = useState({ title: "", description: "" })
  const [questionsForm, setQuestionsForm] = useState<QuestionFormType[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [formCategory, setFormCategory] = useState('uncategorized')
  const [formImage, setFormImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const locale = useLocale()

  useEffect(() => {
    
    const getFormData = async () => {
      const data = await axios.get(`/${locale}/api/forms/form-settings?formId=${formId}`)
      setDesctiprionForm({
        title: data.data.form.title,
        description: data.data.form.description,
      })
      setQuestionsForm(data.data.questions)
    }

    if (formId) getFormData()
    else {
      setQuestionsForm([{
        id: nanoid(),
        title: "",
        typeOfAnswer: "short_text",
        answersList: [{ id: nanoid(), value: "" }, { id: nanoid(), value: "" }],
        required: false,
      }])
    }
  }, [formId])

  useEffect(() => {
    if (questionsForm.length > 0) setIsLoaded(true)
  }, [questionsForm])

  return {
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
  }
}