import { useFormik } from 'formik'
import { Modal } from 'components'
import { validationSchema } from '../form/Form.validations'
import { useUserPost } from '../../Users.hooks'
import { fromComponentToApi } from '../form/Form.orm'
import { Form } from '../form/Form'
import { RouteComponentProps } from 'react-router'

type Params = { id: string }
const Add = ({ history }: RouteComponentProps<Params>) => {
  const { mutateAsync, isLoading, error, isSuccess } = useUserPost()
  const handleClose = () => history.push('/task-2/users')
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      birthday: ''
    },
    validationSchema,
    onSubmit: values => {
      const body = fromComponentToApi(values)
      mutateAsync(body)
    }
  })

  return (
    <Modal
      title="Add user"
      onConfirm={formik.handleSubmit}
      onClose={handleClose}
      isSubmitting={isLoading}
      isSubmitSuccess={isSuccess}
      confirmLabel="Add user"
      error={!!error}
    >
      <Form form={formik} />
    </Modal>
  )
}

export default Add
