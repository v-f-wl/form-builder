import { Answer } from "@/types";
import { useState } from "react";

interface SingleSelectCheckboxGroupProps {
  answersList: Answer[];
  onChange: (selectedId: string | null) => void;
  returnType?: "id" | "value";
  disabled: boolean
}

const SingleSelectCheckboxGroup = ({ answersList, onChange, disabled, returnType = "id" }: SingleSelectCheckboxGroupProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  
  const handleChange = (id: string) => {
    if(disabled) return
    const newSelectedId = selectedId === id ? null : id
    setSelectedId(newSelectedId)

    const selectedAnswer = answersList.find((ans) => ans.id === newSelectedId)
    const result = returnType === "value" ? selectedAnswer?.value ?? null : newSelectedId
    
    onChange(result)
  }
  return (
    <div className="d-flex flex-column gap-2">
      {answersList.map((answer) => (
        <div className="form-check" key={answer.id}>
          <input
            disabled={disabled}
            className="form-check-input"
            type="checkbox"
            id={`checkbox-${answer.id}`}
            checked={selectedId === answer.id}
            onChange={() => handleChange(answer.id)}
          />
          <label className="form-check-label" htmlFor={`checkbox-${answer.id}`}>
            {answer.value}
          </label>
        </div>
      ))}
    </div>
  )
};

export default SingleSelectCheckboxGroup;
