/// <reference types="cypress" />

import { allEventsButton } from "../dataConstants/data"

export const mapPageElements = {

googleMessage: 'span[style*="color: rgba"]',
dismissButton: 'button[class="dismissButton"]',
mapPin: 'div[role="button"]',

//Event details
image: 'img[alt="Event-Image"]',
title: 'div.gm-style-iw-d div:nth-child(2) ',
date: 'div.gm-style-iw-d div:nth-child(3) ',
time: 'div.gm-style-iw-d div:nth-child(4) ',
linkToEventDetails: 'div.gm-style-iw-d a'

}

export class mapPage {

checkMessage(googleMessage) {
    cy.get(mapPageElements.googleMessage).should('contain.text', googleMessage)
}

dismissMessage() {
    cy.get(mapPageElements.dismissButton).click()
}

checkPin(eventCount) {
    cy.get(mapPageElements.mapPin).should('have.length',eventCount)
}

clickOnEventsPageButton() {
    cy.get(allEventsButton).click()
}

checkEventImageExist() {
    cy.get(mapPageElements.image).should('exist')
}

checkEventTitle(eventTitle) {
    cy.get(mapPageElements.title).should('have.text', 'Заглавие: ' + eventTitle)
}

checkEventDate(eventDate) {
    cy.get(mapPageElements.date).should('have.text', 'Дата: ' + eventDate)
}

checkEventTime(eventTime) {
    cy.get(mapPageElements.time).should('have.text', 'Час: ' + eventTime)
}

clickOnEventDetaislLink() {
    cy.get(mapPageElements.linkToEventDetails).click()
}

}

export const onMapPage = new mapPage()