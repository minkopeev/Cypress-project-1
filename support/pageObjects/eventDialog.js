/// <reference types="cypress" />

import { confirmationMsgLocator } from "../dataConstants/data"

export const eventDialogElements = {

//Field elements
eventTitle: '#event-form-titleField',
eventDate: '#event-form-dateField-button',
eventTime: '#event-form-timeField',
eventLocation: '#event-form-locationField',
eventAgeGroup: '#event-form-ageGroupField',
eventOrganizer: '#event-form-organizerField',
eventShortDescr: '#event-form-shortDescriptionField',
eventImgSelectionButton: 'input[type="file"][accept]',
eventImgButton: '#event-form-imageField',
eventLongDescr: '#event-form-descriptionField',
coordinatesButton: '#event-form-coordinateButton',
coordinatesConfirmationButton: '#createEvent-map-coordinateButton',

//Buttons
createEventButton: '#event-form-submitButton',
cancelEventButton:'#event-form-cancelButton',
closeEventDialogButton: 'svg[class*="lucide-x"]',
saveEventButton: '#event-form-saveButton',
deleteEventButton: '#event-form-deleteButton',

//Alert elements
alertTitle: '#event-form-titleField-Error',
alertDate: '#event-form-dateField-Error',
alertTime: '#event-form-timeField-Error',
alertLocation: '#event-form-locationField-Error',
alertCoordinates: '#event-form-coordinateButton-Error',
alertOrganizer: '#event-form-organizerField-Error',
alertShortDescr: '#event-form-shortDescriptionField-Error',
alertImg: '#event-form-imageField-Error',

//Calendar elements
calendar: '#event-form-dateField-calendar',
calendarRightArrow: 'svg[class*="lucide-chevron-right"]',
calendarMonthYear: 'div[class*="text-sm font-medium"]',
calendarDays: 'button[name="day"]',

}



export class eventDialog {

    clickSubmitButton() {
        cy.get(eventDialogElements.createEventButton).click()
    }

    clickCancelButton() {
        cy.get(eventDialogElements.cancelEventButton).click()
    }

    clickCloseButton() {
        cy.get(eventDialogElements.closeEventDialogButton).click({force: true})
    }

    clickSaveEventButton() {
        cy.get(eventDialogElements.saveEventButton).click()
    }

    clickDeleteEventButton() {
        cy.get(eventDialogElements.deleteEventButton).click()
    }
    
    addEventTitle(eventTitle) {
        cy.get(eventDialogElements.eventTitle).type(eventTitle)
    }

    addEventDate(eventDate) {
        let month
        let monthYear
        const [year, monthText, day] = eventDate.split('-')

        switch (monthText) {
            case '01':
                month = 'January'
                break;

            case '02':
                month = 'February'
                break;

            case '03':
                month = 'March'
                break;

            case '04':
                month = 'April'
                break;

            case '05':
                month = 'May'
                break;

            case '06':
                month = 'June'
                break;

            case '07':
                month = 'July'
                break;

            case '08':
                month = 'August'
                break;

            case '09':
                month = 'September'
                break;

            case '10':
                month = 'October'
                break;

            case '11':
                month = 'November'
                break;

            case '12':
                month = 'December'
                break;
        
            default:
                break;
        }
        monthYear = month + ' ' + year
        cy.get(eventDialogElements.eventDate).click()

        const checkMontheAndYear = () => {
            cy.get(eventDialogElements.calendar).each(($el, index, $list) => {
                const curentMonthAndYear=$el.find(eventDialogElements.calendarMonthYear).text()
                if (curentMonthAndYear.includes(monthYear)){
                    return
                }
                cy.get(eventDialogElements.calendarRightArrow).click()
                checkMontheAndYear()
            })
        }
        checkMontheAndYear()
        cy.contains(eventDialogElements.calendarDays, Number(day)).click()
    }

    addEventImg(img){
        cy.get(eventDialogElements.eventImgSelectionButton).attachFile(img)
    }

    addEventCoordinates(){
        cy.get(eventDialogElements.coordinatesButton).click()
        cy.get(eventDialogElements.coordinatesConfirmationButton).click()
    }

    confirmationMsg(uploadMsg) {
        cy.get(confirmationMsgLocator).should('have.text', uploadMsg)
    }

    addEventTime(eventTime) {
        cy.get(eventDialogElements.eventTime).type(eventTime)
    }

    addEventLocation(eventLocation) {
        cy.get(eventDialogElements.eventLocation).type(eventLocation)
    }

    addEventAgeGroup(eventAgeGroup) {
        cy.get(eventDialogElements.eventAgeGroup).type(eventAgeGroup)
    }

    addEventOrganizer(eventOrganizer) {
        cy.get(eventDialogElements.eventOrganizer).type(eventOrganizer)
    }

    addEventShortDescr(eventShortDescr) {
        cy.get(eventDialogElements.eventShortDescr).type(eventShortDescr)
    }

    addEventLongDescr(eventLongDescr) {
        cy.get(eventDialogElements.eventLongDescr).type(eventLongDescr)
    }

    alertMsgTitle(alerTitle) {
        cy.get(eventDialogElements.alertTitle).should('have.text', alerTitle)
    }

    alertMsgDate(alertDate) {
        cy.get(eventDialogElements.alertDate).should('have.text', alertDate)
    }

    alertMsgTime(alertTime) {
        cy.get(eventDialogElements.alertTime).should('have.text', alertTime)
    }

    alertMsgLocation(alertLocation) {
        cy.get(eventDialogElements.alertLocation).should('have.text', alertLocation)
    }

    alertMsgCoordinates(alertCoordinates) {
        cy.get(eventDialogElements.alertCoordinates).should('have.text', alertCoordinates)
    }

    alertMsgOrganizer(alertOrganizer) {
        cy.get(eventDialogElements.alertOrganizer).should('have.text', alertOrganizer)
    }

    alertMsgImg(alertImg) {
        cy.get(eventDialogElements.alertImg).should('have.text', alertImg)
    }

    alertMsgShortDescr(alertShortDescr) {
        cy.get(eventDialogElements.alertShortDescr).should('have.text', alertShortDescr)
    }

    clearAllFields() {
        cy.get(eventDialogElements.eventTitle).clear()
        cy.get(eventDialogElements.eventTime).clear()
        cy.get(eventDialogElements.eventLocation).clear()
        cy.get(eventDialogElements.eventAgeGroup).clear()
        cy.get(eventDialogElements.eventOrganizer).clear()
        cy.get(eventDialogElements.eventShortDescr).clear()
        cy.get(eventDialogElements.eventLongDescr).clear()
    }

}

export const onEventDialog = new eventDialog()