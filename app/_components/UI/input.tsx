interface InputProps{
  label: string
  disabled?: boolean;
}
// add id
const Input = ({label, disabled }: InputProps) => {
  return ( 
    <div className="form-floating mb-3">
      <input type="text" className="form-control" placeholder={label} disabled={disabled} id="floatingInput"/>
      <label htmlFor="floatingInput">{label}</label>
    </div>
  )
}
 
export default Input;