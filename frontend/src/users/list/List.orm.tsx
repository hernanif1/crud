import { User } from 'users/Users.services'
import { toDateHumanFormat } from 'utils'

const fromApiToComponent = (values?: User[]) =>
  values?.map(value => ({
    ...value,
    birthday: value.birthday ? toDateHumanFormat(value.birthday) : ''
  }))

export { fromApiToComponent }
