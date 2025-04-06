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
export interface QuestionFormType{
  id: string;
  title: string;
  typeOfAnswer: QuestionType;
  answersList: Array<{id: string; value: string}>;
  required: boolean;
}

export interface InputProps{
  label: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  id:string; 
  onChange?: (name: string, value: string) => void;
}