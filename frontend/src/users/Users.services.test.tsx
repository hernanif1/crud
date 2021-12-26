import { axios } from '../utils'
import UserServices from './Users.services'

jest.mock('../utils', () => ({
  axios: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  }
}))

const axiosMock = {
  get: axios.get as jest.Mock,
  post: axios.post as jest.Mock,
  put: axios.put as jest.Mock,
  delete: axios.delete as jest.Mock
}

describe('UserServices', () => {
  it('should call axios.get and return mock data when call UserServices.getAll', async () => {
    const mockedResponse = [{ name: 'Albert' }]
    axiosMock.get.mockResolvedValueOnce({ data: mockedResponse })
    const mock = await UserServices.getAll()
    expect(axiosMock.get).toHaveBeenCalledWith('/accounts')
    expect(mock).toBe(mockedResponse)
  })

  it('should call axios.get and return mock data when call UserServices.getById', async () => {
    const mockedResponse = { id: '123', name: 'Robert' }
    const mockId = '123'
    axiosMock.get.mockResolvedValueOnce({ data: mockedResponse })
    const mock = await UserServices.getById(mockId)
    expect(axiosMock.get).toHaveBeenCalledWith(`/accounts/${mockId}`)
    expect(mock).toBe(mockedResponse)
  })

  it('should call axios.post and return mock data when call UserServices.post', async () => {
    const mockedBody = { name: 'Jennifer' }
    const mockedResponse = { id: '234', name: 'Jennifer' }
    axiosMock.post.mockResolvedValueOnce({ data: mockedResponse })
    const mock = await UserServices.post(mockedBody)
    expect(axiosMock.post).toHaveBeenCalledWith('/accounts', mockedBody)
    expect(mock).toBe(mockedResponse)
  })

  it('should call axios.put and return mock data when call UserServices.put', async () => {
    const mockedBody = { name: 'Richard' }
    const mockedResponse = { id: '345', name: 'Richard' }
    const mockId = '345'
    axiosMock.put.mockResolvedValueOnce({ data: mockedResponse })
    const mock = await UserServices.put(mockId, mockedBody)
    expect(axiosMock.put).toHaveBeenCalledWith(
      `/accounts/${mockId}`,
      mockedBody
    )
    expect(mock).toBe(mockedResponse)
  })

  it('should call axios.delete and return mock data when call UserServices.delete', async () => {
    const mockedResponse = { id: '456', success: true }
    const mockId = '456'
    axiosMock.delete.mockResolvedValueOnce({ data: mockedResponse })
    const mock = await UserServices.delete(mockId)
    expect(axiosMock.delete).toHaveBeenCalledWith(`/accounts/${mockId}`)
    expect(mock).toBe(mockedResponse)
  })
})
