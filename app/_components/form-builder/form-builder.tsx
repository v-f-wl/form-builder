'use client'
import { ReactNode, useEffect, useState } from "react";
import { QuestionFormType } from "@/types";
import { FormBuilderContext } from "../../context/form-builder-context";


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
          id: crypto.randomUUID(),
          title: "",
          typeOfAnswer: "short_text",
          answersList: [{ id: crypto.randomUUID(), value: "" }, { id: crypto.randomUUID(), value: "" }],
          required: false,
        },
      ]);
    }
  }, [formId])
  // useEffect(() => {console.group(questionsForm)}, [questionsForm])
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
                { id: crypto.randomUUID(), value: "" },
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