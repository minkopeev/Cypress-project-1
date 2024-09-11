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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';

import { baseUrl, confirmLoginMsg } from "./dataConstants/data"
import { onLoginPage } from '../support/pageObjects/loginPage.js';
import { onEventPage } from './pageObjects/eventPage.js';


Cypress.Commands.add('login', (emailLogin, passwordLogin) => 
{
    cy.session([emailLogin, passwordLogin], () => 
    {
        cy.visit('/')
        onLoginPage.enterEmail(emailLogin)
        onLoginPage.enterPassword(passwordLogin)
        onLoginPage.clickOnLoginButton()
        onEventPage.confirmLogin(confirmLoginMsg)
    })
})