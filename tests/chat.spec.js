/// <reference types="cypress" />

import { baseUrl, confirmLoginMsg, createEventDate, createEventTime, email, logoutMsg, password, username } from "../support/dataConstants/data";
import { onChatPage } from "../support/pageObjects/chatPage";
import { onEventDetailsPage } from "../support/pageObjects/eventDetailsPage";
import { onEventDialog } from "../support/pageObjects/eventDialog";
import { onEventPage } from "../support/pageObjects/eventPage";
import { onLoginPage } from "../support/pageObjects/loginPage";

let userData; // Declare a variable to hold user data

describe('Chat', () => {

    before(() => {
        // Initialize the variable before the tests run
        userData = {
            imgUploadedMessage: 'Вие избрахте снимка.',
            coordinatesSelectionMessage: 'Вие избрахте координати.',
            eventConfirmationMsg: 'Успешно създаване на събитие.',
            adminMsg: 'Аз съм администратор #!$"%&?-_',
            moderatorMsg: 'Аз съм moderator4e #!$"%&?-_',
            adminChatMsg: 'асл плс #!$"%&?-_',
            moderatorChatMsg: 'Zdr, ko pr',
            moderatorChatMsgAdd: ' ole ole ole',
            moderatorChatMsgEdited: 'Zdr, ko pr ole ole ole',
            eventDeletedMsg: 'Събитието е изтрито успешно!',
        };
    });

    it('Login with admin, create event and add comment', () => {
        //Login
        cy.visit(baseUrl)
        onLoginPage.enterEmail(email)
        onLoginPage.enterPassword(password)
        onLoginPage.clickOnLoginButton()
        onEventPage.confirmLogin(confirmLoginMsg)
        
       
        //Create event
        onEventPage.createEvent()
        onEventDialog.addEventTitle('Тест на коментарите')
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation('Габрово')
        onEventDialog.addEventOrganizer('QA')
        onEventDialog.addEventShortDescr('Rocket chat')
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        cy.wait(2000)
        onEventDialog.clickSubmitButton()
        onEventPage.confirmEventCreation(userData.eventConfirmationMsg) 

        //Open the created event
        onEventPage.openEventDetails('Тест на коментарите')
        onEventDetailsPage.validateEventTitle('Тест на коментарите')
        cy.wait(1000)

        //Add admin comment and validate it
        onEventDetailsPage.addChatMsg(userData.adminMsg)
        onEventDetailsPage.validateChatMsg(username, userData.adminMsg)
        

    })

    it('Login with moderator, add comment,validate admin comment, delete own comment, start chat with admin', () => {
        //Login
        cy.visit(baseUrl)
        onLoginPage.enterEmail('Elody.Gottlieb99@gmail.com')
        onLoginPage.enterPassword(password)
        onLoginPage.clickOnLoginButton()
        onEventPage.confirmLogin(confirmLoginMsg)
        onEventPage.hooverOverLoginMsg()
        onEventPage.closeConfirmationMsg()
        onEventPage.confirmLoginAutoClose()
       
        //Open the event
        onEventPage.openEventDetails('Тест на коментарите')
        cy.wait(1000)

        //Add moderator comment and validate it
        onEventDetailsPage.addChatMsg(userData.moderatorMsg)
        onEventDetailsPage.validateChatMsg('BonnieRempel', userData.moderatorMsg) 
        
        //Validate admin comment is visible
        onEventDetailsPage.validateChatMsg(username, userData.adminMsg)  

        //Delete moderator comment
        onEventDetailsPage.deleteChatMsg('BonnieRempel', userData.moderatorMsg)

        //Navigate to chat page and sed msg to admin
        onEventDetailsPage.navigateToChat()
        onChatPage.openChatWithAnotherUser('GeorgiIvanov1')
        cy.wait(1000)
        onChatPage.addChatMsg(userData.moderatorChatMsg)
        onChatPage.validateChatMsg('BonnieRempel', userData.moderatorChatMsg)

        //Edit msg
        onChatPage.editChatMsg('BonnieRempel', userData.moderatorChatMsg, userData.moderatorChatMsgAdd)
        onChatPage.validateChatMsg('BonnieRempel', userData.moderatorChatMsgEdited)

    })

    it('Login with admin, send msg to moderator, delete event, delete chat msg', () => {
        //Login
        cy.visit(baseUrl)
        onLoginPage.enterEmail(email)
        onLoginPage.enterPassword(password)
        onLoginPage.clickOnLoginButton()
        onEventPage.confirmLogin(confirmLoginMsg)
        onEventPage.hooverOverLoginMsg()
        onEventPage.closeConfirmationMsg()
        onEventPage.confirmLoginAutoClose()

        //Navigate to chat page and sed msg to moderator
        onEventDetailsPage.navigateToChat()
        onChatPage.openChatWithAnotherUser('BonnieRempel')
        cy.wait(1000)
        onChatPage.addChatMsg(userData.adminChatMsg)

        //Validate admin and moderator msg
        onChatPage.validateChatMsg('BonnieRempel', userData.moderatorChatMsgEdited)
        onChatPage.validateChatMsg('GeorgiIvanov1', userData.adminChatMsg)

        //Delete admin msg
        onChatPage.deleteChatMsg('GeorgiIvanov1', userData.adminChatMsg)

        onEventPage.navigateToAllEventsPage()
        onEventPage.editSelectedEvent('Тест на коментарите')
        onEventDialog.clickDeleteEventButton()
        onEventPage.confirmEventCreation(userData.eventDeletedMsg)

        //Logout admin
        onEventPage.logOutUser()
        onEventPage.confirmLogin(logoutMsg)

        //Login moderator
        cy.visit(baseUrl)
        onLoginPage.enterEmail('Elody.Gottlieb99@gmail.com')
        onLoginPage.enterPassword(password)
        onLoginPage.clickOnLoginButton()
        onEventPage.confirmLogin(confirmLoginMsg)
        
        //Open chat with admin user
        onEventDetailsPage.navigateToChat()
        onChatPage.openChatWithAnotherUser('GeorgiIvanov1')
        cy.wait(1000)
        
        //Delete moderator msg
        onChatPage.deleteChatMsg('BonnieRempel', userData.moderatorChatMsgEdited)

    })

    
    
    
})