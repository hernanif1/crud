import { render } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('should render default input', () => {
    const labelMock = 'Name'
    const { queryAllByText } = render(<Input id="mock" label={labelMock} />)
    expect(queryAllByText(labelMock)).toHaveLength(1)
  })

  it('should render error', () => {
    const errorMock = 'error name'
    const { queryAllByText } = render(<Input id="mock" error={errorMock} />)
    expect(queryAllByText(errorMock)).toHaveLength(1)
  })
})
