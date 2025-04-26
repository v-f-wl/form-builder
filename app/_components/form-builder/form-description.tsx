'use client'
import Input from "../UI/input";
import Textarea from "../UI/textarea";
import { useFormBuilder } from "../../context/form-builder-context";
import { useTranslations } from "next-intl";

export const Descriptions = () => {
  const { descriptionsForm, setDesctiprionForm, isSubmitting, validationErrors } = useFormBuilder()
  const t  = useTranslations()
  const handleInputChange = (field: string, value: string) => {
    setDesctiprionForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
  return (
    <div className="mb-4">
      <Input 
        disabled={isSubmitting}
        name='title'
        value={descriptionsForm.title}
        label={t('formBuilder.title')} 
        id='form_title'
        onChange={handleInputChange}
        error={validationErrors._title}
      />
      <Textarea 
        disabled={isSubmitting}
        name='description'
        value={descriptionsForm.description}
        id='form_description'
        label={t('formBuilder.description')} 
        onChange={handleInputChange}
        error={validationErrors._description}
      />
    </div>
  )
};
