context('App', () => {
  beforeEach(() => {
    cy.visit('/users')
  })

  it('should render text', () => {
    cy.contains('Users')
  })
})
