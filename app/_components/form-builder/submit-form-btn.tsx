'use client'

import { useFormBuilder } from "@/app/context/form-builder-context";
import Button from "../UI/button";
import Axios from "axios"
import { useAuth } from "@clerk/nextjs";

const SubmitFormBtn = () => {
  const  {questionsForm, descriptionsForm} = useFormBuilder()
  const { userId, } = useAuth()

  const handeCreateForm = async() => {
    const result = await Axios.post("/en/api/create-form", {
      title: descriptionsForm.title,
      description: descriptionsForm.description,
      questions: questionsForm,
      userId: userId
    })
    console.log(result)
  }
  return ( 
    <div className="text-center mt-4">
      <Button label="Create" style="primary" onClick={handeCreateForm}/>
    </div>
  )
}
 
export default SubmitFormBtn;