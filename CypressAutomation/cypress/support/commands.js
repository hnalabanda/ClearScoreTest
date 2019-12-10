// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
Cypress.Commands.add("verifyInvalidEmailID", (email) => {
    cy.get("#email").type(email)
    //the error message was only displayed when you come out of the text box
    cy.get("div[id='root']").click()
        if(email===" "){
            cy.get("div[data-qa='error-message'] div[data-qa='text']").should('have.text','Required field') 
        }
        else{
            cy.get("div[data-qa='error-message'] div[data-qa='text']").should('have.text','Please enter a valid email address')
        }
  
    
    
    
    
    cy.get("button[data-id='submit']").should('be.disabled')
    //clear for the next input
    cy.get("#email").clear()
})

Cypress.Commands.add("verifyValidEmailID", (email) => {
    cy.get("#email").type(email)
    //the error message was only displayed when you come out of the text box
   // cy.get("div[id='root']").click()
   
        cy.get("div[data-qa='error-message'] div[data-qa='text']").should('not.exist')
    
    
    
    
    cy.get("button[data-id='submit']").should('be.enabled')
    //clear for the next input
    cy.get("#email").clear()

})
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
