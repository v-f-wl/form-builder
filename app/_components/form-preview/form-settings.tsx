'use client'
import { AddQuestionButton } from "@/app/_components/form-builder/add-question-button";
import FormBuilder from "@/app/_components/form-builder/form-builder";
import { Descriptions } from "@/app/_components/form-builder/form-description";
import { QuestionsList } from "@/app/_components/form-builder/questions-list";
import Title from "@/app/_components/UI/title";
import { useTranslations } from "next-intl";
import EditFormBtn from "../form-builder/edit-form-btn";

interface FormSettingsType{
  formId: string
}
const FormSettings = ({formId}: FormSettingsType) => {
  const t = useTranslations()
  return ( 
    <div className="mt-4">
      <Title label={t('formPreview.formSettings')}/>
      <div className="row mt-3">
        <div className="col">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="in"/>
          <label className="form-check-label" htmlFor="in">
            Hide this form
          </label>
        </div>
        </div>
        <div className="col">
          <FormBuilder formId={formId}>
            <Descriptions />
            <QuestionsList />
            <EditFormBtn/>
          </FormBuilder>
        </div>
      </div>
    </div>
   );
}
 
export default FormSettings;