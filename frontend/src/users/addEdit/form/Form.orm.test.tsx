import { fromApiToComponent, fromComponentToApi } from './Form.orm'
import { toDateHumanFormat, toDateAPIFormat } from 'utils'

jest.mock('utils', () => ({
  toDateHumanFormat: jest.fn(),
  toDateAPIFormat: jest.fn()
}))

const toDateHumanFormatMock = toDateHumanFormat as jest.Mock
const toDateAPIFormatMock = toDateAPIFormat as jest.Mock

describe('fromApiToComponent', () => {
  it('should convert data from api to component and call date parse', () => {
    const mockData = {
      name: 'Philips',
      birthday: new Date('04-12-1990').toString()
    }
    toDateHumanFormatMock.mockImplementation(data => data)
    const data = fromApiToComponent(mockData)
    expect(data).toEqual(mockData)
    expect(toDateHumanFormatMock).toHaveBeenCalledWith(mockData.birthday)
  })

  it('should handle empty data', () => {
    const mockData = undefined
    const data = fromApiToComponent(mockData)
    expect(data).toEqual({ birthday: '' })
  })

  it('should handle empty birthday', () => {
    const mockData = { name: 'Rafael', birthday: '' }
    const data = fromApiToComponent(mockData)
    expect(data).toEqual(mockData)
  })
})

describe('fromComponentToApi', () => {
  it('should convert data from component to api and call date parse', () => {
    const mockData = {
      name: 'Andrew',
      birthday: new Date('18-12-1976').toString()
    }
    toDateAPIFormatMock.mockImplementation(data => data)
    const data = fromComponentToApi(mockData)
    expect(data).toEqual(mockData)
    expect(toDateAPIFormatMock).toHaveBeenCalledWith(mockData.birthday)
  })

  it('should handle empty birthday', () => {
    const mockData = { name: 'Carl', birthday: '' }
    const data = fromComponentToApi(mockData)
    expect(data).toEqual(mockData)
  })
})
