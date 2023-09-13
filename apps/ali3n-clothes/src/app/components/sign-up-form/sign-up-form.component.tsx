import { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const resetFormFields = () => setFormFields(defaultFormFields)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formFields.password !== formFields.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        formFields.email,
        formFields.password
      )
      await createUserDocumentFromAuth(user, { displayName: formFields.displayName })
      resetFormFields()
    } catch (error) {
      if ((error as { code: string }).code === 'auth/email-already-in-use') {
        alert('Email already in use')
      } else {
        console.error('Error creating user', (error as Error).message)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-up-container">
      <h2>Don&#39;t have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          value={formFields.displayName}
          name="displayName"
          id="displayName"
          required
          onChange={handleChange}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          value={formFields.confirmPassword}
          name="confirmPassword"
          id="confirmPassword"
          required
          onChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
