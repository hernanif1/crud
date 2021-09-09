import { render } from '@testing-library/react'
import { useUserDelete } from '../Users.hooks'
import { Modal } from 'components'
import Delete from './Delete'

jest.mock('components', () => ({
  Modal: jest.fn()
}))

jest.mock('../Users.hooks', () => ({
  useUserDelete: jest.fn()
}))

const useUserDeleteMock = useUserDelete as jest.Mock
const ModalMock = Modal as jest.Mock

describe('<Delete />', () => {
  const pushMock = jest.fn()
  const router = {
    history: { push: pushMock },
    match: { params: '123' }
  }

  it('should call <Modal />', () => {
    const mockModalParams = {
      confirmLabel: 'Delete user',
      deleteAction: true,
      title: 'You are about to delete a User',
      onClose: expect.any(Function),
      onConfirm: expect.any(Function),
      isSubmitting: true,
      error: true
    }
    useUserDeleteMock.mockImplementation(() => ({
      mutateAsync: jest.fn(),
      isLoading: true,
      error: true
    }))
    ModalMock.mockImplementation(({ children }) => <div>{children}</div>)
    const { queryAllByText } = render(<Delete {...router} />)
    expect(queryAllByText(/You will permanently lose:/i)).toHaveLength(1)
    expect(ModalMock).toHaveBeenCalledWith(
      expect.objectContaining(mockModalParams),
      {}
    )
  })

  it('should call delete function when confirm', () => {
    const mockMutate = jest.fn()
    useUserDeleteMock.mockImplementation(() => ({ mutateAsync: mockMutate }))
    ModalMock.mockImplementation(props => {
      props.onConfirm()
      return <div>Modal</div>
    })
    render(<Delete {...router} />)
    expect(mockMutate).toHaveBeenCalled()
  })

  it('should call history.push function when cancel', () => {
    useUserDeleteMock.mockImplementation(() => ({ mutateAsync: jest.fn() }))
    ModalMock.mockImplementation(props => {
      props.onClose()
      return <div>Modal</div>
    })
    render(<Delete {...router} />)
    expect(pushMock).toHaveBeenCalledWith('/task-2/users')
  })

  it('should call history.push function when api response is success', () => {
    useUserDeleteMock.mockImplementation(() => ({ mutateAsync: jest.fn() }))
    ModalMock.mockImplementation(() => <div>Modal</div>)
    const { rerender } = render(<Delete {...router} />)
    useUserDeleteMock.mockImplementation(() => ({
      mutateAsync: jest.fn(),
      isSuccess: true
    }))
    rerender(<Delete {...router} />)
    expect(pushMock).toHaveBeenCalledWith('/task-2/users')
  })
})
