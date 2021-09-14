const accounts = (app: any) => {
  let currentId = 1
  const mockDatabase = [
    {
      name: 'Email One',
      birthday: new Date('1986-12-31'),
      email: 'email1@example.com',
      id: '' + currentId++
    },
    {
      name: 'Email Two',
      birthday: new Date('1984-02-12'),
      email: 'email2@example.com',
      id: '' + currentId++
    },
    {
      name: 'Email Three',
      birthday: new Date('1989-10-31'),
      email: 'email3@example.com',
      id: '' + currentId++
    },
    {
      name: 'Email Four',
      birthday: new Date('1990-11-25'),
      email: 'email4@example.com',
      id: '' + currentId++
    },
    {
      name: 'Email Five',
      birthday: new Date('1986-01-01'),
      email: 'email5@example.com',
      id: '' + currentId++
    }
  ]

  app.get('/accounts', (req: any, res: any) => {
    res.json(mockDatabase)
  })

  app.post('/accounts', (req: any, res: any) => {
    const id = '' + currentId++
    mockDatabase.push({
      name: req.body.name,
      birthday: new Date(req.body.birthday),
      email: req.body.email,
      id
    })
    res.json({ success: true, id })
  })

  app.get('/accounts/:id', (req: any, res: any) => {
    const account = mockDatabase.find(account => account.id === req.params.id)
    if (account) {
      res.json(account)
      return
    }
    res.json({ error: true, message: 'account.not.found' })
  })

  app.delete('/accounts/:id', (req: any, res: any) => {
    let removed = null
    for (let i = 0; i < mockDatabase.length; i++) {
      const account = mockDatabase[i]
      if (account.id === req.params.id) {
        removed = mockDatabase.splice(i, 1)
        break
      }
    }
    const success = !!removed
    res.json({ success, removed })
  })

  app.put('/accounts/:id', (req: any, res: any) => {
    let toUpdate = null
    for (let i = 0; i < mockDatabase.length; i++) {
      const account = mockDatabase[i]
      if (account.id === req.params.id) {
        toUpdate = account
        break
      }
    }
    const success = !!toUpdate
    if (toUpdate) {
      toUpdate.name = req.body.name
      toUpdate.birthday = new Date(req.body.birthday)
      toUpdate.email = req.body.email
    }
    res.json({ success, updated: toUpdate })
  })
}

export { accounts }
