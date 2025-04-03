import FormHeaderEditor from "@/app/_components/form-header-editor";
import FormQuestionsEditor from "@/app/_components/form-questions-editor";
import Button from "@/app/_components/UI/button";
import Input from "@/app/_components/UI/input";
import Textarea from "@/app/_components/UI/textarea";
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
        <FormHeaderEditor/>
        <FormQuestionsEditor/>
        </div>
      </div>
    </div>
   );
}
 
export default FormSettings;