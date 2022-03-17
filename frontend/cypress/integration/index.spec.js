/// <reference types="cypress" />

describe('Index', () => {
  it('Should show the index page', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Welcome to Next.js!')
    cy.contains('Documentation')
    cy.contains('Learn')
    cy.contains('Examples')
    cy.contains('Deploy')
  })
})
