import { Express, Request, Response } from 'express'
import prisma from '@crud/prisma'

const users = (app: Express) => {
  app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.users.findMany()
    res.json(users)
  })
}

export { users }
