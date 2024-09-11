/// <reference types="cypress" />

import { baseUrl, confirmLoginMsg, createEventDate, createEventTime, editEventDate, editEventTime, email, logoutMsg, password } from "../support/dataConstants/data";
import { faker } from '@faker-js/faker';
import { onLoginPage } from '../support/pageObjects/loginPage.js';
import { onSignUpPage } from '../support/pageObjects/signUpPage.js';
import { eventPage, onEventPage } from "../support/pageObjects/eventPage.js";
import { onEventDialog } from "../support/pageObjects/eventDialog.js";
import { onEventDetailsPage } from "../support/pageObjects/eventDetailsPage.js";
import { onMapPage } from "../support/pageObjects/mapPage.js";
import { onUsersPage } from "../support/pageObjects/usersPage.js";

let userData; // Declare a variable to hold user data

describe('User Managment', () => {

    const fakeEmail = faker.internet.email();
    const fakeFirstName = faker.person.firstName();
    const fakeLastName = faker.person.lastName();
    const fakeUsername = fakeFirstName.concat(fakeLastName);

    before(() => {
        // Initialize the variable before the tests run
        userData = {
            userCreatedMsg: 'Регистрацията е успешна!',
            eventConfirmationMsg: 'Успешно създаване на събитие.',
            savedChangesMsg: 'Промените са направени успешно!',
            changesNotSavedMsg: 'Възникна грешка!',
            moderatorEmail: 'Osvaldo38@gmail.com',
            eventDeletedMsg: 'Събитието е изтрито успешно!',
            userDeletedMsg: 'Потребителят е изтрит успешно!'
        };
    });

it('Create User, login, open event details', () => {
    //Test Cases: 186, 187, 179
    // Open base URL, navigate to sign up page and create account
    cy.visit(baseUrl)
    onLoginPage.clickOnRegisterButton()
    onSignUpPage.enterEmail(fakeEmail)
    onSignUpPage.enterName(fakeUsername)
    onSignUpPage.enterPassword(password)
    onSignUpPage.enterPasswordCofirmation(password)
    onSignUpPage.clickOnSubmitButton()
    onSignUpPage.validateRegistrationMsg(userData.userCreatedMsg)
   
    //Login with the created account
    onLoginPage.enterEmail(fakeEmail)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)
    onEventPage.hooverOverLoginMsg()
    onEventPage.closeConfirmationMsg()
    onEventPage.confirmLoginAutoClose()

    //Assert create event and user managment buttons are hidden
    onEventPage.assertCreateEventNotExist()
    onEventPage.assertUserManagmentButtonNotExist()

    //Log Out
    cy.reload()
    onEventPage.logOutUser()
    onEventPage.confirmLogin(logoutMsg)

    //Log in with admin user and create event
    onLoginPage.enterEmail(email)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)
    onEventPage.hooverOverLoginMsg()
    onEventPage.closeConfirmationMsg()

    onEventPage.createEvent()
    onEventDialog.addEventTitle('abv')
    onEventDialog.addEventDate(createEventDate)
    onEventDialog.addEventTime(createEventTime)
    onEventDialog.addEventLocation('abv')
    onEventDialog.addEventOrganizer('abv')
    onEventDialog.addEventShortDescr('abv')
    onEventDialog.addEventImg("eventEdit.jpg")
    onEventDialog.addEventCoordinates()
    cy.wait(2000)

    //Submit Event
    onEventDialog.clickSubmitButton()
    onEventPage.confirmEventCreation(userData.eventConfirmationMsg)
    
    //Log out admin user
    onEventPage.logOutUser()
    onEventPage.confirmLogin(logoutMsg)

    //Login with normal user, open event and validate details
    onLoginPage.enterEmail(fakeEmail)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)
    cy.wait(2000)
    onEventPage.assertEditEventButtonNotExist()

    onEventPage.openEventDetails('abv')
    onEventDetailsPage.validateEventTitle('abv')
    onEventDetailsPage.validateEventDate(createEventDate)
    onEventDetailsPage.validateEventTime(createEventTime)
    onEventDetailsPage.validateEventLocation('abv')
    onEventDetailsPage.validateEventOrganizer('abv')
    onEventDetailsPage.validateShortDescr('abv')
    
})

