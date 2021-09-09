import { validationSchema } from './Form.validations'

describe('validationSchema', () => {
  it('should validate empty object as false', async () => {
    const formValues = {
      name: '',
      birthday: '',
      email: ''
    }
    const isValid = await validationSchema.isValid(formValues)
    expect(isValid).toBe(false)
  })

  it('should validate correct object as true', async () => {
    const formValues = {
      name: 'William',
      birthday: '13/04/1955',
      email: 'william@email.com'
    }
    const isValid = await validationSchema.isValid(formValues)
    expect(isValid).toBe(true)
  })
})
