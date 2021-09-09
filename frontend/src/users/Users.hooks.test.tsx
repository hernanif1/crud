import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  useUserGetAll,
  useUserGetById,
  useUserPost,
  useUserPut,
  useUserDelete
} from './Users.hooks'
import UserServices from './Users.services'

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn()
}))

const useQueryMock = useQuery as jest.Mock
const useMutationMock = useMutation as jest.Mock
const useQueryClientMock = useQueryClient as jest.Mock

describe('Users hooks', () => {
  it('should call useQuery and UserServices.getAll when call useUserGetAll', () => {
    useUserGetAll()
    expect(useQuery).toHaveBeenCalledWith('userGetAll', UserServices.getAll)
  })

  it('should call useQuery and UserServices.getById when call useUserGetById', () => {
    useQueryMock.mockImplementation((_param1, param2) => param2())
    const mockId = '874'
    const getById = jest.spyOn(UserServices, 'getById')
    useUserGetById(mockId)
    expect(useQueryMock).toHaveBeenCalledWith(
      'userGetById',
      expect.any(Function)
    )
    expect(getById).toHaveBeenCalledWith(mockId)
  })

  it('should call useMutation and UserServices.post and invalidateQueries when call useUserPost', () => {
    useMutationMock.mockImplementation((_param1, param2) => {
      param2.onSuccess()
    })
    const mockInvalidateQuery = jest.fn()
    useQueryClientMock.mockImplementation(() => ({
      invalidateQueries: mockInvalidateQuery
    }))

    useUserPost()
    expect(useQueryClientMock).toHaveBeenCalled()
    expect(useMutationMock).toHaveBeenCalledWith(UserServices.post, {
      onSuccess: expect.any(Function)
    })
    expect(mockInvalidateQuery).toHaveBeenCalledWith('userGetAll')
  })

  it('should call useMutation and UserServices.put and invalidateQueries when call useUserPut', async () => {
    const mockBody = { id: 123, name: 'Mocked Name' }
    const put = jest.spyOn(UserServices, 'put').mockImplementation(jest.fn())
    useMutationMock.mockImplementation(async (_param1, param2, param3) => {
      param2(mockBody)
      param3.onSuccess()
    })
    const mockInvalidateQuery = jest.fn()
    useQueryClientMock.mockImplementation(() => ({
      invalidateQueries: mockInvalidateQuery
    }))
    useUserPut()
    expect(useQueryClientMock).toHaveBeenCalled()
    expect(useMutationMock).toHaveBeenCalledWith('', expect.any(Function), {
      onSuccess: expect.any(Function)
    })
    expect(put).toBeCalledWith(mockBody.id, { name: mockBody.name })
    expect(mockInvalidateQuery).toHaveBeenCalledWith('userGetAll')
  })

  it('should call useMutation and UserServices.delete and invalidateQueries when call useUserDelete', () => {
    useMutationMock.mockImplementation((_param1, param2) => {
      param2.onSuccess()
    })
    const mockInvalidateQuery = jest.fn()
    useQueryClientMock.mockImplementation(() => ({
      invalidateQueries: mockInvalidateQuery
    }))
    useUserDelete()
    expect(useQueryClientMock).toHaveBeenCalled()
    expect(useMutationMock).toHaveBeenCalledWith(UserServices.delete, {
      onSuccess: expect.any(Function)
    })
    expect(mockInvalidateQuery).toHaveBeenCalledWith('userGetAll')
  })
})
