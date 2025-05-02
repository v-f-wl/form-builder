'use client'

import { useFormBuilder } from "@/app/context/form-builder-context";
import Button from "../UI/button";
import Axios from "axios"
import { useAuth } from "@clerk/nextjs";
import { useLocale } from "@/app/context/locale-context";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import ErrorSubtitle from "../UI/error-subtitle";
const SubmitFormBtn = () => {
  const  { descriptionsForm, isSubmitting, setIsSubmitting, tags, formCategory, validateQuestions, validationErrors} = useFormBuilder()
  const t = useTranslations()
  const { userId } = useAuth()
  const locale = useLocale()
  const route = useRouter()

  const handeCreateForm = async() => {
    if(isSubmitting) return
    const validQuestions = validateQuestions()
    if(validQuestions.length == 0 || Object.keys(validationErrors).length > 0){
      toast.error(t('errors.genericFormInvalid'))
      return
    }
    try{
      setIsSubmitting(true)
      const result = await Axios.post(`/${locale}/api/forms/create-form`, {
          title: descriptionsForm.title,
          description: descriptionsForm.description,
          formCategory: formCategory,
          questions: validQuestions,
          userId: userId,
          hashtagsArray: Array.from(tags)
      })
      route.push(`/form/${result.data.formId}`)
    }catch(error){
      setIsSubmitting(false)
    }
  }
  return ( 
    <div className="text-center mt-4">
      <Button disabled={isSubmitting} label={t('ui.create')} style="primary" onClick={handeCreateForm}/>
      {validationErrors._form && <ErrorSubtitle errorLabel={validationErrors._form}/>}
    </div>
  )
}
 
export default SubmitFormBtn;