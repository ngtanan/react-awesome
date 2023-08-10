import './button.styles.scss'

interface ButtonProps {
  children: React.ReactNode;
  buttonType?: string,
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BUTTON_TYPES: {[key: string]: string} = {
  'google': 'google-sign-in',
  'inverted': 'inverted'
}

const Button : React.FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${buttonType && BUTTON_TYPES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button;
