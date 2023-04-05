describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('');
  })

  it('Открывается на главной странице по умолчанию',() => {
    cy.contains('Вдохновлено школами, в которых не учили алгоритмам')
  })

  it('Открывает страницу "Строка"', () => {
    cy.visit('');
    cy.get('a[href="/recursion"').click()
    cy.contains('Развернуть');
  })

  it('Октрывает страницу "Последовательность Фибоначчи"', () => {
    cy.visit('');
    cy.get('a[href="/fibonacci"').click()
    cy.contains('Рассчитать');
  })

  it('Октрывает страницу "Сортирровка массива"', () => {
    cy.visit('');
    cy.get('a[href="/sorting"').click()
    cy.contains('Новый массив');
  })

  it('Октрывает страницу "Стек"', () => {
    cy.visit('');
    cy.get('a[href="/stack"').click()
    cy.contains('Стек');
  })

  it('Октрывает страницу "Очередь"', () => {
    cy.visit('');
    cy.get('a[href="/queue"').click()
    cy.contains('Очередь');
  })

  it('Октрывает страницу "Связаный список"', () => {
    cy.visit('');
    cy.get('a[href="/list"').click()
    cy.contains('Связный список');
  })
})