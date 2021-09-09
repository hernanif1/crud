import { renderWithRouter } from 'setupTests'
import { Users } from './Users'

// Users.js
const mock = {
  List: 'List component mock',
  Add: 'App component mock',
  Edit: 'Edit component mock',
  Delete: 'Delete component mock'
}
jest.mock('./list/List', () => ({
  __esModule: true,
  default: () => <div>{mock.List}</div>
}))

jest.mock('./addEdit/add/Add', () => ({
  __esModule: true,
  default: () => <div>{mock.Add}</div>
}))

jest.mock('./addEdit/edit/Edit', () => ({
  __esModule: true,
  default: () => <div>{mock.Edit}</div>
}))

jest.mock('./delete/Delete', () => ({
  __esModule: true,
  default: () => <div>{mock.Delete}</div>
}))

describe('<Users />', () => {
  it('should render List component only when receives /users as route', () => {
    const match = { path: '/users' }
    const route = match.path
    const { queryAllByText } = renderWithRouter(Users, { route, match })
    expect(queryAllByText(mock.List)).toHaveLength(1)
    expect(queryAllByText(mock.Add)).toHaveLength(0)
    expect(queryAllByText(mock.Edit)).toHaveLength(0)
    expect(queryAllByText(mock.Delete)).toHaveLength(0)
  })

  it('should render List and Add components only when receives /users/add as route', () => {
    const match = { path: '/users' }
    const route = `${match.path}/add`
    const { queryAllByText } = renderWithRouter(Users, { route, match })
    expect(queryAllByText(mock.List)).toHaveLength(1)
    expect(queryAllByText(mock.Add)).toHaveLength(1)
    expect(queryAllByText(mock.Edit)).toHaveLength(0)
    expect(queryAllByText(mock.Delete)).toHaveLength(0)
  })

  it('should render List and Edit components only when receives /users/edit/1 as route', () => {
    const match = { path: '/users' }
    const route = `${match.path}/edit/1`
    const { queryAllByText } = renderWithRouter(Users, { route, match })
    expect(queryAllByText(mock.List)).toHaveLength(1)
    expect(queryAllByText(mock.Add)).toHaveLength(0)
    expect(queryAllByText(mock.Edit)).toHaveLength(1)
    expect(queryAllByText(mock.Delete)).toHaveLength(0)
  })

  it('should render List and Delete components only when receives /users/delete/1 as route', () => {
    const match = { path: '/users' }
    const route = `${match.path}/delete/1`
    const { queryAllByText } = renderWithRouter(Users, { route, match })
    expect(queryAllByText(mock.List)).toHaveLength(1)
    expect(queryAllByText(mock.Add)).toHaveLength(0)
    expect(queryAllByText(mock.Edit)).toHaveLength(0)
    expect(queryAllByText(mock.Delete)).toHaveLength(1)
  })
})
