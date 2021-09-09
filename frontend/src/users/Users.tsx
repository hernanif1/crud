import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, RouteComponentProps } from 'react-router-dom'
import Add from './addEdit/add/Add'
import Edit from './addEdit/edit/Edit'
import Delete from './delete/Delete'
import List from './list/List'

const queryClient = new QueryClient()

export const Users = ({ match }: RouteComponentProps) => {
  const { path } = match
  return (
    <QueryClientProvider client={queryClient}>
      <Route path={path} component={List} />
      <Route path={`${path}/add`} component={Add} />
      <Route path={`${path}/edit/:id`} component={Edit} />
      <Route path={`${path}/delete/:id`} component={Delete} />
    </QueryClientProvider>
  )
}
