import { render } from '@testing-library/react'
import { useUserGetAll } from '../Users.hooks'
import { Link } from 'react-router-dom'
import { Spinner } from 'components'
import List from './List'
import { renderWithRouter } from 'setupTests'

jest.mock('./List.hooks', () => ({
  useSearch: () => ({
    filterUsers: (props: []) => props
  })
}))

jest.mock('react-router-dom', () => ({
  Link: jest.fn()
}))

jest.mock('./List.orm', () => ({
  fromApiToComponent: (data: []) => data
}))

jest.mock('../Users.hooks', () => ({
  useUserGetAll: jest.fn()
}))

jest.mock('components', () => ({
  Spinner: jest.fn(),
  Input: () => <div>input</div>
}))

const useUserGetAllMock = useUserGetAll as jest.Mock
const SpinnerMock = Spinner as jest.Mock
const LinkMock = Link as jest.Mock

describe('<List />', () => {
  const match = { path: '/users' }

  it('should render loading', () => {
    const mockSpinner = 'loading spinner'
    useUserGetAllMock.mockImplementation(() => ({ isLoading: true }))
    SpinnerMock.mockImplementation(() => <div>{mockSpinner}</div>)

    const { queryAllByText } = renderWithRouter(List, { match })
    expect(queryAllByText(mockSpinner)).toHaveLength(1)
  })

  it('should render error and not show loading', () => {
    const match = { path: '/users' }
    const mockSpinner = 'loading spinner'
    useUserGetAllMock.mockImplementation(() => ({ error: true }))
    SpinnerMock.mockImplementation(() => <div>{mockSpinner}</div>)

    const { queryAllByText } = renderWithRouter(List, { match })
    expect(queryAllByText(mockSpinner)).toHaveLength(0)
    expect(queryAllByText(/Error fetching the users/i)).toHaveLength(1)
  })

  it('should render link to the add page', () => {
    useUserGetAllMock.mockImplementation(() => ({ data: [] }))
    LinkMock.mockImplementation(() => <div>Link to add page</div>)
    const { queryAllByText } = renderWithRouter(List, { match })
    expect(LinkMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ to: '/users/add' }),
      {}
    )
    expect(queryAllByText(/Link to add page/i)).toHaveLength(1)
  })

  it('should render table without users', () => {
    useUserGetAllMock.mockImplementation(() => ({ data: [] }))
    LinkMock.mockImplementation(() => <div>Link to add page</div>)
    const { queryAllByText } = renderWithRouter(List, { match })
    expect(queryAllByText(/No Users To Display/i)).toHaveLength(1)
  })

  it('should render data table and buttons', () => {
    const mockRow = {
      id: '123',
      email: 'email@example.com',
      name: 'Full name',
      birthday: '21/07/1986'
    }
    LinkMock.mockImplementation(() => <div>Link to external pages</div>)
    useUserGetAllMock.mockImplementation(() => ({ data: [mockRow] }))

    const { queryAllByText } = renderWithRouter(List, { match })
    expect(queryAllByText(mockRow.id)).toHaveLength(1)
    expect(queryAllByText(mockRow.email)).toHaveLength(1)
    expect(queryAllByText(mockRow.name)).toHaveLength(1)
    expect(queryAllByText(mockRow.birthday)).toHaveLength(1)
    expect(queryAllByText(mockRow.birthday)).toHaveLength(1)
    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({
        children: 'Delete',
        to: `/users/delete/${mockRow.id}`
      }),
      {}
    )
    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({
        children: 'Edit',
        to: `/users/edit/${mockRow.id}`
      }),
      {}
    )
  })
})
