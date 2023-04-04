describe('service is available', () => {
  it('работает на localhost:3000', () => {
    cy.visit('http://localhost:3000')
  })
})