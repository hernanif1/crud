import { fromApiToComponent } from './List.orm'
import { toDateHumanFormat } from 'utils'

jest.mock('utils', () => ({
  toDateHumanFormat: jest.fn()
}))

const toDateHumanFormatMock = toDateHumanFormat as jest.Mock

describe('fromApiToComponent', () => {
  it('should convert data from api to component and call date parse', () => {
    const mockData = [
      { name: 'Albert', birthday: new Date('06-12-1986').toString() }
    ]
    toDateHumanFormatMock.mockImplementation(data => data)
    const data = fromApiToComponent(mockData)
    expect(data).toEqual(mockData)
    expect(toDateHumanFormatMock).toHaveBeenCalledWith(mockData[0].birthday)
  })

  it('should handle empty data', () => {
    const mockData = undefined
    const data = fromApiToComponent(mockData)
    expect(data).toEqual(mockData)
  })

  it('should handle empty birthday', () => {
    const mockData = [{ name: 'Richard', birthday: '' }]
    const data = fromApiToComponent(mockData)
    expect(data).toEqual(mockData)
  })
})
