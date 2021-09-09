import { fireEvent, render } from '@testing-library/react'
import { Modal } from './Modal'
import { Spinner } from 'components'

jest.mock('components', () => ({
  Spinner: jest.fn()
}))

const SpinnerMock = Spinner as jest.Mock

describe('Modal', () => {
  const props = {
    onConfirm: jest.fn(),
    onClose: jest.fn()
  }
  it('should render title', () => {
    const titleMock = 'title mock'
    const { queryAllByText } = render(<Modal {...props} title={titleMock} />)
    expect(queryAllByText(titleMock)).toHaveLength(1)
  })

  it('should render error', () => {
    const { queryAllByText } = render(<Modal {...props} error={true} />)
    expect(queryAllByText(/Error message/i)).toHaveLength(1)
  })

  it('should render red button action', () => {
    const { getByText } = render(
      <Modal {...props} deleteAction={true} confirmLabel="Delete" />
    )
    const button = getByText('Delete')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn-danger')
  })

  it('should render spinner when is submitting', () => {
    const spinnerMock = 'spinner mock'
    SpinnerMock.mockImplementation(() => <div>{spinnerMock}</div>)
    const { queryAllByText } = render(<Modal isSubmitting={true} {...props} />)
    expect(queryAllByText(spinnerMock)).toHaveLength(1)
  })

  it('should call onClose when isSubmitSuccess is true', () => {
    const onCloseMock = jest.fn()
    render(<Modal {...props} isSubmitSuccess={true} onClose={onCloseMock} />)
    expect(onCloseMock).toHaveBeenCalled()
  })

  it('should call onClose on press esc', () => {
    const onCloseMock = jest.fn()
    render(<Modal {...props} onClose={onCloseMock} isSubmitting={false} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onCloseMock).toHaveBeenCalled()
  })
})
