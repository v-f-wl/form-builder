'use client'
import { nanoid } from "@reduxjs/toolkit";
import Input from "./UI/input";
import { useFormBuilder } from "../context/form-builder-context";
import IClose from "./icons/close-icon";
import IAddLinear from "./icons/add-linear-icon";

export const InputPlaceholder = ({label}: {label: string}) => {
  return ( 
    <div className="">
      <Input id={nanoid()} label={label} disabled={true}/>
    </div>
  )
}

export const CheckboxAnswer = ({
  id, 
}: {
  id: string, 
}) => {
  const { questionsForm, updateAnswer, addAnswer, deleteAnswer } = useFormBuilder()

  const currentAnswers = questionsForm.find(q => q.id === id)?.answersList || []
  return ( 
    <div className="d-flex flex-column gap-2">
      {currentAnswers.map((answer) => (
        <div key={answer.id} className="mb-2 d-flex gap-2 align-items-center">
          <div className="form-check-input"></div>
          <input
            type="text"
            value={answer.value}
            onChange={(e) =>
              updateAnswer(id, answer.id, e.target.value)
            }
            className="form-control"
          />
          <button onClick={() => deleteAnswer(id, answer.id)} className="btn btn-outline-danger btn-sm">
            <IClose/>
          </button>
        </div>
      ))}
      {currentAnswers.length < 4 && (
        <button 
          onClick={() => addAnswer(id)} 
          className={`d-flex align-items-center justify-content-center gap-2 btn btn-outline-primary btn-sm`}
        >
          <div className="">One more Line</div>
          <IAddLinear/>
        </button>
      )}
    </div>
  );
}

