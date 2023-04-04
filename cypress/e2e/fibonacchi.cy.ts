describe('fibonacci algorithm test', () => {
  it('кнопка недоступна при пустом инпуте', () => {
    cy.visit('http://localhost:3000/fibonacci');
    
    if(cy.get('input')) {
      cy.get('button').last().should('be.disabled')
    }
  })

  it('Корректная генерация чисел', () => {
    cy.visit('http://localhost:3000/fibonacci');

    cy.get('input').type('19');
    cy.get('button').last().click();

    cy.get('div[class*="circle_circle"]').as('circle');
    cy.get("@circle").eq(0).should("contain", "1")
    cy.get("@circle").eq(1).should("contain", "1")
    cy.get("@circle").eq(2).should("contain", "2")
    cy.get("@circle").eq(3).should("contain", "3")
    cy.get("@circle").eq(4).should("contain", "5")
    cy.get("@circle").eq(5).should("contain", "8")
    cy.get("@circle").eq(6).should("contain", "13")
    cy.get("@circle").eq(7).should("contain", "21")
    cy.get("@circle").eq(8).should("contain", "34")
    cy.get("@circle").eq(9).should("contain", "55")
    cy.get("@circle").eq(10).should("contain", "89")
    cy.get("@circle").eq(11).should("contain", "144")
    cy.get("@circle").eq(12).should("contain", "233")
    cy.get("@circle").eq(13).should("contain", "377")
    cy.get("@circle").eq(14).should("contain", "610")
    cy.get("@circle").eq(15).should("contain", "987")
    cy.get("@circle").eq(16).should("contain", "1597")
    cy.get("@circle").eq(17).should("contain", "2584")
    cy.get("@circle").eq(18).should("contain", "4181")
    cy.get("@circle").eq(19).should("contain", "6765")
    
    
  })
})