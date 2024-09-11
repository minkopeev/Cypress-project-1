/// <reference types="cypress" />

import { onLoginPage } from '../support/pageObjects/loginPage.js';
import { baseUrl, confirmLoginMsg, email, logoutMsg, password } from '../support/dataConstants/data';
import { onEventPage } from '../support/pageObjects/eventPage.js';

let userData; // Declare a variable to hold user data

describe('Login', () => {

    before(() => {
        // Initialize the variable before the tests run
        userData = {
            email: 'incorrect@gmail.com',
            password: 'Qc123456789qc!',
            incorrectPassOrEmail: 'Грешен имейл или парола!'
        };
    });

    it('Login and wait msg to close', () => {
        cy.visit(baseUrl)
        onLoginPage.enterEmail(email)
        onLoginPage.enterPassword(password)
        onLoginPage.clickOnLoginButton()
        onEventPage.confirmLogin(confirmLoginMsg)
        cy.wait(5000)
        onEventPage.confirmLoginAutoClose()

    })
    
    it('Login and manually close msg, then logout', () => {
        cy.visit(baseUrl)
        onLoginPage.enterEmail(email)
        onLoginPage.enterPassword(password)
        onLoginPage.clickOnLoginButton()
        onEventPage.confirmLogin(confirmLoginMsg)
        onEventPage.hooverOverLoginMsg()
        onEventPage.closeConfirmationMsg()
        onEventPage.confirmLoginAutoClose()
        onEventPage.logOutUser()
        onEventPage.confirmLogin(logoutMsg)

    })

    it('Login with incorrect password', () => {
        cy.visit(baseUrl)
        onLoginPage.enterEmail(userData.email)
        onLoginPage.enterPassword(password)
        onLoginPage.clickOnLoginButton()
        onLoginPage.incorrectCredentialMsgValidation(userData.incorrectPassOrEmail)
    
    })

    it('Login with incorrect email', () => {
        cy.visit(baseUrl)
        onLoginPage.enterEmail(email)
        onLoginPage.enterPassword(userData.password)
        onLoginPage.clickOnLoginButton()
        onLoginPage.incorrectCredentialMsgValidation(userData.incorrectPassOrEmail)
    
    })

    it('Login with incorrect email and password', () => {
        cy.visit(baseUrl)
        onLoginPage.enterEmail(userData.email)
        onLoginPage.enterPassword(userData.password)
        onLoginPage.clickOnLoginButton()
        onLoginPage.incorrectCredentialMsgValidation(userData.incorrectPassOrEmail)
    
    })
    
})