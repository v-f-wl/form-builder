import { useFormBuilder } from "@/app/context/form-builder-context";
import { useLocale, useTranslations } from "next-intl";
import Button from "../UI/button";
import ErrorSubtitle from "../UI/error-subtitle";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const EditFormBtn = () => {
  const { isSubmitting, validateQuestions, formId, descriptionsForm, setIsSubmitting, validationErrors} = useFormBuilder()
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
          await axios.patch(`/${locale}/api/forms/edit-form`, {
            title: descriptionsForm.title,
            description: descriptionsForm.description,
            questions: validQuestions,
            userId: userId,
            formId:formId
          })
          toast.success('Edited')
          setIsSubmitting(false)
        }catch(error){
          toast.error('Server error')
          setIsSubmitting(false)
        }
      }
    }
  return ( 
      <div className="text-center mt-4">
      <Button disabled={isSubmitting} label={t('ui.edit')} style="primary" onClick={handleCreateForm}/>
      {validationErrors._form && <ErrorSubtitle errorLabel={validationErrors._form}/>}
    </div>
  );
}
 
export default EditFormBtn;