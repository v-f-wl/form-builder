interface TextareaProps{
  label: string,
  disabled?: boolean
}
const Textarea = ({label, disabled}: TextareaProps) => {
  return ( 
    <div className="form-floating mb-3">
      <textarea className="form-control" placeholder={label} id="floatingTextarea" disabled={disabled}></textarea>
      <label htmlFor="floatingTextarea">{label}</label>
    </div>
  )
}
 
export default Textarea;