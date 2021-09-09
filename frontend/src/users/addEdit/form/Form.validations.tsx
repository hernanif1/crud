import { isDate } from 'date-fns'
import { FRONTEND_FORMAT, toDateFormat } from 'utils'
import * as yup from 'yup'

const today = new Date()

const parseDateString = (_value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : toDateFormat(originalValue)

  return parsedDate
}

export const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  birthday: yup
    .date()
    .transform(parseDateString)
    .max(today, 'birthday should be today or before')
    .typeError(`birthday must be ${FRONTEND_FORMAT} format`)
    .required()
})
