/// <reference types="cypress" />

import { confirmationMsgLocator, emailLocator, loginSubmitButtonLocator, passwordLocator } from "../dataConstants/data"

export const loginPageElements = {
    
    registerPageButton: 'a[href="/register"]'
}

export class loginPage {

    enterEmail(email) {
        cy.get(emailLocator).type(email)
    }

    enterPassword(password) {
        cy.get(passwordLocator).type(password)
    }

    clickOnLoginButton() {
        cy.get(loginSubmitButtonLocator).click()
    }

    clickOnRegisterButton() {
        cy.get(loginPageElements.registerPageButton).click()
    }

    incorrectCredentialMsgValidation(incorrectCredentialMsg) {
        cy.get(confirmationMsgLocator).should('have.text', incorrectCredentialMsg)
    }
}

export const onLoginPage = new loginPage()