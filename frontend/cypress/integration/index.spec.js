/// <reference types="cypress" />

describe('Index', () => {
  it('Should show the index page', () => {
    cy.intercept('POST', '**/saveforme', {
      fixture: 'saveforme.json',
      statusCode: 200,
    }).as('SaveForme')

    cy.visit('http://localhost:3000/')

    cy.contains('Save4Me')
    cy.get('input').type('Testando...').clear()
    cy.contains('New link').click()

    cy.get('input[id="link-input"]').type('https://google.com')
    cy.get('input[id="title-input"]').type('Google')
    cy.get('input[id="tags-input"]').type('google, navegador, internet')

    cy.contains('Add link').click()
    cy.contains('New link').click()
    cy.contains('Cancel').click()

    cy.contains('Github').trigger('mouseover')
    cy.get('.edit-wrapper').should('be.visible').click()

    cy.get('.tooltip').trigger('mouseover')

    cy.contains('Edit link').click()

    cy.contains('Github').trigger('mouseover')
    cy.get('.trash-wrapper').should('be.visible').click()

    cy.get('input').type('Google').type('{enter}')
    cy.get('input').clear().type('{enter}')
  })
})
