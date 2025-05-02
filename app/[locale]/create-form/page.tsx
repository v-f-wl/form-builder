import Title from "@/app/_components/UI/title";
import Link from "next/link";
import FormBuilder from "../../_components/form-builder/form-builder";
import { AddQuestionButton } from "@/app/_components/form-builder/add-question-button";
import { QuestionsList } from "@/app/_components/form-builder/questions-list";
import { Descriptions } from "@/app/_components/form-builder/form-description";
import SubmitFormBtn from "@/app/_components/form-builder/submit-form-btn";
import TagsComponent from "@/app/_components/form-builder/tags-component";
import Selectcategory from "@/app/_components/form-builder/select-category";
import { useTranslations } from "next-intl";
import FormRules from "@/app/_components/form-builder/form-rules";

export default function CreatePage(){
  const t = useTranslations()
  return (  
    <div className="container px-3">
      <Link href="/" className="mt-4 d-inline-block btn active">
        {t('ui.goBack')}
      </Link>

      <div className="mx-auto w-100 w-md-75 w-lg-50 mt-4">
        <Title label={t('formBuilder.createForm')} />
        <FormBuilder formId={undefined}>
          <FormRules/>
          <Descriptions />
          {/* <ImageUpload/> */}
          <TagsComponent/>
          <Selectcategory/>
          <QuestionsList />
          <AddQuestionButton />
          <SubmitFormBtn/>
        </FormBuilder>
      </div>
    </div>
  );
}
