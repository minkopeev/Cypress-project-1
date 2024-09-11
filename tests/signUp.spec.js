/// <reference types="cypress" />

import { onLoginPage } from '../support/pageObjects/loginPage.js';
import { onSignUpPage } from '../support/pageObjects/signUpPage.js';
import { baseUrl, email, password, username } from '../support/dataConstants/data.js';
import { faker } from '@faker-js/faker';

let userData; // Declare a variable to hold user data

describe('SignUp', () => {

    const fakeEmail = faker.internet.email();
    const fakeFirstName = faker.person.firstName();
    const fakeLastName = faker.person.lastName();
    const fakeUsername = fakeFirstName.concat(fakeLastName);
    const fakeEmailNotUsed = faker.internet.email();
    const fakeUsernameNotUsed = faker.word.adjective({ length: { min: 8, max: 9 }}) 

    before(() => {
        // Initialize the variable before the tests run
        userData = {
            userCreatedMsg: 'Регистрацията е успешна!',
            userDuplicatedMsg: 'Регистрацията неуспешна!',
            wrongEmail: 'a',
            wrongUsername: 'a',
            wrongPass: 'abv12345678',
            passNotUsed: 'Qwerty12345678',
            noNumberPass: 'Qwertyuiopasd!',
            noUpperLetterPass: 'qwerty12345!',
            noLowerLetterPass: 'QWERTY12345!',
            noSymbolPass: 'Qwerty12345678',
            wrongPassConfirmation: 'b',
            emailMsg: 'Моля напишете имейл',
            userMsg: 'Потребителско име трябва да е поне 5 знака',
            passMsg:'Паролата трябва да бъде най-малко 12 знака и да съдържа поне една главна, една малка буква, число и символ.',
            passConfMsg:'Невалидно задаване на Потвърди паролата'

        };
    });

    it('Register new user', () => {
        // Open base URL and navigate to sign up page
        cy.visit(baseUrl)
        onLoginPage.clickOnRegisterButton()
        onSignUpPage.enterEmail(fakeEmail)
        onSignUpPage.enterName(fakeUsername)
        onSignUpPage.enterPassword(password)
        onSignUpPage.enterPasswordCofirmation(password)
        onSignUpPage.clickOnSubmitButton()
        onSignUpPage.validateRegistrationMsg(userData.userCreatedMsg)
    })

    it('Duplicate Username', () => {
        // Open base URL and navigate to sign up page
        cy.visit(baseUrl)
        onLoginPage.clickOnRegisterButton()
        onSignUpPage.enterEmail(faker.internet.email())
        onSignUpPage.enterName(fakeUsername)
        onSignUpPage.enterPassword(password)
        onSignUpPage.enterPasswordCofirmation(password)
        onSignUpPage.clickOnSubmitButton()
        onSignUpPage.validateRegistrationMsg(userData.userDuplicatedMsg)
        
    })

    it('Duplicate Email', () => {
        // Open base URL and navigate to sign up page
        cy.visit(baseUrl)
        onLoginPage.clickOnRegisterButton()
        onSignUpPage.enterEmail(fakeEmail)
        onSignUpPage.enterName(fakeUsernameNotUsed)
        onSignUpPage.enterPassword(password)
        onSignUpPage.enterPasswordCofirmation(password)
        onSignUpPage.clickOnSubmitButton()
        onSignUpPage.validateRegistrationMsg(userData.userDuplicatedMsg)
        
    })

    it('Insert wrong values in the fields, check msg, insert correct values, check msg is hidden', () => {
        // Open base URL and navigate to sign up page
        cy.visit(baseUrl)
        onLoginPage.clickOnRegisterButton()
        onSignUpPage.enterEmail(userData.wrongEmail)
        onSignUpPage.enterName(userData.wrongUsername)
        onSignUpPage.enterPassword(userData.wrongPass)
        onSignUpPage.enterPasswordCofirmation(userData.wrongPassConfirmation)
        onSignUpPage.clickOnSubmitButton()
        onSignUpPage.validateIncorrectEmailMsg(userData.emailMsg)
        onSignUpPage.validateIncorrectUserMsg(userData.userMsg)
        onSignUpPage.validateIncorrectPassMsg(userData.passMsg)
        onSignUpPage.validateIncorrectPassConfMsg(userData.passConfMsg)
        onSignUpPage.clearAllFields()
        onSignUpPage.enterEmail(email)
        onSignUpPage.enterName(username)
        onSignUpPage.enterPassword(password)
        onSignUpPage.enterPasswordCofirmation(password)
        onSignUpPage.hideIncorrectEmailMsg()
        onSignUpPage.hideIncorrectUserMsg()
        onSignUpPage.hideIncorrectPassMsg()
        onSignUpPage.hideIncorrectPassConfMsg()

    })

    it('Password rules validation', () => {
        // Open base URL and navigate to sign up page
        cy.visit(baseUrl)
        onLoginPage.clickOnRegisterButton()
        onSignUpPage.enterEmail(fakeEmailNotUsed)
        onSignUpPage.enterName(fakeUsernameNotUsed)

        // No lowercase letter scenario
        onSignUpPage.enterPassword(userData.noLowerLetterPass)
        onSignUpPage.enterPasswordCofirmation(userData.noLowerLetterPass)
        onSignUpPage.clickOnSubmitButton()
        onSignUpPage.validateIncorrectPassMsg(userData.passMsg)
        onSignUpPage.hideIncorrectEmailMsg()
        onSignUpPage.hideIncorrectUserMsg()
        onSignUpPage.hideIncorrectPassConfMsg()
        onSignUpPage.clearPassFields()

        // No uppercase letter scenario
        onSignUpPage.enterPassword(userData.noUpperLetterPass)
        onSignUpPage.validateIncorrectPassMsg(userData.passMsg)
        onSignUpPage.hideIncorrectEmailMsg()
        onSignUpPage.hideIncorrectUserMsg()
        onSignUpPage.hideIncorrectPassConfMsg()
        onSignUpPage.clearPassFields()

        // No number scenario
        onSignUpPage.enterPassword(userData.noNumberPass)
        onSignUpPage.validateIncorrectPassMsg(userData.passMsg)
        onSignUpPage.hideIncorrectEmailMsg()
        onSignUpPage.hideIncorrectUserMsg()
        onSignUpPage.hideIncorrectPassConfMsg()
        onSignUpPage.clearPassFields()

        // No symbol scenario
        onSignUpPage.enterPassword(userData.noSymbolPass)
        onSignUpPage.validateIncorrectPassMsg(userData.passMsg)
        onSignUpPage.hideIncorrectEmailMsg()
        onSignUpPage.hideIncorrectUserMsg()
        onSignUpPage.hideIncorrectPassConfMsg()
        onSignUpPage.clearPassFields()

        // Check that error msg dissapear with correct values
        onSignUpPage.enterPassword(password)
        onSignUpPage.enterPasswordCofirmation(password)
        onSignUpPage.hideIncorrectEmailMsg()
        onSignUpPage.hideIncorrectUserMsg()
        onSignUpPage.hideIncorrectPassMsg()
        onSignUpPage.hideIncorrectPassConfMsg()

    })

    it('Differen password confirmation', () => {
        // Open base URL and navigate to sign up page
        cy.visit(baseUrl)
        onLoginPage.clickOnRegisterButton()
        onSignUpPage.enterEmail(email)
        onSignUpPage.enterName(username)
        onSignUpPage.enterPassword(password)
        onSignUpPage.enterPasswordCofirmation(userData.passNotUsed)
        onSignUpPage.clickOnSubmitButton()
        onSignUpPage.validateIncorrectPassConfMsg(userData.passConfMsg)
        
    })

    it('Empty Field validation', () => {
        // Open base URL and navigate to sign up page
        cy.visit(baseUrl)
        onLoginPage.clickOnRegisterButton()
        // No value for email scenario
        onSignUpPage.enterName(username)
        onSignUpPage.enterPassword(password)
        onSignUpPage.enterPasswordCofirmation(password)
        onSignUpPage.clickOnSubmitButton()
        onSignUpPage.validateIncorrectEmailMsg(userData.emailMsg)
        onSignUpPage.clearAllFields()

        // No value for username scenario
        onSignUpPage.enterEmail(email)
        onSignUpPage.enterPassword(password)
        onSignUpPage.enterPasswordCofirmation(password)
        onSignUpPage.clickOnSubmitButton()
        onSignUpPage.validateIncorrectUserMsg(userData.userMsg)
        onSignUpPage.clearAllFields()

        // No value for password scenario
        onSignUpPage.enterEmail(email)
        onSignUpPage.enterName(username)
        onSignUpPage.enterPasswordCofirmation(password)
        onSignUpPage.clickOnSubmitButton()
        onSignUpPage.validateIncorrectPassMsg(userData.passMsg)
        onSignUpPage.clearAllFields()

        // No value for password confirmation scenario
        onSignUpPage.enterEmail(email)
        onSignUpPage.enterName(username)
        onSignUpPage.enterPassword(password)
        onSignUpPage.clickOnSubmitButton()
        onSignUpPage.validateIncorrectPassConfMsg(userData.passConfMsg)

    })

})