import express, { json, urlencoded } from 'express'
import { accounts } from './api/accounts'
import logger from 'morgan'

const app = express()
const port = process.env.PORT || 8080
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(logger('dev'))
app.use((_req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

accounts(app)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

export default app
