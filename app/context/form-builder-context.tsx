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
  formImage: File | null;
  setFormImage: Dispatch<SetStateAction<File | null>>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  formCategory: string; 
  setFormCategory: Dispatch<SetStateAction<string>>;
  validationErrors: Record<string, string>;
  setValidationErrors: Dispatch<SetStateAction<Record<string, string>>>;
  validateQuestions: () => QuestionFormType[];
  tags: Set<string>, 
  setTags: Dispatch<SetStateAction<Set<string>>>,
}

export const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) throw new Error("useFormBuilder must be used within FormBuilder");
  return context;
};