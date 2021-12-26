context('App', () => {
  beforeEach(() => {
    cy.intercept(`${Cypress.env('API_URL')}/accounts`, [])
    cy.visit('/users')
  })

  it('should render text', () => {
    cy.contains('Users')
    cy.contains('No users to display')
  })
})
