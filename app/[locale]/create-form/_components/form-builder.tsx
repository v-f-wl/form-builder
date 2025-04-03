'use client'
import Button from "@/app/_components/UI/button";
import { useState } from "react";
import FormHeaderEditor from "@/app/_components/form-header-editor";
import FormQuestionsEditor from "@/app/_components/form-questions-editor";


interface QuestionType{
  title: string,
  typeOfAnswer: string,
  answersList?: Array<string>,
  requared: boolean
}
interface DestriprionFormType{
  title: string,
  description: string,

}
const FormBuilder = () => {
  const [destriprionForm, setDestriprionForm] = useState<DestriprionFormType>({
    title: '',
    description: ''
  })
  const [questions, setQuestions] = useState<QuestionType[]>([])
  return ( 
    <div className="mt-4 w-100">
      <FormHeaderEditor/>
      <FormQuestionsEditor/>
      <Button label="Create form" style="primary"/>
    </div>
  );
}
 
export default FormBuilder;