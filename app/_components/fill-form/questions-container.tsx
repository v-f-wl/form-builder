'use client'
import { useEffect, useState, useTransition } from "react";
import QuestionItem from "./question-item";
import axios from "axios";
import { QuestionFormType } from "@/types";
import { useLocale } from "@/app/context/locale-context";
import Loading from "@/app/_components/loading";
import CrashMessage from "@/app/_components/crash-message";
import Button from "../UI/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
const QuestionsContainer = ({ 
  formId,
  status,
  reason
}:{ 
  formId: string,
  status: string,
  reason: string | undefined
}) => {
  const locale = useLocale()
  const route = useRouter()
  const t = useTranslations()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false);
  const [formQuestions, setFormQuestions] = useState<QuestionFormType[] | null>(null)
  const [answers, setAnswers] = useState<AnswersList[]>([])
  
  useEffect(() => {
    const getFormQuestions = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get<{ questions: QuestionFormType[]}>(
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
    setIsSubmitting(true)
    try{
      await axios.post(`/${locale}/api/forms/submit-answers`, {answers:[...answers], formId})
      route.push('/completed-form')
    }catch(error){
      toast.error('err') // todo: добавить ошибку с переводом
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <Loading />;
  if (isError) return <CrashMessage onClick={() => {}} />
  if (!formQuestions) return <div>Form unavailable</div>

  return (
    <div className={`${status === 'readonly' && 'opacity-75'}`}>
      <Link href={'/'} className="mt-4 d-inline-block btn active">
        {t('ui.goBack')}
      </Link>
      {status === 'readonly' && reason && (
        <div className="alert alert-warning mt-3" role="alert">
          {t(`formAccess.${reason}`)}
        </div>
      )}    
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
            disabled={isSubmitting || status === 'readonly'}
          />
        ))}
      </div>
      <div className="mt-4 text-center">
        {status ==="editable" && <Button disabled={isSubmitting} style="primary" onClick={handleSubmit} label="Send" />}
      </div>
    </div>
  );
};

export default QuestionsContainer;
