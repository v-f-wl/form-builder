'use client'

import { useFormBuilder } from "@/app/context/form-builder-context";
import Button from "../UI/button";
import { useTranslations } from "next-intl";
import ErrorSubtitle from "../UI/error-subtitle";
import axios from "axios";
import { useLocale } from "@/app/context/locale-context";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const SubmitFormBtn = () => {
  const { isSubmitting, validateQuestions, tags, formCategory, descriptionsForm, setIsSubmitting, validationErrors} = useFormBuilder()
  const t = useTranslations()
  const locale = useLocale()
  const { userId } = useAuth()
  const route = useRouter()

  const handleCreateForm = async() => {
    if(isSubmitting) return
    const {currentErrors, validQuestions} = validateQuestions()
    if (Object.keys(currentErrors).length === 0 && validQuestions.length > 0) {
      setIsSubmitting(true)
      try{
        const result = await axios.post(`/${locale}/api/forms/create-form`, {
          title: descriptionsForm.title,
          description: descriptionsForm.description,
          formCategory: formCategory,
          questions: validQuestions,
          userId: userId,
          hashtagsArray: Array.from(tags)
        })
        route.push(`/form/${result.data.formId}`)
      }catch(error){
        toast.error('Server error')
        setIsSubmitting(false)
      }
    }
  }
  return ( 
    <div className="text-center mt-4">
      <Button disabled={isSubmitting} label={t('ui.create')} style="primary" onClick={handleCreateForm}/>
      {validationErrors._form && <ErrorSubtitle errorLabel={validationErrors._form}/>}
    </div>
  )
}
 
export default SubmitFormBtn;