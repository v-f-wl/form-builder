import { nanoid } from "@reduxjs/toolkit";
import { QuestionFormType } from "@/types";

export const useQuestionLogic = (
  questionsForm: QuestionFormType[],
  setQuestionsForm: React.Dispatch<React.SetStateAction<QuestionFormType[]>>
) => {

  
  const updateQuestion = (id: string, updatedData: Partial<QuestionFormType>) => {
    setQuestionsForm((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updatedData } : q))
    );
  };

  const deleteQuestion = (id: string) => {
    setQuestionsForm((prev) => prev.filter((q) => q.id !== id));
  };

  const addAnswer = (questionId: string) => {
    setQuestionsForm((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, answersList: [...q.answersList, { id: nanoid(), value: "" }] }
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
    )
  }

  return {
    updateQuestion,
    deleteQuestion,
    addAnswer,
    updateAnswer,
    deleteAnswer,
  }
};