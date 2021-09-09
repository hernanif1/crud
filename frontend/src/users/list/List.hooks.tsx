import React, { useState } from 'react'

export type FilterUsersData = { [key in string]: string }[]
export const useSearch = () => {
  const [search, setSearch] = useState('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return {
    search,
    handleSearch,
    filterUsers: (data: FilterUsersData = []) =>
      data?.filter(obj => {
        const values = Object.values(obj)
        return JSON.stringify(values)
          .toLowerCase()
          .includes(search.toLowerCase())
      })
  }
}
