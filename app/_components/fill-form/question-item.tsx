import Input from "@/app/_components/UI/input";
import Textarea from "@/app/_components/UI/textarea";
import { Answer, QuestionType } from "@/types";
import { useMemo } from "react";
import Subtitle from "@/app/_components/UI/subtitle";
import SingleSelectCheckboxGroup from "./single-select-checkbox-group";

interface QuestionItemProps{
  title: string;
  isRequired: boolean;
  index: number;
  typeOfAnswer: QuestionType;
  id: string;
  answersList: Array<Answer>;
  // value: string;
  updateAnswes: (questionId: string, value: string | null) => void;
}
const QuestionItem = ({
  title,
  isRequired,
  index,
  typeOfAnswer,
  id,
  answersList,
  updateAnswes
}: QuestionItemProps) => {
  const ActiveTab = useMemo(() => {
    switch (typeOfAnswer) {
      case "short_text":
        return <Input label="Ваш ответ" name='answer' id={`input-${id}`}  onChange={(_, value) => updateAnswes(id, value)}/>
      case "paragraph":
        return <Textarea label="Ваш ответ" name='answer' id={`textarea-${id}`}  onChange={(_, value) => updateAnswes(id, value )}/>
      case "select_one":
        return <SingleSelectCheckboxGroup answersList={answersList} onChange={(value) => updateAnswes(id, value )} returnType='value'/>
      default:
        return <div className="text-danger">Unknown tab:</div>;
  }},[typeOfAnswer])

  return ( 
    <div className="border-start border-2 p-2">
      <div className="d-flex gap-1">
        <Subtitle label={`${index}  ${title}`}/>{isRequired && <span className="text-danger">*</span>}
      </div>
      <div className="mt-2">
        {ActiveTab}
      </div>
    </div>
  );
}
 
export default QuestionItem;