import React from 'react'
import { useFormik } from 'formik'
import { Modal, Spinner } from 'components'
import { validationSchema } from '../form/Form.validations'
import { useUserGetById, useUserPut } from '../../Users.hooks'
import { fromApiToComponent, fromComponentToApi } from '../form/Form.orm'
import { Form } from '../form/Form'
import { RouteComponentProps } from 'react-router'

type Params = { id: string }
// Maybe the params type should come from the route url file?
const Edit = ({ history, match }: RouteComponentProps<Params>) => {
  const { params } = match
  const { data } = useUserGetById(params.id)
  const { mutateAsync, isLoading, error, isSuccess } = useUserPut()
  const handleClose = () => history.push('/task-2/users')
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: fromApiToComponent(data),
    onSubmit: values => {
      const body = fromComponentToApi({ id: params.id, ...values })
      mutateAsync(body)
    }
  })

  return (
    <Modal
      title="Edit user"
      onConfirm={formik.handleSubmit}
      onClose={handleClose}
      isSubmitting={isLoading}
      isSubmitSuccess={isSuccess}
      confirmLabel="Edit user"
      error={!!error}
    >
      {!data && <Spinner />}
      {data && <Form form={formik} />}
    </Modal>
  )
}

export default Edit
