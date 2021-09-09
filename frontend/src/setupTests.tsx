// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

type Props = {
  route?: string
  match: {
    path: string
  }
}
// TODO: remove any
export const renderWithRouter = (
  Component: React.FunctionComponent<any>, // eslint-disable-line @typescript-eslint/no-explicit-any
  { route, ...props }: Props
) => {
  window.history.pushState({}, 'Test page', route)
  return render(<Component {...props} />, {
    wrapper: BrowserRouter
  })
}
