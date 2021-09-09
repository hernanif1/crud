import React from 'react'

interface Input {
  id?: string
  label?: string
  error?: string | boolean
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}
const Input = (props: Input) => (
  <div className="mb-3">
    {props.label && (
      <label className="form-label" htmlFor={props.id}>
        {props.label}
      </label>
    )}
    <input
      className={`form-control ${props.error ? 'is-invalid' : ''}`}
      {...props}
    />
    {props.error && <div className="invalid-feedback">{props.error}</div>}
  </div>
)

export { Input }
