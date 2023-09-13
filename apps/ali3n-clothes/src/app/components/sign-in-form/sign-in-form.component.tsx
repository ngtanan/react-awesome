import { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: ''
}

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const resetFormFields = () => setFormFields(defaultFormFields)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await signInAuthWithEmailAndPassword(
        formFields.email,
        formFields.password
      )
      console.log(response)
      resetFormFields()
    } catch (error) {
      const err = error as { code: string }
      switch (err.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break
        default:
          console.log(error)
      }
    }
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          value={formFields.email}
          name="email"
          id="email"
          required
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          value={formFields.password}
          name="password"
          id="password"
          required
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGooglePopup}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
