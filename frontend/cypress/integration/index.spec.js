/// <reference types="cypress" />

describe('Index', () => {
  it('Should show the index page', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Save4Me')
    cy.get('input').type('Testando...').clear()
  })
})
