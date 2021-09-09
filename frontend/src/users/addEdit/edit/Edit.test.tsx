import { render } from '@testing-library/react'
import { useUserPut, useUserGetById } from '../../Users.hooks'
import { Modal, Spinner } from 'components'
import { Form } from '../form/Form'
import { fromApiToComponent, fromComponentToApi } from '../form/Form.orm'
import { FormikConfig } from 'formik'
import Edit from './Edit'

jest.mock('formik', () => ({
  useFormik: (props: FormikConfig<[]>) => ({
    values: props.initialValues,
    handleSubmit: props.onSubmit
  })
}))

jest.mock('../form/Form.orm', () => ({
  fromApiToComponent: jest.fn(),
  fromComponentToApi: jest.fn()
}))

jest.mock('components', () => ({
  Modal: jest.fn(),
  Spinner: jest.fn()
}))

jest.mock('../../Users.hooks', () => ({
  useUserPut: jest.fn(),
  useUserGetById: jest.fn()
}))

jest.mock('../form/Form', () => ({
  Form: jest.fn()
}))

const useUserGetByIdMock = useUserGetById as jest.Mock
const useUserPutMock = useUserPut as jest.Mock
const ModalMock = Modal as jest.Mock
const FormMock = Form as jest.Mock
const SpinnerMock = Spinner as jest.Mock
const fromComponentToApiMock = fromComponentToApi as jest.Mock
const fromApiToComponentMock = fromApiToComponent as jest.Mock

describe('<Edit />', () => {
  const pushMock = jest.fn()
  const router = {
    history: { push: pushMock },
    match: { params: '123' }
  }

  it('should render <Modal />', () => {
    const mockModalParams = {
      title: 'Edit user',
      onConfirm: expect.any(Function),
      onClose: expect.any(Function),
      isSubmitting: true,
      isSubmitSuccess: true,
      confirmLabel: 'Edit user',
      error: true
    }
    useUserGetByIdMock.mockImplementation(() => ({ data: {} }))
    useUserPutMock.mockImplementation(() => ({
      mutateAsync: jest.fn(),
      isSuccess: true,
      isLoading: true,
      error: true
    }))
    const modalMock = 'modal mock'
    ModalMock.mockImplementation(() => <div>{modalMock}</div>)
    const { queryAllByText } = render(<Edit {...router} />)
    expect(queryAllByText(modalMock)).toHaveLength(1)
    expect(Modal).toHaveBeenCalledWith(
      expect.objectContaining(mockModalParams),
      {}
    )
  })

  it('should render <Form />', () => {
    const mockFormValues = 'initial data'
    useUserGetByIdMock.mockImplementation(() => ({ data: mockFormValues }))
    useUserPutMock.mockImplementation(() => ({ mutateAsync: jest.fn() }))
    fromApiToComponentMock.mockImplementation(props => props)
    const formMock = 'form mock'
    FormMock.mockImplementation(() => <div>{formMock}</div>)
    ModalMock.mockImplementation(({ children }) => <div>{children}</div>)
    const { queryAllByText } = render(<Edit {...router} />)
    expect(queryAllByText(formMock)).toHaveLength(1)
    expect(FormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        form: expect.objectContaining({ values: mockFormValues })
      }),
      {}
    )
  })

  it('should render <Spinner />', () => {
    useUserGetByIdMock.mockImplementation(() => ({ data: null }))
    useUserPutMock.mockImplementation(() => ({ mutateAsync: jest.fn() }))
    const spinnerMock = 'spinner mock'
    SpinnerMock.mockImplementation(() => <div>{spinnerMock}</div>)
    ModalMock.mockImplementation(({ children }) => <div>{children}</div>)
    const { queryAllByText } = render(<Edit {...router} />)
    expect(queryAllByText(spinnerMock)).toHaveLength(1)
  })

  it('should call history.push function when cancel', () => {
    useUserGetByIdMock.mockImplementation(() => ({ data: {} }))
    useUserPutMock.mockImplementation(() => ({ mutateAsync: jest.fn() }))
    ModalMock.mockImplementation(props => {
      props.onClose()
      return <div>Modal</div>
    })
    render(<Edit {...router} />)
    expect(pushMock).toHaveBeenCalledWith('/task-2/users')
  })

  it('should call post after confirm', () => {
    const mockMutate = jest.fn()
    const mockValue = { name: 'mock value' }
    useUserGetByIdMock.mockImplementation(() => ({ data: {} }))
    useUserPutMock.mockImplementation(() => ({ mutateAsync: mockMutate }))
    fromComponentToApiMock.mockImplementation(props => props)
    ModalMock.mockImplementation(props => {
      props.onConfirm(mockValue)
      return <div>Modal</div>
    })
    render(<Edit {...router} />)
    expect(fromComponentToApiMock).toHaveBeenCalledWith({
      id: undefined,
      ...mockValue
    })
    expect(mockMutate).toHaveBeenCalledWith({ id: undefined, ...mockValue })
  })
})