it('Navigation to map, event and chat', () => {
    //Log in with normal user
    cy.visit(baseUrl)
    onLoginPage.enterEmail(fakeEmail)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)

    //Open event details using the chat button
    onEventPage.openEventDetailsUsingChatButton('abv')
    onEventDetailsPage.validateEventTitle('abv')

    //Open events page
    onEventDetailsPage.clickOnEventPageButton()

    //Open map page using event map button
    onEventPage.openEventOnMap('abv')
    cy.wait(3000)
    onMapPage.checkEventImageExist()
    onMapPage.checkEventTitle('abv')
    onMapPage.checkEventDate(createEventDate)
    onMapPage.checkEventTime(createEventTime)
    onMapPage.clickOnEventDetaislLink()
    onEventDetailsPage.validateEventTitle('abv')
   
    
})

it('Login with admin user, check users are displayed correct, change user role, check edit other users event', () => {
    //Test Cases: 180, 192, 191, 182, 179
    //Open base URL, navigate to sign up page and validate all type of users displayed correct
    cy.visit(baseUrl)
    onLoginPage.enterEmail(email)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)
    onEventPage.clickOnUserManagmentButton()
    onUsersPage.assertAllInfoForUser('Gertrude_Boehm@hotmail.com','EffieRunolfsdottir','Администратор')
    onUsersPage.assertAllInfoForUser('Elody.Gottlieb99@gmail.com','BonnieRempel','Модератор')
    onUsersPage.assertAllInfoForUser('Itzel.Strosin49@hotmail.com','AlaynaSchoen','Потребител')

    //Select the normal user and change it to admin
    onUsersPage.changeUserRole(fakeEmail, 'Модератор')
    onUsersPage.confirmSavedChanges(userData.savedChangesMsg)
    onEventPage.navigateToAllEventsPage()

    //Log out admin and Log in moderator user
    onEventPage.logOutUser()
    onLoginPage.enterEmail(fakeEmail)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)
    onEventPage.hooverOverLoginMsg()
    onEventPage.closeConfirmationMsg()
    onEventPage.confirmLoginAutoClose()

    //Open Edit event dialog and save/delete
    onEventPage.assertEditEventNotExistOnOthersEvent('abv')

    //Check that user managmen button is hidden
    onEventPage.assertUserManagmentButtonNotExist()
})

it('Log in with new moderator, create and edit event', () => {
    //Test cases: 188, 189
    //Log in with new moderator user
    cy.visit(baseUrl)
    onLoginPage.enterEmail(fakeEmail)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)

    //Create event
    onEventPage.createEvent()
    onEventDialog.addEventTitle('zxc')
    onEventDialog.addEventDate(createEventDate)
    onEventDialog.addEventTime(createEventTime)
    onEventDialog.addEventLocation('zxc')
    onEventDialog.addEventOrganizer('zxc')
    onEventDialog.addEventShortDescr('zxc')
    onEventDialog.addEventImg("event2.jpg")
    onEventDialog.addEventCoordinates()
    cy.wait(1000)

    //Submit Event
    onEventDialog.clickSubmitButton()
    onEventPage.confirmEventCreation(userData.eventConfirmationMsg)

    //Validate event details
    onEventPage.openEventDetails('zxc')
    onEventDetailsPage.validateEventTitle('zxc')
    onEventDetailsPage.validateEventDate(createEventDate)
    onEventDetailsPage.validateEventTime(createEventTime)
    onEventDetailsPage.validateEventLocation('zxc')
    onEventDetailsPage.validateEventOrganizer('zxc')
    onEventDetailsPage.validateShortDescr('zxc')

    //Edit event 
    onEventPage.navigateToAllEventsPage()
    onEventPage.editSelectedEvent('zxc')
    onEventDialog.clearAllFields()
    onEventDialog.addEventTitle('asd')
    onEventDialog.addEventDate(editEventDate)
    onEventDialog.addEventTime(editEventTime)
    onEventDialog.addEventLocation('asd')
    onEventDialog.addEventOrganizer('asd')
    onEventDialog.addEventShortDescr('asd')
    onEventDialog.addEventImg("event.jpg")
    onEventDialog.addEventCoordinates()
    cy.wait(3000)
    onEventDialog.clickSaveEventButton()
    cy.wait(3000)

    //Validate event details
    onEventPage.openEventDetails('asd')
    onEventDetailsPage.validateEventTitle('asd')
    onEventDetailsPage.validateEventDate(editEventDate)
    onEventDetailsPage.validateEventTime(editEventTime)
    onEventDetailsPage.validateEventLocation('asd')
    onEventDetailsPage.validateEventOrganizer('asd')
    onEventDetailsPage.validateShortDescr('asd') 
})

