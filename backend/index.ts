import express, { json, urlencoded } from 'express'
import cors from 'cors'
import logger from 'morgan'
import { accounts } from './api/accounts'

const app = express()
const port = process.env.PORT || 4000
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(cors())

accounts(app)

app.listen(port, () => {
  console.info(`App listening at http://localhost:${port}`)
})

export default app
