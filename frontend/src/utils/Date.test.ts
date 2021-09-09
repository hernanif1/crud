import { toDateFormat, toDateHumanFormat, toDateAPIFormat } from './Date'

describe('Date utils', () => {
  const dateFormat = new Date('1986-12-20')
  dateFormat.setHours(0, 0, 0, 0)
  const day = dateFormat.getDate()
  const month = dateFormat.getMonth() + 1
  const year = dateFormat.getFullYear()
  const dateHumanFormat = `${day}/${month}/${year}`
  const dateApiFormat = `${year}-${month}-${day}`

  it('should return Date calling toDateFormat', async () => {
    const date = toDateFormat(dateHumanFormat)
    expect(date).toEqual(dateFormat)
  })

  it('should return parsed string calling toDateHumanFormat', async () => {
    const date = toDateHumanFormat(dateFormat.toISOString())
    expect(date).toEqual(dateHumanFormat)
  })

  it('should return parsed string calling toDateAPIFormat', async () => {
    const date = toDateAPIFormat(dateHumanFormat)
    expect(date).toEqual(dateApiFormat)
  })
})
