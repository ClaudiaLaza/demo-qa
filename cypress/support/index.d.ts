/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Add employee
     * @example
     * cy.addEmployee(employee)
     */
    addEmployee(employee: object): Chainable<Subject>;
  }
}
