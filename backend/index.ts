import express, { json, urlencoded } from 'express'
import { AccountHandler } from './AccountHandler'
import logger from 'morgan'

const app = express()
const port = process.env.PORT || 5050
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(logger('dev'))
app.use((_req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

AccountHandler(app)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.error(`App listening at http://localhost:${port}`)
})

export default app
