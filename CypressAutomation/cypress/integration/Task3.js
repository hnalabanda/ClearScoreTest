///<reference types="Cypress"/>

describe('Automate ClearScore website-Test3',function(){
   
    //This test case is to check that the “We use cookies” notification is present when you load page the first time
    it('Verify "Get started" button is disabled when sign up page is loaded',function(){
        
        cy.visit("https://app.clearscore.com/signup")
       
        cy.get("button[data-id='submit']").should('be.disabled')
           
    })
    
    //This test case is to verify that "Get started" button remains disabled when country is selected without
    //entering user id
    it('Verify "Get started" button remains disabled when country is selected',function(){
        cy.get('#market').select('za')
              cy.get("button[data-id='submit']").should('be.disabled')
              cy.get("div[data-qa='error-message'] div[data-qa='text']").should('have.text','Required field')
           
    })

     //This test case is to verify that you cannot enter a blank string in email id field
    
    it('Verify emailid is required for sign up',function(){
        cy.verifyInvalidEmailID(" ")
                
    })

    //This test case enters a number of invalid email ids listed in InvalidEmail.json file
    it('Verify "Get Started" button is disabled for invalid email address',function(){
        cy.fixture('InvalidEmails.json').then(function(body)
        {
            
            body.email.forEach(function(eachEmail){
                cy.verifyInvalidEmailID(eachEmail)
            })
            
        })
              
    })

    //This test case is to check if an enabled Get Started button gets disabled when the email id is made invalid
   it('Verify "Get Started" button gets disabled when valid emailid is made invalid email address',function(){
        
        cy.get("#email").type("hn@gmail.com")
        cy.get("button[data-id='submit']").should('be.enabled')
        for(var i=0;i<10;i++){
            cy.get("#email").type("{leftarrow}")

        }
        cy.get("#email").type("{backspace}")
        cy.get("#email").type("{backspace}")
        cy.get("button[data-id='submit']").should('be.disabled')
        cy.get("#email").clear()
           
    })

     //This test case enters a number of valid email ids listed in ValidEmail.json file
    it('Verify "Get Started" button gets enabled for valid email address',function(){
        
        cy.fixture('ValidEmails.json').then(function(body)
        {
            
            body.email.forEach(function(eachEmail){
                cy.verifyValidEmailID(eachEmail)
            })
            
        })      
           
    })

     //This test case checks if a user is redirected to the Step 1 of the registration page after entering a valid email id
     //The correct country selected in Sign Up page should also be passed in the Step1 URL
    it('Verify clicking on "Get Started" button takes to Step 1 of registration passing correct country code',function(){
        let selOption=""  
        cy.get("#email").type("email@domain.com")
        cy.get('#market').select("za").then(function(option){
            selOption=option.val()
        })
        cy.get("button[data-id='submit']").click().then(function(){
            cy.url().should('include','step1/'+selOption)
        })
    
       
       
           
    })

   
   
})