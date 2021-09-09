## Styles guide

- Types should be always singular
- Component Interfaces should have the same name as the components (easier to export)
- Instead of using `redux` or `context` I implemented a `cache invalidation` strategy which in my opinion seem to be the right choice since there's no data being shared but only refetch of data, it makes easier and cleaner to handle the data flow, but also possible possible to implement other data state management.
- all folders should be lower case (easier to maintain)
- architecture based on feature folders (other possibilities mvc, domain driven, atomic design, )
- monorepo architecture because the intention is to simulate a single small team working in this project (up to 5 people)

## TODO

- [ ] add index in all folders
- [ ] add cypress
- [ ] review ci unit tests and e2e tests
- [ ] add /api in api calls to make it clear the division between front/back url (proxy)
- [ ] move components folder to shared (storybook)
- [ ] replace bootstrap by styled-components + tailwind
- [ ] copy style guides from my previous project
- [ ] Implement log tool
- [ ] Analytics tool
