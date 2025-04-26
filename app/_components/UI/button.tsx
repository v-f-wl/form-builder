interface ButtonProps{
  label: string;
  style: 'primary'| 'outline-primary' | 'red';
  size?: 'small' | 'large';
  onClick: () => void;
  disabled?: boolean
}
const Button = ({label, style, size = 'small', onClick, disabled}: ButtonProps) => {
  return (  
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`
        ${style == 'outline-primary' && 'btn-outline-primary'}
        ${style == 'primary' && 'btn-primary'}
        ${style == 'red' && 'btn-outline-danger'}
        ${size == 'large' && 'btn-lg'}
        btn
      `}
    >
      {label}
    </button>
  )
}
 
export default Button;