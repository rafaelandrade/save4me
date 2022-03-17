/// <reference types="cypress" />

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Welcome to Next.js!')
    cy.contains('Documentation')
    cy.contains('Learn')
    cy.contains('Examples')
    cy.contains('Deploy')
  })
})
