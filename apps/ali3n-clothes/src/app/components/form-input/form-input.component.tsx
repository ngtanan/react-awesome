import './form-input.styles.scss'

type FormInputProps = {
  label?: string;
  type: string;
  value: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...otherProps }) => (
  <div className="form-group">
    <input className="form-input" {...otherProps} />
    {
        label && <label htmlFor={otherProps.id} className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
      }
  </div>
)

export default FormInput
