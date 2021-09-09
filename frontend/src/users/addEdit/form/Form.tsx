import { Input } from 'components'
import { FormikErrors, FormikTouched } from 'formik'
import { FormFields } from './Form.orm'

interface Form {
  form: {
    values: FormFields
    touched: FormikTouched<FormFields>
    errors: FormikErrors<FormFields>
    isSubmitting: boolean
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }
}

const Form = ({ form }: Form) => {
  return (
    <form className="row g-3">
      <fieldset disabled={form.isSubmitting}>
        <Input
          id="name"
          label="Name"
          value={form.values?.name || ''}
          onChange={form.handleChange}
          placeholder="Albert Sullivan"
          error={form.touched.name && form.errors.name?.toString()}
        />
        <Input
          id="email"
          label="Email"
          value={form.values?.email || ''}
          onChange={form.handleChange}
          placeholder="email@example.com"
          error={form.touched.email && form.errors.email?.toString()}
        />
        <Input
          id="birthday"
          label="Birthday"
          value={form.values?.birthday || ''}
          onChange={form.handleChange}
          placeholder="30/12/1986"
          error={form.touched.birthday && form.errors.birthday?.toString()}
        />
      </fieldset>
    </form>
  )
}

export { Form }
