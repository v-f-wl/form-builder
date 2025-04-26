'use client'
import Select from "../UI/select";
import Subtitle from "../UI/subtitle";
import { FORM_CATEGORY_OPTIONS } from "@/lib/constants";
import { useFormBuilder } from "@/app/context/form-builder-context";
import { useTranslations } from "next-intl";

const Selectcategory = () => {
  const {isSubmitting, formCategory, setFormCategory} = useFormBuilder()
  const t = useTranslations()
  return ( 
    <div className="mt-4">
      <Subtitle label={t('formBuilder.category')}/>
      <Select
        disabled={isSubmitting}
        options={FORM_CATEGORY_OPTIONS}
        selectedValue={FORM_CATEGORY_OPTIONS.find(option => option.value === formCategory)}
        onChange={setFormCategory}
      />
    </div>
  )
}
 
export default Selectcategory;