it('Log in with second moderator, validate cant edit/delete other moderator event', () => {
    //Test cases: 191
    //Log in with new moderator user
    cy.visit(baseUrl)
    onLoginPage.enterEmail(userData.moderatorEmail)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)

    //Open event dialog
    onEventPage.openEventDetails('asd')
    onEventDetailsPage.assertEditEventButtonNotExist()

})

it('Check that admin can edit moderators events', () => {
    //Test cases: 194
    //Log in with new moderator user
    cy.visit(baseUrl)
    onLoginPage.enterEmail(email)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)
    onEventPage.hooverOverLoginMsg()
    onEventPage.closeConfirmationMsg()
    onEventPage.confirmLoginAutoClose()

    //Open event dialog
    onEventPage.editSelectedEvent('asd')
    onEventDialog.addEventTitle('fgh') 
    onEventDialog.clickSaveEventButton()

    //BUG WORKAROUND
    cy.reload()

    //Validate event details
    onEventPage.openEventDetails('fgh')
    onEventDetailsPage.validateEventTitle('fgh')
    
    //Delete events
    onEventDetailsPage.clickEditEventButton()
    onEventDialog.clickDeleteEventButton()
    onEventPage.confirmEventCreation(userData.eventDeletedMsg)

    onEventPage.editSelectedEvent('abv')
    onEventDialog.clickDeleteEventButton()
    onEventPage.confirmEventCreation(userData.eventDeletedMsg)
})

it('Moderator can delete own event', () => {
    //Test cases: 190
    //Log in with moderator
    cy.visit(baseUrl)
    onLoginPage.enterEmail(fakeEmail)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)

    //Create event
    onEventPage.createEvent()
    onEventDialog.addEventTitle('123')
    onEventDialog.addEventDate(createEventDate)
    onEventDialog.addEventTime(createEventTime)
    onEventDialog.addEventLocation('123')
    onEventDialog.addEventOrganizer('123')
    onEventDialog.addEventShortDescr('123')
    onEventDialog.addEventImg("eventEdit.jpg")
    onEventDialog.addEventCoordinates()
    cy.wait(2000)

    //Submit Event
    onEventDialog.clickSubmitButton()
    onEventPage.confirmEventCreation(userData.eventConfirmationMsg)

    //Delete event
    onEventPage.editSelectedEvent('123')
    onEventDialog.clickDeleteEventButton()
    onEventPage.confirmEventCreation(userData.eventDeletedMsg)

})

it('Admin not exist in user list, delete user', () => {
    //Test cases: 181, 184
    //Log in with moderator
    cy.visit(baseUrl)
    onLoginPage.enterEmail(email)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)

    //Open users list and check admin not exist
    onEventPage.clickOnUserManagmentButton()
    onUsersPage.assertAdminNotExistInList(email)
    
    //Delete user and click cancel
    onUsersPage.deleteUser(fakeEmail)
    cy.on('window:confirm', (t) => {
        //assertions
        expect(t).to.contains('Сигурни ли сте, че искате да изтриете потребителя?');
        return false;
      })

})

it('Delete user', () => {
    //Test cases: 183
    //Log in with moderator
    cy.visit(baseUrl)
    onLoginPage.enterEmail(email)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)

    //Open users list
    onEventPage.clickOnUserManagmentButton()
    
    //Delete user
    onUsersPage.deleteUser(fakeEmail)
    onUsersPage.assertDeletionMsg(userData.userDeletedMsg)
})

it('Admin not exist in user list, moderator and normal user cant access managment', () => {
    //Test cases: 181, 183
    //Log in with moderator
    cy.visit(baseUrl)
    onLoginPage.enterEmail(userData.moderatorEmail)
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)

    //Open user managment link
    cy.visit('http://localhost:5173/management')
    cy.wait(2000)
    onUsersPage.assertUserPageNotOpen()
    
    //Logout moderator
    onEventPage.logOutUser()
    onEventPage.confirmLogin(logoutMsg)

    //Login normal user
    onLoginPage.enterEmail('Itzel.Strosin49@hotmail.com')
    onLoginPage.enterPassword(password)
    onLoginPage.clickOnLoginButton()
    onEventPage.confirmLogin(confirmLoginMsg)

    //Open user managment link
    cy.visit('http://localhost:5173/management')
    cy.wait(2000)
    onUsersPage.assertUserPageNotOpen()

})

})