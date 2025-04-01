interface ButtonProps{
  label: string;
  style: 'primary'| 'outline-primary';
  size?: 'small' | 'large'
}
const Button = ({label, style, size = 'small'}: ButtonProps) => {
  return (  
    <button 
      className={`
        ${style == 'outline-primary' && 'btn-outline-primary'}
        ${style == 'primary' && 'btn-primary'}
        ${size == 'large' && 'btn-lg'}
        btn
      `}
    >
      {label}
    </button>
  )
}
 
export default Button;