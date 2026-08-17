'use client'

import { FormEvent, useState } from 'react'

const initialValues = { name: '', email: '', password: '', confirmPassword: '' }

type FormValues = typeof initialValues
type FormErrors = Partial<Record<keyof FormValues, string>>

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.'

  if (!values.password) errors.password = 'Please create a password.'
  else if (values.password.length < 8) errors.password = 'Use at least 8 characters.'

  if (!values.confirmPassword) errors.confirmPassword = 'Please confirm your password.'
  else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match.'

  return errors
}

export default function Page() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
  }

  function handleChange(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setSubmitted(false)
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function fieldClass(field: keyof FormValues) {
    return `form-input ${errors[field] ? 'form-input-error' : ''}`
  }

  return (
    <main className="form-shell">
      <section className="form-panel" aria-labelledby="form-title">
        <div className="form-intro">
          <span className="eyebrow">CREATE ACCOUNT</span>
          <h1 id="form-title">Start your next chapter.</h1>
          <p>Set up your account in a few simple steps. Everything here is validated instantly in your browser.</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" autoComplete="name" placeholder="Jordan Lee" className={fieldClass('name')} value={values.name} onChange={(event) => handleChange('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
            {errors.name && <p className="field-error" id="name-error" role="alert">{errors.name}</p>}
          </div>

          <div className="field-group">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="jordan@example.com" className={fieldClass('email')} value={values.email} onChange={(event) => handleChange('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
            {errors.email && <p className="field-error" id="email-error" role="alert">{errors.email}</p>}
          </div>

          <div className="field-row">
            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" placeholder="8+ characters" className={fieldClass('password')} value={values.password} onChange={(event) => handleChange('password', event.target.value)} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined} />
              {errors.password && <p className="field-error" id="password-error" role="alert">{errors.password}</p>}
            </div>
            <div className="field-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Repeat password" className={fieldClass('confirmPassword')} value={values.confirmPassword} onChange={(event) => handleChange('confirmPassword', event.target.value)} aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined} />
              {errors.confirmPassword && <p className="field-error" id="confirm-password-error" role="alert">{errors.confirmPassword}</p>}
            </div>
          </div>

          <label className="terms-row">
            <input type="checkbox" required />
            <span>I agree to the <a href="#terms">terms and privacy policy</a>.</span>
          </label>

          <button className="submit-button" type="submit">Create account <span aria-hidden="true">→</span></button>
          <p className="form-note">No backend connected · Frontend validation demo</p>
          {submitted && <div className="success-message" role="status"><span aria-hidden="true">✓</span> Everything looks good. Your form is ready to send.</div>}
        </form>
      </section>
      <aside className="form-aside" aria-label="Form validation features">
        <div className="aside-mark" aria-hidden="true">✓</div>
        <p className="aside-kicker">FORM / 001</p>
        <h2>Good forms feel effortless.</h2>
        <p>Clear labels, helpful feedback, and a little less friction make every interaction feel considered.</p>
        <div className="aside-rule" />
        <p className="aside-meta">HTML · CSS · JAVASCRIPT</p>
      </aside>
    </main>
  )
}
