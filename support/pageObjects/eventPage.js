/// <reference types="cypress" />

import { allEventsButton, confirmationMsgLocator, logoutButton, mapButton, menuButton, userManagmetButton } from "../dataConstants/data"
import { eventDetailsPageElements } from "./eventDetailsPage"

export const eventPageElements = {

createEventButton: '[class*="inline-flex"]',
eventBars: 'div.rounded-xl',
mapButton: '#navigation a[href="/map"]',
navigationBar: '#navigation',
createEventButton: '[data-testid="events-createEventButton"]',
editDetailsButtons: '#events-card-footerViewButton',
closeLoginMsgButton: 'button.absolute',
eventTitle: '#events-card-headerTitle',
viewEventButton: '#events-card-footerViewButton',
editEventButton: '#events-card-penIcon',
eventChatButton: '.lucide-message-circle',
eventMapButton: '.lucide-map-pin'

}

export class eventPage {

createEvent() {
    cy.get(eventPageElements.createEventButton).click()
}

assertCreateEventNotExist() {
    cy.get(eventPageElements.createEventButton).should('not.exist')
}

assertNewEvent() {
    cy.get(eventPageElements.eventBars).should('have.length',8)
}

countEvents() {
    return cy.get(eventPageElements.eventBars).then(($cnt) => {
        const eventCount = $cnt.length;
        cy.log(eventCount);
        return cy.wrap(eventCount);
    });
}

clickOnMapButton() {
    cy.get(mapButton).click()
}

openEventDetails(nameOfTheEvent) {
    cy.get(eventPageElements.eventBars).each(($el, index, $list) => {

        const eventName=$el.find(eventPageElements.eventTitle).text()
        if (eventName.includes(nameOfTheEvent))
        {
            cy.wrap($el).find(eventPageElements.viewEventButton).click()
            return false
        }
    })
}

editSelectedEvent(nameOfTheEvent) {
    cy.get(eventPageElements.eventBars).each(($el, index, $list) => {

        const eventName=$el.find(eventPageElements.eventTitle).text()
        if (eventName.includes(nameOfTheEvent))
        {
            cy.wrap($el).find(eventPageElements.editEventButton).click()
            return false
        }
    })
}

openEventDetailsUsingChatButton(nameOfTheEvent) {
    cy.get(eventPageElements.eventBars).each(($el, index, $list) => {

        const eventName=$el.find(eventPageElements.eventTitle).text()
        if (eventName.includes(nameOfTheEvent))
        {
            cy.wrap($el).find(eventPageElements.eventChatButton).click()
            return false
        }
    })
}

openEventOnMap(nameOfTheEvent) {
    cy.get(eventPageElements.eventBars).each(($el, index, $list) => {

        const eventName=$el.find(eventPageElements.eventTitle).text()
        if (eventName.includes(nameOfTheEvent))
        {
            cy.wrap($el).find(eventPageElements.eventMapButton).click()
            return false
        }
    })
}

confirmLogin(loginMsg) {
    cy.get(confirmationMsgLocator).should('have.text', loginMsg)
}

confirmLoginAutoClose() {
    cy.get(confirmationMsgLocator).should('not.exist')
}

hooverOverLoginMsg() {
    cy.get(confirmationMsgLocator).trigger('mouseover')
}

closeConfirmationMsg() {
    cy.get(eventPageElements.closeLoginMsgButton).click()

}

confirmEventCreation(eventMsg) {
    cy.get(confirmationMsgLocator).should('have.text', eventMsg)
}

navigateToAllEventsPage() {
    cy.get(allEventsButton).click()
}

logOutUser() {
    cy.get(menuButton).click()
    cy.get(logoutButton).click()
}

clickOnUserManagmentButton() {
    cy.get(menuButton).click()
    cy.get(userManagmetButton).click()
}

assertUserManagmentButtonNotExist() {
    cy.get(menuButton).click()
    cy.get(userManagmetButton).should('not.exist')
}

assertEditEventNotExistOnOthersEvent(eventName) {
    let eventFound = false
    cy.get(eventPageElements.eventBars).each(($el, index, $list) => {

        const eventName=$el.find(eventPageElements.eventTitle).text()
        if (eventName.includes(eventName))
        {
            eventFound = true
            cy.wrap($el).find(eventPageElements.editEventButton).should('not.exist')
            return false
        }
    }).then(() => {
        // Assert that the user was found after the loop completes
        expect(eventFound).to.be.true;
    });
    
}

assertEditEventButtonNotExist() {
    cy.get(eventDetailsPageElements.editEventButton).should('not.exist')
}

}

export const onEventPage = new eventPage()