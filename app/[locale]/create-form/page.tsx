import Title from "@/app/_components/UI/title";
import Link from "next/link";
import QuestionsController from "./_components/form-builder";
import FormBuilder from "./_components/form-builder";

const CreatePage = () => {
  return (  
    <div className="container">
      <Link href={'/'} className="mt-4 d-inline-block btn active">
        Go back
      </Link>
      <div className="w-50 mx-auto">
        <Title label="Create form"/>
        <FormBuilder/>
      </div>
    </div>
  );
}
 
export default CreatePage;