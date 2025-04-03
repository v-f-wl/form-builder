'use client'
import Button from "@/app/_components/UI/button";
import Input from "@/app/_components/UI/input";
import Subtitle from "@/app/_components/UI/subtitle";
import { useEffect, useRef, useState } from "react";
import { CheckboxAnswer, ParagraphAnswer, ShortAnswer } from "./type-of-answer";
import Select from "./UI/select";


const selectOptions = [
  {
    value: 'short-answer', label: 'Short answer' 
  },
  {
    value: 'paragraph', label: 'Paragraph' 
  },
  {
    value: 'checkbox', label: 'Checkbox' 
  },
  // {
  //   value: 'short-answer', label: 'Short answer' 
  // },
]
const QuestionItem = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

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
  }, []);
  return (  
    <div ref={wrapperRef} className={`${isActive && 'border-primary'} mt-5 mb-4 border-start border-3 ps-3`}>
      <Subtitle label="Questions 1"/>
      <div className="">
        <Input label="Question title"/>
        <Select defaultLabel="Short answer" defaultValue="short-answer" options={selectOptions}/>
        <div className="mt-2">
          {/* <ShortAnswer/>
          <ParagraphAnswer/> */}
          <CheckboxAnswer/>
        </div>

        <div className="mt-3 d-flex justify-content-between align-items-center">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Requared</label>
          </div>
          <Button label="Delete" style="red"/>
        </div>
      </div>
    </div>
  )
}
 
export default QuestionItem;