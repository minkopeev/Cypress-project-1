/// <reference types="cypress" />

import {confirmationMsgLocator, emailLocator, loginSubmitButtonLocator, passwordLocator } from "../dataConstants/data"

export const signUpPageElements = {
    
    username: 'input[name="username"]',
    confirmPassword: 'input[name="confirmPassword"]',
    loginPageButton: 'a[href="/"]',
    incorrectEmailMsg: '[id="registration-form-emailField-Error"]',
    incorrectUserMsg: '[id="registration-form-usernameField-Error"]',
    incorrectPassMsg: '[id="registration-form-passwordField-Error"]',
    incorrectPassConfirmationMsg: '[id="registration-form-confirmPasswordField-Error"]',

}

export class signUpPage {

    enterEmail(email) {
        cy.get(emailLocator).type(email)
    }

    enterName(username) {
        cy.get(signUpPageElements.username).type(username)
    }

    enterPassword(password) {
        cy.get(passwordLocator).type(password)
    }

    enterPasswordCofirmation(confirmPassword) {
        cy.get(signUpPageElements.confirmPassword).type(confirmPassword)
    }

    clickOnSubmitButton() {
        cy.get(loginSubmitButtonLocator).click()
    }

    validateRegistrationMsg(afterRegistrationMsg) {
        cy.get(confirmationMsgLocator).should('have.text', afterRegistrationMsg)
    }

    validateIncorrectEmailMsg(emailMsg) {
        cy.get(signUpPageElements.incorrectEmailMsg).should('have.text', emailMsg)
    }

    validateIncorrectUserMsg(userMsg) {
        cy.get(signUpPageElements.incorrectUserMsg).should('have.text', userMsg)
    }

    validateIncorrectPassMsg(passMsg) {
        cy.get(signUpPageElements.incorrectPassMsg).should('have.text', passMsg)
    }

    validateIncorrectPassConfMsg(passConfMsg) {
        cy.get(signUpPageElements.incorrectPassConfirmationMsg).should('have.text', passConfMsg)
    }

    hideIncorrectEmailMsg() {
        cy.get(signUpPageElements.incorrectEmailMsg).should('not.exist')
    }

    hideIncorrectUserMsg() {
        cy.get(signUpPageElements.incorrectUserMsg).should('not.exist')
    }

    hideIncorrectPassMsg() {
        cy.get(signUpPageElements.incorrectPassMsg).should('not.exist')
    }

    hideIncorrectPassConfMsg() {
        cy.get(signUpPageElements.incorrectPassConfirmationMsg).should('not.exist')
    }

    clearAllFields() {
        cy.get(emailLocator).clear()
        cy.get(signUpPageElements.username).clear()
        cy.get(passwordLocator).clear()
        cy.get(signUpPageElements.confirmPassword).clear()
    }

    clearPassFields() {
        cy.get(passwordLocator).clear()
        cy.get(signUpPageElements.confirmPassword).clear()
    }

}

export const onSignUpPage = new signUpPage()