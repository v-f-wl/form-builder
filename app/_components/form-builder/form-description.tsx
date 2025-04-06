'use client'
import Input from "../UI/input";
import Textarea from "../UI/textarea";
import { useFormBuilder } from "../../context/form-builder-context";

export const Descriptions = () => {
  const { descriptionsForm, setDesctiprionForm } = useFormBuilder()

  const handleInputChange = (field: string, value: string) => {
    setDesctiprionForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
  return (
    <div className="mb-4">
      <Input 
        name='title'
        value={descriptionsForm.title}
        label="Title" 
        id='form_title'
        onChange={handleInputChange}
      />
      <Textarea 
        label="Description"
        name='description'
        value={descriptionsForm.description}
        id='form_description'
        onChange={handleInputChange}
      />
    </div>
  )
};
