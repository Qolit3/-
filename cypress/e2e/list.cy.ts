import { Colors } from "../../src/types/colors";

describe('list algorithm tests', () => {
  it('Кнопки обычного добавления, удаления и добавления по индексу недоступны при пустом инпуте', () => {
    cy.visit('http://localhost:3000/list');    
    cy.get('input').eq(0).clear();
    cy.get('button').contains('Добавить в head').parent().should('be.disabled');
    cy.get('button').contains('Добавить в tail').parent().should('be.disabled');
    cy.get('button').contains('Добавить по индексу').parent().should('be.disabled');
    cy.get('button').contains('Удалить по индексу').parent().should('be.disabled');
  })

  it('Проверка анимаций добавления и удаления в head', () => {
    cy.visit('http://localhost:3000/list'); 
    cy.get('input').eq(0).as('element-input');
    cy.get('button').contains('Добавить в head').as('head-add')
    cy.get('button').contains('Удалить из head').as('head-remove')
    
    cy.get('@element-input').type('1');
    cy.get('@head-add').click();

    cy.get('div[class*="circle_circle"]').as('circle');
    cy.get('div[class*="circle_head"]').as('circle-head');
    cy.get('div[class*="circle_tail"]').as('circle-tail');
    cy.get('p[class*="circle_index"]').as('circle-index');

    cy.get('@circle')
      .eq(0)
      .should('contain', '1')
      .and("have.css", "border", Colors.modified);
    cy.get('@circle-head')
      .eq(0)
      .should('contain', 'head')
    cy.get('@circle-tail')
      .eq(0)
      .should('contain', '')
    cy.get('@circle-index')
      .eq(0)
      .should('contain', '0')

    cy.wait(500);

    cy.get('@circle')
      .eq(0)
      .should("have.css", "border", Colors.default);
    
    cy.wait(500)
    
    cy.get('@element-input').clear().type('2');
    cy.get('@head-add').click();

    cy.get('@circle-head')
      .contains('div[class*="circle_circle"]', '2')
      .should('contain', '2')
      .and('have.css', 'border', Colors.changing)
    
    cy.wait(500);
    
    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border', Colors.modified)
    cy.get('@circle-head')
      .eq(0)
      .should('contain', 'head')
    cy.get('@circle-index')
      .eq(0)
      .should('contain', '0')
    cy.get('@circle-tail')
      .eq(0)
      .should('contain', '')

    cy.wait(500);

    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border', Colors.default)
      
    cy.get('@circle-index')
      .eq(1)
      .should('contain', '1')
    cy.get('@circle-tail')
      .eq(1)
      .should('contain', 'tail')

    //Удаление

    cy.get('@head-remove').click()

    cy.get('@circle')
      .eq(0)
      .should('contain', '')
    cy.get('@circle-tail')
      .contains('div[class*="circle_circle"]', '2')
      .should('contain', '2')
      .and('have.css', 'border', Colors.changing)

    cy.wait(500)

    cy.get('@circle')
      .eq(0)
      .should('contain', '1')
    cy.get('@circle-head')
      .eq(0)
      .should('contain', 'head')
    cy.get('@circle-index')
      .eq(0)
      .should('contain', '0')
    cy.get('@circle-tail')
      .eq(0)
      .should('contain', '')
  })

  it('Проверка анимаций добавления и удаления в tail', () => {
    cy.visit('http://localhost:3000/list'); 
    cy.get('input').eq(0).as('element-input');
    cy.get('button').contains('Добавить в tail').as('tail-add')
    cy.get('button').contains('Удалить из tail').as('tail-remove')
    
    cy.get('@element-input').type('1');
    cy.get('@tail-add').click();

    cy.get('div[class*="circle_circle"]').as('circle');
    cy.get('div[class*="circle_head"]').as('circle-head');
    cy.get('div[class*="circle_tail"]').as('circle-tail');
    cy.get('p[class*="circle_index"]').as('circle-index');

    cy.get('@circle')
      .eq(0)
      .should('contain', '1')
      .and("have.css", "border", Colors.modified);
    cy.get('@circle-head')
      .eq(0)
      .should('contain', 'head')
    cy.get('@circle-tail')
      .eq(0)
      .should('contain', '')
    cy.get('@circle-index')
      .eq(0)
      .should('contain', '0')

    cy.wait(500);

    cy.get('@circle')
      .eq(0)
      .should("have.css", "border", Colors.default);
    
    cy.wait(500)
    
    cy.get('@element-input').clear().type('2');
    cy.get('@tail-add').click();
    
    cy.wait(500);
    
    cy.get('@circle')
      .eq(1)
      .should('have.css', 'border', Colors.modified)
    cy.get('@circle-head')
      .eq(1)
      .should('contain', '')
    cy.get('@circle-index')
      .eq(1)
      .should('contain', '1')
    cy.get('@circle-tail')
      .eq(1)
      .should('contain', 'tail')
    
    cy.wait(500);

    cy.get('@circle')
      .eq(1)
      .should('have.css', 'border', Colors.default);
    
    cy.get('@element-input').clear().type('3');
    cy.get('@tail-add').click();

    cy.get('@circle-head')
      .eq(1)
      .contains('div', '3')
      .should('contain', '3')
      .and('have.css', 'border', Colors.changing)
  
    cy.wait(500)

    cy.get('@circle')
      .eq(2)
      .should('have.css', 'border', Colors.modified)
      .and('contain', '3')
    cy.get('@circle-head')
      .eq(2)
      .should('contain', '')
    cy.get('@circle-index')
      .eq(2)
      .should('contain', '2')
    cy.get('@circle-tail')
      .eq(2)
      .should('contain', 'tail')
    
    cy.wait(500)
    
    cy.get('@circle')
      .eq(2)
      .should('have.css', 'border', Colors.default)

    //Удаление

    cy.get('@tail-remove').click()

    cy.get('@circle')
      .eq(2)
      .should('contain', '')
    cy.get('@circle-tail')
      .contains('div[class*="circle_circle"]', '3')
      .should('contain', '3')
      .and('have.css', 'border', Colors.changing)

    cy.wait(500)

    cy.get('@circle')
      .eq(1)
      .should('contain', '2')
    cy.get('@circle-head')
      .eq(1)
      .should('contain', '')
    cy.get('@circle-index')
      .eq(1)
      .should('contain', '1')
    cy.get('@circle-tail')
      .eq(1)
      .should('contain', 'tail')
  })

  it('Добавление и удаление по индексу', () => {
    cy.visit('http://localhost:3000/list'); 
    cy.get('input').eq(0).as('element-input');
    cy.get('input').eq(1).as('index-input');
    cy.get('button').contains('Добавить по индексу').as('index-add')
    cy.get('button').contains('Удалить по индексу').as('index-remove')
    
    cy.get('@element-input').type('1');
    cy.get('@index-input').type('0');
    cy.get('@index-add').click();

    cy.get('div[class*="circle_circle"]').as('circle');
    cy.get('div[class*="circle_head"]').as('circle-head');
    cy.get('div[class*="circle_tail"]').as('circle-tail');
    cy.get('p[class*="circle_index"]').as('circle-index');

    cy.get('@circle')
      .eq(0)
      .should('contain', '1')
      .and("have.css", "border", Colors.modified);
    cy.get('@circle-head')
      .eq(0)
      .should('contain', 'head')
    cy.get('@circle-tail')
      .eq(0)
      .should('contain', '')
    cy.get('@circle-index')
      .eq(0)
      .should('contain', '0')

    cy.wait(500);

    cy.get('@circle')
      .eq(0)
      .should("have.css", "border", Colors.default);
    
    cy.wait(500)
    
    cy.get('@element-input').clear().type('2');
    cy.get('@index-input').clear().type('1');
    cy.get('@index-add').click();

    cy.get('@circle-head')
      .contains('div[class*="circle_circle"]', '2')
      .should('contain', '2')
      .and('have.css', 'border', Colors.changing)
    
    cy.wait(500);
    
    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border', Colors.changing)

    cy.wait(500)

    cy.get('@circle')
      .eq(1)
      .should('have.css', 'border', Colors.modified)
    cy.get('@circle-head')
      .eq(1)
      .should('contain', '')
    cy.get('@circle-index')
      .eq(1)
      .should('contain', '1')
    cy.get('@circle-tail')
      .eq(1)
      .should('contain', 'tail')

    cy.wait(500);

    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border', Colors.default)
    cy.get('@circle')
      .eq(1)
      .should('have.css', 'border', Colors.default)
    
    cy.get('@element-input').clear().type('3');
    cy.get('@index-input').clear().type('1');
    cy.get('@index-add').click();

    cy.get('@circle-head')
      .eq(0)
      .contains('div[class*="circle_circle"]', '3')
      .should('contain', '3')
      .and('have.css', 'border', Colors.changing)
    
    cy.wait(500);
    
    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border', Colors.changing)
    cy.get('@circle-head')
      .eq(1)
      .contains('div[class*="circle_circle"]', '3')
      .should('contain', '3')
      .and('have.css', 'border', Colors.changing)

    cy.wait(500)

    cy.get('@circle')
      .eq(1)
      .should('have.css', 'border', Colors.modified)
    cy.get('@circle-head')
      .eq(1)
      .should('contain', '')
    cy.get('@circle-index')
      .eq(1)
      .should('contain', '1')
    cy.get('@circle-tail')
      .eq(1)
      .should('contain', '')

    cy.wait(500);

    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border', Colors.default)
    cy.get('@circle')
      .eq(1)
      .should('have.css', 'border', Colors.default)
    cy.get('@circle-tail')
      .eq(2)
      .should('contain', 'tail')
    cy.get('@circle-index')
      .eq(2)
      .should('contain', '2')
    
    //Удаление

    cy.get('@index-input').clear().type('1');
    cy.get('@index-remove').click()

    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border', Colors.changing)

    cy.wait(500)

    cy.get('@circle')
      .eq(1)
      .should('have.css', 'border', Colors.changing)

    cy.wait(500)

    cy.get('@circle')
      .eq(1)
      .should('contain', '')
    cy.get('@circle-tail')
      .eq(1)
      .contains('div[class*="circle_circle"]', '3')
      .should('contain', '3')
      .and('have.css', 'border', Colors.changing)

    cy.wait(500)

    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border', Colors.default)
    cy.get('@circle')
      .eq(1)
      .should('have.css', 'border', Colors.default)
      .and('contain', '2')
    cy.get('@circle-index')
      .eq(1)
      .should('contain', '1')
    cy.get('@circle-tail')
      .eq(1)
      .should('contain', 'tail')
  })
})