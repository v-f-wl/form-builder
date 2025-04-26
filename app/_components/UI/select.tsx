'use client'

import { useTranslations } from "next-intl";

interface SelectProps{
  options: { value: string }[];
  onChange: (value: string) => void;
  disabled: boolean
  selectedValue: { value: string} | undefined
}
const Select = ({options, onChange, disabled, selectedValue}: SelectProps) => {
  const t = useTranslations()
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  };
  const localizedOptions = options.map(item => ({
    value: item.value,
    label: t(`formCategories.${item.value}`),
  }))

  return ( 
    <select 
      className="form-select" 
      aria-label="select"
      onChange={handleChange}
      disabled={disabled}
      value={selectedValue ? selectedValue.value : ''}
    >
      {localizedOptions.map((option, index) => (
        <option key={`option index - ${index}`} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}
 
export default Select;