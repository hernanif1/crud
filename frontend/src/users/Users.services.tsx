import axios from 'axios'

export type User = {
  id?: string
  name?: string
  email?: string
  birthday?: string
}

const UserServices = {
  getAll: () => axios.get('/accounts').then(res => res.data),
  getById: (id: string) => axios.get(`/accounts/${id}`).then(res => res.data),
  post: (data: User) => axios.post('/accounts', data).then(res => res.data),
  put: (id?: string, data?: User) =>
    axios.put(`/accounts/${id}`, data).then(res => res.data),
  delete: (id: string) => axios.delete(`/accounts/${id}`).then(res => res.data)
}

export default UserServices
