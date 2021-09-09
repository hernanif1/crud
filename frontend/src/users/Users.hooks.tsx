import { useMutation, useQuery, useQueryClient } from 'react-query'
import UserServices, { User } from './Users.services'

const cacheKey = {
  getAll: 'userGetAll',
  getById: 'userGetById'
}

export const useUserGetAll = () =>
  useQuery(cacheKey.getAll, UserServices.getAll)

export const useUserGetById = (id: string) =>
  useQuery(cacheKey.getById, () => UserServices.getById(id))

export const useUserPost = () => {
  const queryClient = useQueryClient()
  return useMutation(UserServices.post, {
    onSuccess: () => queryClient.invalidateQueries(cacheKey.getAll)
  })
}

export const useUserPut = () => {
  const queryClient = useQueryClient()
  return useMutation(
    '',
    ({ id, ...data }: User) => {
      return UserServices.put(id, data)
    },
    {
      onSuccess: () => queryClient.invalidateQueries(cacheKey.getAll)
    }
  )
}

export const useUserDelete = () => {
  const queryClient = useQueryClient()
  return useMutation(UserServices.delete, {
    onSuccess: () => queryClient.invalidateQueries(cacheKey.getAll)
  })
}
