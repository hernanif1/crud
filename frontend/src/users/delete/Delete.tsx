import { useEffect } from 'react'
import { Modal } from 'components'
import { useUserDelete } from '../Users.hooks'
import { RouteComponentProps } from 'react-router'

type Params = { id: string }
const Delete = ({ history, match }: RouteComponentProps<Params>) => {
  const { params } = match
  const { mutateAsync, isLoading, error, isSuccess } = useUserDelete()
  const handleDelete = () => mutateAsync(params.id)
  const handleClose = () => history.push('/task-2/users')

  useEffect(() => {
    isSuccess && handleClose()
  }, [isSuccess])

  return (
    <Modal
      title="You are about to delete a User"
      onConfirm={handleDelete}
      onClose={handleClose}
      confirmLabel="Delete user"
      isSubmitting={isLoading}
      isSubmitSuccess={isSuccess}
      error={!!error}
      deleteAction
    >
      <span className="text-secondary">You will permanently lose:</span>
      <br />
      <b>User ID {params.id}</b>
    </Modal>
  )
}

export default Delete
