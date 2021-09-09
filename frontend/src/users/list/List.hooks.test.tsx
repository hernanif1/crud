import { renderHook, act } from '@testing-library/react-hooks'
import { useSearch } from './List.hooks'

describe('useSearch', () => {
  it('should return default properties', () => {
    const { result } = renderHook(() => useSearch())
    expect(result.current.search).toEqual('')
    expect(result.current.handleSearch).toEqual(expect.any(Function))
    expect(result.current.filterUsers).toEqual(expect.any(Function))
  })

  it('should set search when call handleSearch', () => {
    const { result } = renderHook(() => useSearch())
    const mockSearchQuery = {
      target: { value: 'hi' }
    } as React.ChangeEvent<HTMLInputElement>
    act(() => {
      result.current.handleSearch(mockSearchQuery)
    })
    expect(result.current.search).toEqual(mockSearchQuery.target.value)
  })

  it('should filter data', () => {
    const { result } = renderHook(() => useSearch())
    const mockData = [
      { name: 'Name 1', email: 'email@example.com' },
      { name: 'Name 2', email: 'name2@test.ci' }
    ]
    const mockSearchQuery = {
      target: { value: '@te' }
    } as React.ChangeEvent<HTMLInputElement>
    act(() => {
      result.current.handleSearch(mockSearchQuery)
    })

    act(() => {
      const data = result.current.filterUsers(mockData)
      expect(data).toEqual([mockData[1]])
    })
  })
})
