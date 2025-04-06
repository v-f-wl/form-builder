'use client'
import Button from "@/app/_components/UI/button";
import Input from "@/app/_components/UI/input";
import Subtitle from "@/app/_components/UI/subtitle";
import { useEffect, useMemo, useRef, useState } from "react";
import { CheckboxAnswer, InputPlaceholder } from "./type-of-answer";
import Select from "../UI/select";
import { QuestionType } from "@/types";
import { useFormBuilder } from "../../context/form-builder-context";

interface QuestionItemProps{
  order: number;
  id: string;
  title: string;
  typeOfAnswer: QuestionType,
  required: boolean,
}

const selectOptions = [
  {
    value: 'short_text', label: 'Short answer' 
  },
  {
    value: 'paragraph', label: 'Paragraph' 
  },
  {
    value: 'select_one', label: 'Select one' 
  },
]

const QuestionItem = ({
  order,
  id,
  title,
  typeOfAnswer,
  required,
}:QuestionItemProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const { updateQuestion, deleteQuestion } = useFormBuilder()
  // border style
  useEffect(() => {
    const handleFocusIn = () => setIsActive(true);
    const handleFocusOut = (event: FocusEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.relatedTarget as Node)) {
        setIsActive(false);
      }
    };

    const element = wrapperRef.current;
    if (element) {
      element.addEventListener("focusin", handleFocusIn);
      element.addEventListener("focusout", handleFocusOut);
    }

    return () => {
      if (element) {
        element.removeEventListener("focusin", handleFocusIn);
        element.removeEventListener("focusout", handleFocusOut);
      }
    };
  }, [])

  const TypeOfAnswerRander = useMemo(() => {
    switch (typeOfAnswer) {
      case "short_text":
        return <InputPlaceholder label={'Short answer text'}/>
      case "paragraph":
        return <InputPlaceholder label={'Long answer text'}/>
      case "select_one":
        return <CheckboxAnswer id={id}/>
      default:
        return <div className="text-red-500">Unknown question type:</div>;
    }
  },[typeOfAnswer])

  return (  
    <div ref={wrapperRef} className={`${isActive && 'border-primary'} mt-5 mb-4 bg-white border-start border-3 ps-3`}>
      <Subtitle label={`Question ${order}`}/>
      <div className="">
        <Input 
          disabled={false}
          id={`form_question_title_${id}`}
          label="Enter the question"
          name="title"
          onChange={(_, value) => updateQuestion(id, { title: value })}
          value={title}
        />
        <div className="mt-2 fs-6 text-body-secondary">
          Type of answer
        </div>
        <Select 
          defaultLabel="Short answer" 
          defaultValue="short_text" 
          options={selectOptions}
          onChange={(val) => updateQuestion(id, { typeOfAnswer: val as QuestionType })}
        />
        <div className="mt-2">
          {TypeOfAnswerRander}
        </div>

        <div className="mt-3 d-flex justify-content-between align-items-center">
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              role="switch" 
              checked={required}
              id={`form_question_switch_${id}`}
              onChange={(e) => updateQuestion(id, { required: e.target.checked })}
            />
            <label className="form-check-label" htmlFor={`form_question_switch_${id}`}>Requared</label>
          </div>
          <Button
            onClick={() => deleteQuestion(id)}
            label="Delete" 
            style="red"
          />
        </div>
      </div>
    </div>
  )
}
 
export default QuestionItem;