import { render } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('should render default size large', () => {
    const { container } = render(<Spinner />)
    expect(container?.firstChild?.firstChild).toHaveClass(
      'spinner-border spinner-border-lg'
    )
  })

  it('should render default size sm', () => {
    const { container } = render(<Spinner size="sm" />)
    expect(container?.firstChild?.firstChild).toHaveClass(
      'spinner-border spinner-border-sm'
    )
  })
})
