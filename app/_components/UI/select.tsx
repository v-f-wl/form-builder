'use client'
interface SelectProps{
  options: { value: string; label: string }[];
  defaultValue: string; 
  defaultLabel: string,
  onChange: (value: string) => void;
}
const Select = ({defaultValue, defaultLabel,  options, onChange}: SelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  };
  return ( 
    <select 
      className="form-select" 
      aria-label="select"
      onChange={handleChange}
    >
      {options.map((option, index) => (
        <option key={`option index - ${index}`} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}
 
export default Select;