import { Colors } from "../../src/types/colors";

describe('stack algorithm tests', () => {
  it('Кнопка добавления недоступна при пустом инпуте', () => {
    cy.visit('http://localhost:3000/stack');

    if (cy.get('input')) {
      cy.get('button').eq(1).should('be.disabled')
    }
  })

  it('Очистка стека', () => {
    cy.visit('http://localhost:3000/stack');

    cy.get('input').type('1');
    cy.get('button').contains('Добавить').click();
    cy.get('input').type('2');
    cy.get('button').contains('Добавить').click();
    cy.get('input').type('3');
    cy.get('button').contains('Добавить').click();
    
    cy.wait(500)
    cy.get('button').contains('Очистить').click();

    cy.get('div[class*="circle_circle"]').should('not.exist')
  })

  it('Корректное добавление и удаление элемента', () => {
    cy.visit('http://localhost:3000/stack');
    cy.get('button').contains('Добавить').as('add')
    cy.get('button').contains('Удалить').as('remove')

    //Добавление

    cy.get('input').type('1');
    cy.get('@add').click();

    cy.get('div[class*="circle_circle"]').as('circle');
    cy.get('div[class*="circle_head"]').as('circle-head');
    cy.get('p[class*="circle_index"]').as('circle-index');

    cy.get('@circle')
      .eq(0)
      .should('contain', '1')
      .and("have.css", "border", Colors.changing);
    cy.get('@circle-head')
      .eq(0)
      .should('contain', 'top')
    cy.get('@circle-index')
      .eq(0)
      .should('contain', '0')

    cy.wait(500)

    cy.get('@circle')
      .eq(0)
      .should('contain', '1')
      .and("have.css", "border", Colors.default);
    cy.get('@circle-head')
      .eq(0)
      .should('contain', 'top')
    cy.get('@circle-index')
      .eq(0)
      .should('contain', '0')

    cy.get('input').type('2');
    cy.get('@add').click();

    cy.get('@circle')
      .eq(1)
      .should('contain', '2')
      .and("have.css", "border", Colors.changing);
    cy.get('@circle-head')
      .eq(1)
      .should('contain', 'top')
    cy.get('@circle-index')
      .eq(1)
      .should('contain', '1')

    cy.get('@circle-head')
      .eq(0)
      .should('contain', '');

    cy.wait(500)

    cy.get('@circle')
      .eq(1)
      .should('contain', '2')
      .and("have.css", "border", Colors.default);
    cy.get('@circle-head')
      .eq(1)
      .should('contain', 'top')
    cy.get('@circle-index')
      .eq(1)
      .should('contain', '1')


    //Удаление

    cy.get('@remove').click();

    cy.get('@circle')
      .eq(1)
      .should('contain', '2')
      .and("have.css", "border", Colors.changing);
    
    cy.wait(500);

    cy.get('@circle')
      .eq(1)
      .should('not.exist')
    cy.get('@circle-head')
      .eq(0)
      .should('contain','top')
  })
})