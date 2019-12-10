///<reference types="Cypress"/>

describe('Automate ClearScore website-Test1',function(){
   
//This test case is to check that the “We use cookies” notification is present
it('Verify that "We use cookies" notification is present the first time',function(){
    
    cy.visit("https://www.clearscore.com/")

    //get the div tag that displays the notification
    //if the div is present then verify that the message 'We use cookies to improve your experience'
    // is displayed
    cy.get("div[class^='cookieNotice']").should('have.length',1).then(function(body){
        if (body.find("p").length > 0) {   //evaluates as true*/
           cy.get("div[class^='cookieNotice'] p")           
            .should('contain','We use cookies to improve your experience.')
        }
    })
  
})

//The test case below verifies that clicking on the "No problem" button closes the notification
it('Verify that  "We use cookies" notification can be dismissed',function(){
  //Verify that no cookies have been set at this point
    cy.getCookies().should('be.empty')
    
    //click on the "No problem" button to close the notification
    cy.get("div[class^='cookieNotice'] > div > button").click();

    //checking if the cookieNotice div message continues to exist
    cy.get("div[class^='cookieNotice']").should('not.exist')
  
    //Cypress clears cookies by default,we want to preserve this cookie for our next step
    Cypress.Cookies.preserveOnce('CS_ACCEPT_COOKIES')

})

//The test case below verifies that clicking on the "No problem" button sets appropriate cookies
it('Verify that dismissing the notification sets cookies',function(){
   // Verifying that a cookie has been set 
   cy.getCookies().should('have.length', 1).then(function(cookies){
   // the  cookie should have the name 'CS_ACCEPT_COOKIES' with the value='true'
    expect(cookies[0]).to.have.property('name', 'CS_ACCEPT_COOKIES')
    expect(cookies[0]).to.have.property('value', 'true')
    //Cypress clears cookies by default,we want to preserve this cookie for our next step
    Cypress.Cookies.preserveOnce('CS_ACCEPT_COOKIES')
})
   
})

//The test case below verifies that after clicking the  "No problem" button 
//the cookie notification will no longer appear
it('Verify "We use cookies" notification does not reappear',function(){
    //Verifying that cookie notification does not reappear
    cy.visit("https://www.clearscore.com/")
    cy.get("div[class^='cookieNotice']")
    .should('have.length',0)
    cy.clearCookies()
  
})

})