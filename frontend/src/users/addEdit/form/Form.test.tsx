import { render } from '@testing-library/react'
import { Input } from 'components'
import { Form } from './Form'

jest.mock('components', () => ({
  Input: jest.fn()
}))

const InputMock = Input as jest.Mock

describe('<Form />', () => {
  const formValues = {
    name: undefined,
    email: undefined,
    birthday: undefined
  }

  it('should render inputs', () => {
    const form = {
      values: formValues,
      touched: formValues,
      errors: formValues,
      isSubmitting: false,
      handleChange: jest.fn()
    }
    const mockInput = 'mock input'
    InputMock.mockImplementation(() => <div>{mockInput}</div>)
    const { queryAllByText } = render(<Form form={form} />)
    expect(queryAllByText(mockInput)).toHaveLength(3)
  })

  it('should render inputs with error message', () => {
    const form = {
      values: formValues,
      touched: {
        name: true,
        email: true,
        birthday: true
      },
      errors: {
        name: 'error name',
        email: 'error email',
        birthday: 'error birthday'
      },
      isSubmitting: false,
      handleChange: jest.fn()
    }
    const mockInput = 'mock input'
    InputMock.mockImplementation(() => <div>{mockInput}</div>)
    const { queryAllByText } = render(<Form form={form} />)
    expect(queryAllByText(mockInput)).toHaveLength(3)
  })
})
