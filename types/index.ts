export type FormTabsType = 'preview' | 'settings' | 'statistics'
export type QuestionType = "short_text" | "paragraph" | "select_one" | "number"


export interface FormQuestionsBuilder{
  userId?: string; //todo fix optional
  title: string;
  description: string;
  questions: QuestionFormType[];
}

export interface AnswersListType{
  id: string;
  value: string;
}

export type Answer = { id: string; value: string };

export interface QuestionFormType{
  id: string;
  title: string;
  typeOfAnswer: QuestionType;
  answersList: Array<Answer>
  required: boolean;
}
export interface AnswerSubmission{
  questionId: string,
  answer: string,
  required: boolean,
  type: string,
}

export interface InputProps{
  label: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  id:string; 
  onChange?: (name: string, value: string) => void;
  error?: string | undefined
}
export interface ResponseFormData {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  createdAt: Date;
  category: string;
  user?: {
    name: string
  };
  hashtags: Array<string>
}

export type FormCardProps  = {
  title: string;
  description: string;
  author: string;
  previewUrl: string;
  id: string;
}

export type FormSubmissionAnswer = {
  id: number;
  title: string;
  required: boolean;
  answer: string | null;
};

export type FormSubmission = {
  id: number;
  submittedBy: string;
  submittedEmail: string;
  submittedAt: string;
  answers: FormSubmissionAnswer[];
};

export type QuestionTemplate = {
  id: number;
  title: string;
  required: boolean;
};

export type FormSubmissionsResponse = {
  submissions: FormSubmission[];
  questionTemplates: QuestionTemplate[];
};