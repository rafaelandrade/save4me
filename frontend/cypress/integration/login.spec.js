/// <reference types="cypress" />

describe('[login] Test case', () => {
  it('Should log in', () => {
    cy.intercept('POST', '**/saveforme/login', {
      statusCode: 200,
    }).as('SaveForme Login')

    cy.visit('http://localhost:3000/login')

    cy.contains('Save4Me')

    cy.get('input[id="email-input"]').type('example@example.com')
    cy.get('input[id="password-input"]').type('example@example.com')

    cy.get('div[id="show-password"]').click()
    cy.get('div[id="show-password"]').click()

    cy.contains('Sign in or sign up').click()
  })
})
