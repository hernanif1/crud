import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom'
// import './index.css'
import { Users } from './users'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/users" component={Users} />
        <Redirect to="/users" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
