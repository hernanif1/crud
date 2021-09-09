import { User } from 'users/Users.services'
import { toDateHumanFormat, toDateAPIFormat } from 'utils'

export type FormFields = ReturnType<typeof fromApiToComponent>
const fromApiToComponent = (data: User = {}) => ({
  ...data,
  birthday: data.birthday ? toDateHumanFormat(data.birthday) : ''
})

const fromComponentToApi = (data: FormFields) => ({
  ...data,
  birthday: data.birthday ? toDateAPIFormat(data.birthday) : ''
})

export { fromApiToComponent, fromComponentToApi }
