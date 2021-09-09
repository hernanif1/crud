import format from 'date-fns/format'
import parse from 'date-fns/parse'

const API_FORMAT = 'yyyy-MM-dd'
export const FRONTEND_FORMAT = 'dd/MM/yyyy'

export const toDateFormat = (date: string) => {
  return parse(date, FRONTEND_FORMAT, new Date())
}

export const toDateHumanFormat = (date: string) => {
  return format(new Date(date), FRONTEND_FORMAT)
}

export const toDateAPIFormat = (date: string) => {
  const dateParsed = toDateFormat(date)
  return format(dateParsed, API_FORMAT)
}
