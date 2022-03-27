/// <reference types="cypress" />

describe('Index', () => {
  it('Should show the index page', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Save4Me')
    cy.get('input').type('Testando...').clear()
    cy.contains('New link').click()

    cy.get('input[id="link-input"]').type('https://google.com')
    cy.get('input[id="title-input"]').type('Google')
    cy.get('input[id="tags-input"]').type('google, navegador, internet')

    cy.contains('Add link').click()
    cy.contains('Cancel').click()

    cy.get('input').type('Google').type('{enter}')
    cy.get('input').clear().type('{enter}')
  })
})
