describe('login', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get("#email > input").type("silvan.wiedmer@kyburz-switzerland.ch")
    cy.get("#password > input").type("Test123")
    cy.get("#login").click()
  })
})