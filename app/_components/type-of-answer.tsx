import Input from "./UI/input";
import Textarea from "./UI/textarea";

export const ShortAnswer = () => {
  return ( 
    <div className="">
      <Input label="Short answer text" disabled={true}/>
    </div>
  );
}
export const ParagraphAnswer = () => {
  return ( 
    <div className="">
      <Textarea label="Long answer text" disabled={true}/>
    </div>
  );
}

export const CheckboxAnswer = () => {
  return ( 
    <div className="d-flex flex-column gap-2">
      <div className="py-2 d-flex align-items-center gap-2">
        <div className="form-check-input"></div>
        <input className="form-control" placeholder="answer1"/>
      </div>
      <div className="py-2 d-flex align-items-center gap-2">
        <div className="form-check-input"></div>
        <input className="form-control" placeholder="answer2"/>
      </div>
      <div className="py-2 d-flex align-items-center gap-2">
        <div className="form-check-input"></div>
        <input className="form-control" placeholder="answer2"/>
      </div>
    </div>
  );
}
 