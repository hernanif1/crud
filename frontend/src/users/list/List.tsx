import { Link, RouteComponentProps } from 'react-router-dom'
import { fromApiToComponent } from './List.orm'
import { useUserGetAll } from '../Users.hooks'
import { Input, Spinner } from 'components'
import { useSearch } from './List.hooks'

const List = ({ match }: RouteComponentProps) => {
  const { path } = match
  const { handleSearch, filterUsers } = useSearch()
  const { isLoading, error, data } = useUserGetAll()
  const parsedData = fromApiToComponent(data)
  const users = filterUsers(parsedData)

  if (isLoading) return <Spinner />

  if (error) {
    return (
      <div className="d-flex justify-content-center">
        Error fetching the users
      </div>
    )
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h2>Users</h2>
        <div className="d-flex align-items-center justify-content-center">
          <Link to={`${path}/add`} className="btn btn-primary">
            Add User
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-start mt-4">
        <Input onChange={handleSearch} placeholder="Search" />
      </div>
      <div className="table-responsive-lg">
        <table className="table table-striped">
          <thead>
            <tr className="d-flex">
              <th className="col-1">ID</th>
              <th className="col-2">Name</th>
              <th className="col-4">Email</th>
              <th className="col-3">Birthday</th>
              <th className="col-2 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map(user => (
                <tr key={user.id} className="d-flex align-middle">
                  <th className="col-1">{user.id}</th>
                  <td className="col-2 text-truncate">{user.name}</td>
                  <td className="col-4 text-truncate">{user.email}</td>
                  <td className="col-3 text-truncate">{user.birthday}</td>
                  <td className="col-2">
                    <div className="d-flex flex-nowrap justify-content-end">
                      <Link
                        to={`${path}/edit/${user.id}`}
                        className="btn btn-primary me-1"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`${path}/delete/${user.id}`}
                        className="btn btn-danger"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            {users && !users.length && (
              <tr>
                <td colSpan={5} className="text-center">
                  <div className="p-2">No users to display</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default List
