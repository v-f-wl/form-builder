'use client'
import { ReactNode, useEffect, useState } from "react";
import { QuestionFormType } from "@/types";
import { FormBuilderContext } from "../../context/form-builder-context";
import { nanoid } from "@reduxjs/toolkit";


const FormBuilder = ({children, formId}: {children: ReactNode, formId: string | undefined}) => {
  const [descriptionsForm, setDesctiprionForm] = useState({ title: "", description: "" });
  const [questionsForm, setQuestionsForm] = useState<QuestionFormType[]>([]);

  const isEditMode = Boolean(formId);

  useEffect(() => {
    if (isEditMode) {
      // todo: Загружаем данные формы по ID
    } else {
      setQuestionsForm([
        {
          id: nanoid(),
          title: "",
          typeOfAnswer: "short_text",
          answersList: [{ id: nanoid(), value: "" }, { id: nanoid(), value: "" }],
          required: false,
        },
      ]);
    }
  }, [formId])
  // useEffect(() => {console.log(JSON.stringify(questionsForm, null, 2))}, [questionsForm])

  const updateQuestion = (id: string, updatedData: Partial<QuestionFormType>) => {
    setQuestionsForm((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updatedData } : q))
    )
  }
  const deleteQuestion = (id: string) => {
    setQuestionsForm((prev) => prev.filter((q) => q.id !== id));
  }
  const addAnswer = (questionId: string) => {
    setQuestionsForm((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answersList: [
                ...q.answersList,
                { id: nanoid(), value: "" },
              ],
            }
          : q
      )
    );
  };
  
  const updateAnswer = (questionId: string, answerId: string, newValue: string) => {
    setQuestionsForm((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answersList: q.answersList.map((a) =>
                a.id === answerId ? { ...a, value: newValue } : a
              ),
            }
          : q
      )
    );
  };
  
  const deleteAnswer = (questionId: string, answerId: string) => {
    setQuestionsForm((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answersList: q.answersList.filter((a) => a.id !== answerId),
            }
          : q
      )
    );
  };
  
  
  return (
    <FormBuilderContext.Provider
      value={{ updateAnswer, deleteAnswer, addAnswer, updateQuestion, deleteQuestion, descriptionsForm, setDesctiprionForm, questionsForm, setQuestionsForm, isEditMode }}
    >
      <div className="my-4 w-full">{children}</div>
    </FormBuilderContext.Provider>
  )
}
 
export default FormBuilder;