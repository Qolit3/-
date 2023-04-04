import { Colors } from "../../src/types/colors";


describe('string algorithm tests', () => {
  it('кнопка недоступна при пустом инпуте', () => {
    cy.visit('http://localhost:3000/recursion');
    
    if(cy.get('input')) {
      cy.get('button').last().should('be.disabled')
    }
  })

  it('Корректный разворот', () => {
    cy.visit('http://localhost:3000/recursion');

    cy.get('input').type('1234');
    cy.get('button').last().click();

    cy.get('div[class*="circle_circle"]').as('circle');

    cy.get("@circle")
      .eq(0)
      .should("contain", "1") 
      .and("have.css", "border", Colors.changing);
    cy.get("@circle")
      .eq(1)
      .should("contain", "2") 
      .and("have.css", "border", Colors.default);
    cy.get("@circle")
      .eq(2)
      .should("contain", "3") 
      .and("have.css", "border", Colors.default);
    cy.get("@circle")
      .eq(3)
      .should("contain", "4") 
      .and("have.css", "border", Colors.changing);  
    
    cy.wait(1000);

    cy.get("@circle")
      .eq(0)
      .should("contain", "4") 
      .and("have.css", "border", Colors.modified);
    cy.get("@circle")
      .eq(1)
      .should("contain", "2") 
      .and("have.css", "border", Colors.changing);
    cy.get("@circle")
      .eq(2)
      .should("contain", "3") 
      .and("have.css", "border", Colors.changing);
    cy.get("@circle")
      .eq(3)
      .should("contain", "1") 
      .and("have.css", "border", Colors.modified);

    cy.wait(1000);

    cy.get("@circle")
      .eq(0)
      .should("contain", "4") 
      .and("have.css", "border", Colors.modified);
    cy.get("@circle")
      .eq(1)
      .should("contain", "3") 
      .and("have.css", "border", Colors.modified);
    cy.get("@circle")
      .eq(2)
      .should("contain", "2") 
      .and("have.css", "border", Colors.modified);
    cy.get("@circle")
      .eq(3)
      .should("contain", "1") 
      .and("have.css", "border", Colors.modified);
  })
})