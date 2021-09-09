import { render } from '@testing-library/react'
import { useUserPost } from '../../Users.hooks'
import { Modal } from 'components'
import { Form } from '../form/Form'
import { fromComponentToApi } from '../form/Form.orm'
import Add from './Add'
import { FormikConfig } from 'formik'

jest.mock('formik', () => ({
  useFormik: (props: FormikConfig<[]>) => ({
    values: props.initialValues,
    handleSubmit: props.onSubmit
  })
}))

jest.mock('../form/Form.orm', () => ({
  fromComponentToApi: jest.fn()
}))

jest.mock('components', () => ({
  Modal: jest.fn()
}))

jest.mock('../../Users.hooks', () => ({
  useUserPost: jest.fn()
}))

jest.mock('../form/Form', () => ({
  Form: jest.fn()
}))

const useUserPostMock = useUserPost as jest.Mock
const ModalMock = Modal as jest.Mock
const FormMock = Form as jest.Mock
const fromComponentToApiMock = fromComponentToApi as jest.Mock

describe('<Add />', () => {
  const pushMock = jest.fn()
  const router = {
    history: { push: pushMock }
  }

  it('should render <Modal />', () => {
    const mockModalParams = {
      title: 'Add user',
      onConfirm: expect.any(Function),
      onClose: expect.any(Function),
      isSubmitting: true,
      isSubmitSuccess: true,
      confirmLabel: 'Add user',
      error: true
    }

    useUserPostMock.mockImplementation(() => ({
      mutateAsync: jest.fn(),
      isSuccess: true,
      isLoading: true,
      error: true
    }))
    const modalMock = 'modal mock'
    ModalMock.mockImplementation(() => <div>{modalMock}</div>)
    const { queryAllByText } = render(<Add {...router} />)
    expect(queryAllByText(modalMock)).toHaveLength(1)
    expect(ModalMock).toHaveBeenCalledWith(
      expect.objectContaining(mockModalParams),
      {}
    )
  })

  it('should render <Form />', () => {
    useUserPostMock.mockImplementation(() => ({ mutateAsync: jest.fn() }))
    const formMock = 'form mock'
    FormMock.mockImplementation(() => <div>{formMock}</div>)
    ModalMock.mockImplementation(({ children }) => <div>{children}</div>)
    const { queryAllByText } = render(<Add {...router} />)
    expect(queryAllByText(formMock)).toHaveLength(1)
    expect(FormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        form: expect.objectContaining({
          values: { name: '', email: '', birthday: '' }
        })
      }),
      {}
    )
  })

  it('should call history.push function when cancel', () => {
    useUserPostMock.mockImplementation(() => ({ mutateAsync: jest.fn() }))
    ModalMock.mockImplementation(props => {
      props.onClose()
      return <div>Modal</div>
    })
    render(<Add {...router} />)
    expect(pushMock).toHaveBeenCalledWith('/task-2/users')
  })

  it('should call post after confirm', () => {
    const mockMutate = jest.fn()
    const mockValue = 'mock value'
    useUserPostMock.mockImplementation(() => ({ mutateAsync: mockMutate }))
    fromComponentToApiMock.mockImplementation(props => props)
    ModalMock.mockImplementation(props => {
      props.onConfirm(mockValue)
      return <div>Modal</div>
    })
    render(<Add {...router} />)
    expect(fromComponentToApi).toHaveBeenCalledWith(mockValue)
    expect(mockMutate).toHaveBeenCalledWith(mockValue)
  })
})
