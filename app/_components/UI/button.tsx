interface ButtonProps{
  label: string;
  style: 'primary'| 'outline-primary' | 'red';
  size?: 'small' | 'large'
}
const Button = ({label, style, size = 'small'}: ButtonProps) => {
  return (  
    <button 
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