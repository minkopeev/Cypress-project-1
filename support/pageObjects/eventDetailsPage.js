/// <reference types="cypress" />

import { allEventsButton, chatButton } from "../dataConstants/data"

export const eventDetailsPageElements = {

eventOrganizer: 'h3.font-semibold',
eventName: 'div[class*="pb-[1.rem]"] h2.text-lg',
shortDescr: 'div[class*="pb-[1.rem]"] p',
eventDate: '#event-eventDetailsComponent-cardFooter-calendarIcon span',
eventTime: '#event-eventDetailsComponent-cardFooter-clockIcon span',
eventAgeGroup: '#event-eventDetailsComponent-cardFooter-userIcon span',
eventLocation: '#event-eventDetailsComponent-cardFooter-MapIcon span',
eventLongDescr: '[data-testid="event-eventDescriptionComponent"] div.p-4',
eventCreator: '.grid-cols-2 span',
chatTextInputField: 'textarea[class*="ChatInput"]',
chatMsgRows: 'div[class*="css-owdgog-Message"]',
chatMsgName: 'span[class*="message-header-name "]',
chatMsgUsername: 'span[class*="message-header-username "]',
chatMsgText: 'div[class*="ec-box ec-message-body "]',
chatSendMsgButton: 'svg[class*="ChatInput"]',
chatMsgToolboxDelete: 'div[class*="ec-box ec-message-toolbox"] button:nth-of-type(6)',
chatMsgToolboxEdit: 'div[class*="ec-box ec-message-toolbox"] button:nth-of-type(5)',

editEventButton: 'svg[type="button"]',
mapButton: '#event-eventDetailsComponent-cardFooter-MapIcon .lucide-map-pin'


}

export class eventDetailsPage {

validateEventOrganizer(eventOrganizer) {
    cy.get(eventDetailsPageElements.eventOrganizer).should('have.text', eventOrganizer)
}

validateEventTitle(eventName) {
    cy.get(eventDetailsPageElements.eventName).should('have.text', eventName)
}

validateShortDescr(shortDescr) {
    cy.get(eventDetailsPageElements.shortDescr).should('have.text', shortDescr)
}

validateEventDate(eventDate) {
    cy.get(eventDetailsPageElements.eventDate).should('have.text', eventDate)
}

validateEventTime(eventTime) {
    cy.get(eventDetailsPageElements.eventTime).should('have.text', eventTime)
}

validateEventAgeGroup(eventAgeGroup) {
    cy.get(eventDetailsPageElements.eventAgeGroup).should('have.text', eventAgeGroup)
}

validateEventLocation(eventLocation) {
    cy.get(eventDetailsPageElements.eventLocation).should('have.text', eventLocation)
}

validateEventLongDescr(eventLongDescr) {
    cy.get(eventDetailsPageElements.eventLongDescr).should('contain.text', eventLongDescr)
}

validateEventCreator(eventCreator) {
    cy.get(eventDetailsPageElements.eventCreator).should('contain.text', "Създадено от:").should('contain.text', eventCreator)
}

clickEditEventButton() {
    cy.get(eventDetailsPageElements.editEventButton).click()
}

clickOnMapButton() {
    cy.get(eventDetailsPageElements.mapButton).click()
}

clickOnEventPageButton() {
    cy.get(allEventsButton).click()
}

addChatMsg(msgText) {
    cy.get(eventDetailsPageElements.chatTextInputField).type(msgText)
    cy.get(eventDetailsPageElements.chatSendMsgButton).click()
}

validateChatMsg(user, text) {
    let userFound = false; // Initialize a flag to track if the user is found
    
    cy.get(eventDetailsPageElements.chatMsgRows).each(($el, index, $list) => {
        const userName = $el.find(eventDetailsPageElements.chatMsgName).text();
        
        if (userName.includes(user)) {
            userFound = true; // Set the flag to true if the user is found
            cy.wrap($el).find(eventDetailsPageElements.chatMsgUsername).should('have.text', "@" + user);
            cy.wrap($el).find(eventDetailsPageElements.chatMsgText).should('have.text', text);
            return false;
        }
    }).then(() => {
        // Assert that the user was found after the loop completes
        expect(userFound).to.be.true;
    });
}

navigateToChat() {
    cy.get(chatButton).click()
}

deleteChatMsg(user, text) {
    let userFound = false; // Initialize a flag to track if the user is found
    
    cy.get(eventDetailsPageElements.chatMsgRows).each(($el, index, $list) => {
        const userName = $el.find(eventDetailsPageElements.chatMsgName).text()
     
        if (userName.includes(user)) {
            userFound = true; // Set the flag to true if the user is found
            cy.wrap($el).find(eventDetailsPageElements.chatMsgText).should('have.text', text)
            cy.wrap($el).find(eventDetailsPageElements.chatMsgToolboxDelete).click({ force: true })
            return false;
        }
    }).then(() => {
        // Assert that the user was found after the loop completes
        expect(userFound).to.be.true;
    });
}

assertEditEventButtonNotExist() {
    cy.get(eventDetailsPageElements.editEventButton).should('not.exist')
}

}
export const onEventDetailsPage = new eventDetailsPage()