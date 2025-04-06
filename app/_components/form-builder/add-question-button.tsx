'use client'
import IAdd from "../icons/add-icon";
import { useFormBuilder } from "../../context/form-builder-context";

export const AddQuestionButton = () => {
  const { setQuestionsForm } = useFormBuilder()

  const addQuestion = () => {
    setQuestionsForm((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        typeOfAnswer: "short_text",
        answersList: [{ id: crypto.randomUUID(), value: "" }, { id: crypto.randomUUID(), value: "" }],
        required: false,
      },
    ])
  }
  return (
    <div className="d-grid">
      <button className='btn d-flex aligh-items-center justify-content-center gap-2 btn-outline-secondary' onClick={addQuestion}>
        <span>Add Question</span>
        <IAdd/>
      </button>
    </div>
  )
};
