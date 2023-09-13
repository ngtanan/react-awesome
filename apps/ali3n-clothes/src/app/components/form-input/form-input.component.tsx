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

const FormInput = ({ label, ...otherProps }: FormInputProps) => (
  <div className="form-group">
    <input className="form-input" {...otherProps} />
    {
        label && <label htmlFor={otherProps.id} className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
      }
  </div>
)

FormInput.defaultProps = {
  label: '',
  placeholder: '',
  required: false
}

export default FormInput
