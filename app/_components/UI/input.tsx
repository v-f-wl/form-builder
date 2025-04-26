import { InputProps } from "@/types";
import { ChangeEvent } from "react";


const Input = ({value, label, disabled, id, onChange, name, error }: InputProps) => {
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(onChange && name) onChange(name, e.target.value)
  };
  return ( 
    <div className="form-floating mb-3">
      <input 
        type="text" 
        className={`form-control ${disabled && 'opacity-50'}`}
        placeholder={label}
        disabled={disabled} 
        id={id}
        onChange={handleChange}
        value={value}
      />
      {error && (<div className="">{error}</div>)}
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
 
export default Input;