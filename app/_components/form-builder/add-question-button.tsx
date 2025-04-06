'use client'
import IAdd from "../icons/add-icon";
import { useFormBuilder } from "../../context/form-builder-context";
import { nanoid } from "@reduxjs/toolkit";

export const AddQuestionButton = () => {
  const { setQuestionsForm } = useFormBuilder()

  const addQuestion = () => {
    setQuestionsForm((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        typeOfAnswer: "short_text",
        answersList: [{ id: nanoid(), value: "" }, { id: nanoid(), value: "" }],
        required: false,
      },
    ])
  }
  return (
    <div className="d-grid">
      <button className='btn d-flex aligh-items-center justify-content-center gap-2 btn-outline-primary' onClick={addQuestion}>
        <span>Add Question</span>
        <IAdd/>
      </button>
    </div>
  )
};
