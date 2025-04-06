'use client'
import { createContext, Dispatch, SetStateAction, useContext } from "react";
import type { QuestionFormType } from "@/types";

interface DescriptionsFormPute {
  title: string;
  description: string;
}

interface FormBuilderContextType {
  descriptionsForm: DescriptionsFormPute;
  setDesctiprionForm: Dispatch<SetStateAction<DescriptionsFormPute>>;
  questionsForm: QuestionFormType[];
  setQuestionsForm: Dispatch<SetStateAction<QuestionFormType[]>>;
  isEditMode: boolean;
  updateQuestion:(id: string, updatedData: Partial<QuestionFormType>) => void;
  deleteQuestion:(id: string) => void;
  updateAnswer:(questionId: string, answerId: string, newValue: string) =>  void;
  deleteAnswer: (questionId: string, answerId: string) => void;
  addAnswer: (questionId: string) => void;
}

export const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) throw new Error("useFormBuilder must be used within FormBuilder");
  return context;
};