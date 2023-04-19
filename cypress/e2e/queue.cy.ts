import { Colors } from "../../src/types/colors";
import { circle, head, tail } from "../constants/constants";

describe('queue algorithm tests', () => {
  it('Кнопка добавления недопступна при пустом инпуте', () => {
    cy.visit('queue');
    
    if(cy.get('input')) {
      cy.get('button').eq(1).should('be.disabled')
    }
  })

  it('Корректное добавление и удаление элементов', () => {
    cy.visit('queue');
    cy.get('button').contains('Добавить').as('add')
    cy.get('button').contains('Удалить').as('remove')

    cy.get('input').type('1');
    cy.get('@add').click();

    cy.get(circle).as('circle');
    cy.get(head).as('circle-head');
    cy.get(tail).as('circle-tail');

    cy.get('@circle')
      .eq(0)
      .should('contain', '1')
      .and("have.css", "border", Colors.changing);
    cy.get('@circle-head')
      .eq(0)
      .should('contain', 'head')
    cy.get('@circle-tail')
      .eq(0)
      .should('contain', 'tail')

    cy.wait(500)

    cy.get('@circle')
      .eq(0)
      .should('contain', '1')
      .and("have.css", "border", Colors.default);

    cy.get('input').type('2');
    cy.get('@add').click();

    cy.get('@circle')
      .eq(1)
      .should('contain', '2')
      .and("have.css", "border", Colors.changing);
    cy.get('@circle-head')
      .eq(1)
      .should('contain', '')
    cy.get('@circle-tail')
      .eq(1)
      .should('contain', 'tail')

    cy.get('@circle-head')
      .eq(0)
      .should('contain', 'head')
    cy.get('@circle-tail')
      .eq(0)
      .should('contain', '')

    cy.wait(500)

    cy.get('@circle')
      .eq(1)
      .should('contain', '2')
      .and("have.css", "border", Colors.default);   
      
    cy.get('input').type('3');
    cy.get('@add').click();

    cy.wait(500);

    cy.get('@remove').click();

    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border', Colors.changing)

    cy.wait(500);
    
    cy.get('@circle')
      .eq(0)
      .should('contain', '')
    cy.get('@circle-head')
      .eq(0)
      .should('contain', '')
    cy.get('@circle-head')
      .eq(1)
      .should('contain', '')
  })

  it('Очистка очереди', () => {
    cy.visit('queue');
    cy.get('button').contains('Добавить').as('add')
    cy.get('button').contains('Очистить').as('clear')

    cy.get('input').type('1');
    cy.get('@add').click();

    cy.get(circle).as('circle');
    
    cy.wait(500);

    cy.get('input').type('2');
    cy.get('@add').click();

    cy.wait(500);

    cy.get('input').type('3');
    cy.get('@add').click();

    cy.wait(500);

    cy.get('@clear').click();

    cy.get('@circle')
      .should('contain', '')
  })
})