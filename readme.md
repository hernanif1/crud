## CRUD

This is an example how to create a crud.
The main idea is to simulate a real scenario where is necessary a backend and frontend for a single project.
If the backend needs to split into micro service the next step would be put the backend into another monorepo.
If the frontend needs to split into multi-apps the next step would be put the frontend into another monorepo.

- For small team (up to 5 people)
- Working as a fullstack team

To see more about design choices check the README of each project

- [./backend/README.md](/backend)
- [./frontend/README.md](https://github.com/hernanif1/crud/tree/master/frontend)
- [./shared/README.md](https://github.com/hernanif1/crud/tree/master/shared)

Install all projects

```sh
yarn install
```

Run backend

```sh
// root folder
cd backend
yarn start
```

Run frontend

```sh
// root folder
cd frontend
yarn start
```

Run storybooks

```sh
// root folder
cd shared/components
yarn start
```

Run prisma pscale connection

```sh
pscale connect tutorial-db initial-setup --port 3309
pscale connect tutorial-db shadow --port 3310
```

## TODO

- [ ] add badges coverage
- [ ] create images to explain architecture
- [ ] add semantic release version control
