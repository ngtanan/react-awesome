import './button.styles.scss'

type ButtonProps = {
  children: React.ReactNode;
  buttonType?: string,
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BUTTON_TYPES: { [key: string]: string } = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({ children, buttonType, ...otherProps }: ButtonProps) => (
  <button
    className={`button-container ${buttonType && BUTTON_TYPES[buttonType]}`}
    {...otherProps}
  >
    {children}
  </button>
)

export default Button
