import Title from "@/app/_components/UI/title";
import Link from "next/link";
import FormBuilder from "../../_components/form-builder/form-builder";
import { AddQuestionButton } from "@/app/_components/form-builder/add-question-button";
import { QuestionsList } from "@/app/_components/form-builder/questions-list";
import { Descriptions } from "@/app/_components/form-builder/form-description";

const CreatePage = () => {
  return (  
    <div className="container">
      <Link href={'/'} className="mt-4 d-inline-block btn active">
        Go back
      </Link>
      <div className="w-50 mx-auto">
        <Title label="Create form"/>
        <FormBuilder formId={undefined}>
          <Descriptions />
          <QuestionsList />
          <AddQuestionButton />
        </FormBuilder>
      </div>
    </div>
  );
}
 
export default CreatePage;