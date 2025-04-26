'use client'
import { useEffect, useState } from "react";
import QuestionItem from "./question-item";
import axios from "axios";
import { QuestionFormType } from "@/types";
import { useLocale } from "@/app/context/locale-context";
import Loading from "@/app/_components/loading";
import CrashMessage from "@/app/_components/crash-message";
import Button from "../UI/button";
import toast from "react-hot-toast";

export interface AnswerSubmission {
  questionId: string;
  answer: string;
  required: boolean;
  type: string;
}

interface AnswersList {
  id: string,
  value: string | null
}
const QuestionsContainer = ({ formId }: { formId: string }) => {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [formQuestions, setFormQuestions] = useState<QuestionFormType[] | null>(null)
  const [answers, setAnswers] = useState<AnswersList[]>([])
  
  useEffect(()=>{console.log(answers)},[answers])
  useEffect(() => {
    const getFormQuestions = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get<{ questions: QuestionFormType[] }>(
          `/${locale}/api/forms/form-questions?formId=${formId}`
        );
        setFormQuestions(response.data.questions)
      } catch (error) {
        setIsError(true)
      } finally {
        setIsLoading(false);
      }
    };
    if (formId) getFormQuestions();
  }, [formId, locale])

  const handleAnswerChange = (questionId: string, value: string | null) => {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex((answer) => answer.id === questionId);
      if (existingAnswerIndex !== -1 && value != null) {
        const updated = [...prev]
        updated[existingAnswerIndex].value = value;
        return updated;
      } else {
        return [...prev, { id: questionId, value }];
      }
    });
  }

  const handleSubmit = async () => {
    try{
      const result = await axios.post(`/${locale}/api/forms/submit-answers`, {...answers, formId})
      toast.success(result.data.success) // todo: добавить сообщение с переводом
    }catch(error){
      toast.error('err') // todo: добавить ошибку с переводом
    }
  }

  if (isLoading) return <Loading />;
  if (isError) return <CrashMessage onClick={() => {}} />
  if (!formQuestions) return <div>Form unavailable</div>

  return (
    <div>
      <div className="mt-4 mx-auto d-flex flex-column gap-4">
        {formQuestions.sort((a, b) => Number(a.id) - Number(b.id)).map((q, idx) => (
          <QuestionItem
            key={q.id}
            id={q.id}
            title={q.title}
            isRequired={q.required}
            index={idx + 1}
            typeOfAnswer={q.typeOfAnswer}
            answersList={q.answersList}
            updateAnswes={handleAnswerChange}
          />
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button style="primary" onClick={handleSubmit} label="Send" />
      </div>
    </div>
  );
};

export default QuestionsContainer;
