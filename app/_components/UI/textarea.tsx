import { InputProps } from "@/types";
import { ChangeEvent } from "react";

const Textarea = ({label, disabled, value,  id, onChange, name, error}: InputProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if(onChange && name)onChange(name, e.target.value)
  };
  return ( 
    <div className="form-floating mb-3">
      <textarea 
        className={`form-control ${disabled && 'opacity-50'}`}
        placeholder={label} 
        id={id} 
        value={value}
        disabled={disabled}
        onChange={handleChange}
      ></textarea>
      {error && (<div className="">{error}</div>)}
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
 
export default Textarea;