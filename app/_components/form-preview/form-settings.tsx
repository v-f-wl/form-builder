'use client'
import { AddQuestionButton } from "@/app/_components/form-builder/add-question-button";
import FormBuilder from "@/app/_components/form-builder/form-builder";
import { Descriptions } from "@/app/_components/form-builder/form-description";
import { QuestionsList } from "@/app/_components/form-builder/questions-list";
import Title from "@/app/_components/UI/title";
import { useTranslations } from "next-intl";
import EditFormBtn from "../form-builder/edit-form-btn";
import Button from "../UI/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocale } from "@/app/context/locale-context";
import { useRouter } from "next/navigation";

interface FormSettingsType{
  formId: string
}
const FormSettings = ({formId}: FormSettingsType) => {
  const t = useTranslations()
  const locale = useLocale()
  const route = useRouter()
  const handleDeletedeleteForm = async() => {
    try {
      const ids = Array.from(formId);
      await axios.delete(`/${locale}/api/forms/user-forms`, {
        data: { ids },
      });
      route.push('')
    } catch (error) {
      toast.error('Form was not deleted, please try again')
    } finally{
    }
  }
  return ( 
    <div className="mt-4">
      <Title label={t('formPreview.formSettings')}/>
      <div className="row mt-3">
          <div className="col-12 col-md-6">
          <FormBuilder formId={formId}>
            <Descriptions />
            <QuestionsList />
            <EditFormBtn/>
          </FormBuilder>
        </div>
        <div className="col-12 col-md-6 mb-3">
          {/* <Button onClick={handleDeletedeleteForm} style="red" label={t('ui.delete')}/> */}
        </div>
      </div>
    </div>
   );
}
 
export default FormSettings;