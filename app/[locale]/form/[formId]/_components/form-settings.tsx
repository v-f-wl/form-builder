
import { AddQuestionButton } from "@/app/_components/form-builder/add-question-button";
import FormBuilder from "@/app/_components/form-builder/form-builder";
import { Descriptions } from "@/app/_components/form-builder/form-description";
import { QuestionsList } from "@/app/_components/form-builder/questions-list";
import Title from "@/app/_components/UI/title";

const FormSettings = () => {
  return ( 
    <div className="mt-4">
      <Title label='Form settings'/>
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
          <FormBuilder formId={undefined}>
            <Descriptions />
            <QuestionsList />
            <AddQuestionButton />
          </FormBuilder>
        </div>
      </div>
    </div>
   );
}
 
export default FormSettings;