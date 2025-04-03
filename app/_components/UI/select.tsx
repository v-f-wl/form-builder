interface SelectProps{
  options: { value: string; label: string }[];
  defaultValue: string; 
  defaultLabel: string ,
}
const Select = ({defaultValue, defaultLabel,  options}: SelectProps) => {
  return ( 
    <select className=" form-select" aria-label="select">
          <option defaultValue={defaultValue}>{defaultLabel}</option>
          {options.filter(item => item.value != defaultValue).map((option, index) => (
            <option key={`option index - ${index}`} value={option.value}>{option.label}</option>
          ))}
    </select>
  );
}
 
export default Select;