import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded
} from 'express'
import { accounts } from './api/accounts'
import logger from 'morgan'

const app = express()
const port = process.env.PORT || 4000
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(logger('dev'))
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

accounts(app)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`App listening at http://localhost:${port}`)
})

export default app
