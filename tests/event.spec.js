/// <reference types="cypress" />

import { faker } from '@faker-js/faker';
import { baseUrl, confirmLoginMsg, createEventAge, createEventDate, createEventLocation, createEventLongDescr, createEventOrganizer, createEventShortDescr, createEventTime, createEventTitle, editEventAge, editEventDate, editEventLocation, editEventLongDescr, editEventOrganizer, editEventShortDescr, editEventTime, editEventTitle, email, password, username } from '../support/dataConstants/data';
import { onEventPage } from '../support/pageObjects/eventPage';
import { onMapPage } from '../support/pageObjects/mapPage';
import { onEventDialog } from '../support/pageObjects/eventDialog';
import { onEventDetailsPage } from '../support/pageObjects/eventDetailsPage';

let userData; // Declare a variable to hold user data

describe('Event', () => {

    const eventFieldOver30 = faker.string.nanoid({ min: 31, max: 31 })
    const eventFieldOver100 = faker.string.nanoid({ min: 101, max: 101 })
    const eventFieldOver500 = faker.string.nanoid({ min: 501, max: 501 })
    const eventFieldOver1600 = faker.string.nanoid({ min: 1601, max: 1601 })
    const eventIncorrectTimeFormat = faker.string.nanoid({ min: 1, max: 10 })

    const eventField30 = faker.string.nanoid({ min: 30, max: 30 })
    const eventField100 = faker.string.nanoid({ min: 100, max: 100 })
    const eventField500 = faker.string.nanoid({ min: 500, max: 500 })
    const eventField1600 = faker.string.nanoid({ min: 1600, max: 1600 })
    const eventMaxSymbolsDate = '2025-04-14'

    before(() => {
        // Initialize the variable before the tests run
        userData = {
            message: 'load Google Maps correctly.',
            emptyTitle: 'Моля въведете заглавие',
            emptyDate: 'Моля въведете дата',
            emptyTime: 'Моля въведете час',
            emptyLocation: 'Моля въведете локация',
            emptyCoordinates: 'Моля въведете координати',
            emptyOrganizer: 'Моля въведете организатор',
            emptyShortDescr: 'Моля въведете кратко описание',
            emptyImg: 'Моля въведете снимка',
            over30SymbolsAlert: 'Надвишавате максималния брой символи, който е 30',
            over100SymbolsAlert: 'Надвишавате максималния брой символи, който е 100',
            over500SymbolsAlert: 'Надвишавате максималния брой символи, който е 500',
            over1600SymbolsAlert: 'Надвишавате максималния брой символи, който е 1600',
            timeFormatAlert: 'Часа трябва да е във формат ЧЧ:ММ',
            imgUploadedMessage: 'Вие избрахте снимка.',
            coordinatesSelectionMessage: 'Вие избрахте координати.',
            eventConfirmationMsg: 'Успешно създаване на събитие.',
            eventChangesSavedMsg: 'Успешно запазване на промените.',
            eventDeletedMsg: 'Събитието е изтрито успешно!',
            tooBigImgMsg: 'Файлът е прекалено голям. Максимален размер 3MB',
            wrongImgformat: 'Файлът трябва да е в един от следните формати (.jpg,.jpeg,.png,.webp).'

        };
    });

    beforeEach(()=>{
        cy.login(email,password)
    })
 
    it('Check empty fields allerts and cancel event button', () => {
        //
        cy.visit('/')
        onEventPage.createEvent()
        onEventDialog.clickSubmitButton()

        //Check empty fields allert
        onEventDialog.alertMsgTitle(userData.emptyTitle)
        onEventDialog.alertMsgDate(userData.emptyDate)
        onEventDialog.alertMsgTime(userData.emptyTime)
        onEventDialog.alertMsgLocation(userData.emptyLocation)
        onEventDialog.alertMsgCoordinates(userData.emptyCoordinates)
        onEventDialog.alertMsgOrganizer(userData.emptyOrganizer)
        onEventDialog.alertMsgShortDescr(userData.emptyShortDescr)
        onEventDialog.alertMsgImg(userData.emptyImg)
        onEventDialog.clickCancelButton()

    })

    it('Check over maximum symbols allerts, wrong date format and close dialog button', () => {
        cy.visit('/')
        onEventPage.createEvent()

        //Add field data
        onEventDialog.addEventTitle(eventFieldOver100)
        onEventDialog.addEventTime(eventIncorrectTimeFormat)
        onEventDialog.addEventLocation(eventFieldOver100)
        onEventDialog.addEventAgeGroup(eventFieldOver30)
        onEventDialog.addEventOrganizer(eventFieldOver100)
        onEventDialog.addEventShortDescr(eventFieldOver500)
        onEventDialog.addEventLongDescr(eventFieldOver1600)

        onEventDialog.clickSubmitButton()
        
        //Check alert mesages
        onEventDialog.alertMsgTitle(userData.over100SymbolsAlert)
        //TO DO check all field msg

        onEventDialog.clickCloseButton()

    })
    
    it('Create new event with maximum symbols', () => {
        cy.visit('/')
        onEventPage.createEvent()

        //Add field data
        onEventDialog.addEventTitle(eventField100)
        onEventDialog.addEventDate(eventMaxSymbolsDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation(eventField100)
        onEventDialog.addEventAgeGroup(eventField30)
        onEventDialog.addEventOrganizer(eventField100)
        onEventDialog.addEventShortDescr(eventField500)
        onEventDialog.addEventLongDescr(eventField1600)
        onEventDialog.addEventImg("event.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        cy.wait(2000)

        //Submit Event
        onEventDialog.clickSubmitButton()
        onEventPage.confirmEventCreation(userData.eventConfirmationMsg)

        //Open Event
        onEventPage.openEventDetails(eventField100)

        //Validate event fields
        onEventDetailsPage.validateEventTitle(eventField100)
        onEventDetailsPage.validateEventDate(eventMaxSymbolsDate)
        onEventDetailsPage.validateEventTime(createEventTime)
        onEventDetailsPage.validateEventLocation(eventField100)
        onEventDetailsPage.validateEventAgeGroup(eventField30)
        onEventDetailsPage.validateEventOrganizer(eventField100)
        onEventDetailsPage.validateShortDescr(eventField500)
        onEventDetailsPage.validateEventLongDescr(eventField1600)
        onEventDetailsPage.validateEventCreator(username)
        

    })

    it('Create new event, edit, cancel the editing and validate it', () => {
        //Test cases: 193
        cy.visit('/')
        onEventPage.createEvent()

        //Add field data
        onEventDialog.addEventTitle(createEventTitle)
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation(createEventLocation)
        onEventDialog.addEventAgeGroup(createEventAge)
        onEventDialog.addEventOrganizer(createEventOrganizer)
        onEventDialog.addEventShortDescr(createEventShortDescr)
        onEventDialog.addEventLongDescr(createEventLongDescr)
        onEventDialog.addEventImg("event2.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        cy.wait(2000)

        //Submit Event
        onEventDialog.clickSubmitButton()
        onEventPage.confirmEventCreation(userData.eventConfirmationMsg) 

        //Open Event and validate fields
        onEventPage.openEventDetails(createEventTitle)
        onEventDetailsPage.validateEventTitle(createEventTitle)
        onEventDetailsPage.validateEventDate(createEventDate)
        onEventDetailsPage.validateEventTime(createEventTime)
        onEventDetailsPage.validateEventLocation(createEventLocation)
        onEventDetailsPage.validateEventAgeGroup(createEventAge)
        onEventDetailsPage.validateEventOrganizer(createEventOrganizer)
        onEventDetailsPage.validateShortDescr(createEventShortDescr)
        onEventDetailsPage.validateEventLongDescr(createEventLongDescr)
        onEventDetailsPage.validateEventCreator(username)

        //Edit Event, cancel/close the edit and validate that is not edited
        onEventDetailsPage.clickEditEventButton()
        onEventDialog.clearAllFields()
        onEventDialog.addEventTitle(editEventTitle)
        onEventDialog.addEventDate(editEventDate)
        onEventDialog.addEventTime(editEventTime)
        onEventDialog.addEventLocation(editEventLocation)
        onEventDialog.addEventAgeGroup(editEventAge)
        onEventDialog.addEventOrganizer(editEventOrganizer)
        onEventDialog.addEventShortDescr(editEventShortDescr)
        onEventDialog.addEventLongDescr(editEventLongDescr)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.clickCancelButton()

        onEventDetailsPage.clickEditEventButton()
        onEventDialog.clearAllFields()
        onEventDialog.addEventTitle(editEventTitle)
        onEventDialog.addEventDate(editEventDate)
        onEventDialog.addEventTime(editEventTime)
        onEventDialog.addEventLocation(editEventLocation)
        onEventDialog.addEventAgeGroup(editEventAge)
        onEventDialog.addEventOrganizer(editEventOrganizer)
        onEventDialog.addEventShortDescr(editEventShortDescr)
        onEventDialog.addEventLongDescr(editEventLongDescr)
        onEventDialog.clickCloseButton()

        onEventDetailsPage.validateEventTitle(createEventTitle)
        onEventDetailsPage.validateEventDate(createEventDate)
        onEventDetailsPage.validateEventTime(createEventTime)
        onEventDetailsPage.validateEventLocation(createEventLocation)
        onEventDetailsPage.validateEventAgeGroup(createEventAge)
        onEventDetailsPage.validateEventOrganizer(createEventOrganizer)
        onEventDetailsPage.validateShortDescr(createEventShortDescr)
        onEventDetailsPage.validateEventLongDescr(createEventLongDescr)
        onEventDetailsPage.validateEventCreator(username)


        //Edit Event
        onEventDetailsPage.clickEditEventButton()
        onEventDialog.clearAllFields()
        onEventDialog.addEventTitle(editEventTitle)
        onEventDialog.addEventDate(editEventDate)
        onEventDialog.addEventTime(editEventTime)
        onEventDialog.addEventLocation(editEventLocation)
        onEventDialog.addEventAgeGroup(editEventAge)
        onEventDialog.addEventOrganizer(editEventOrganizer)
        onEventDialog.addEventShortDescr(editEventShortDescr)
        onEventDialog.addEventLongDescr(editEventLongDescr)
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        cy.wait(5000)
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        cy.wait(5000)
        
        //Submit Event
        onEventDialog.clickSaveEventButton()
        cy.wait(5000)
        onEventPage.confirmEventCreation(userData.eventChangesSavedMsg)
        cy.wait(5000)
        
        //Navigate to Events page and open the edited event
        //onEventPage.navigateToAllEventsPage()
        //onEventPage.openEventDetails(editEventTitle)

        //Validate edited event fields
        onEventDetailsPage.validateEventTitle(editEventTitle)
        onEventDetailsPage.validateEventDate(editEventDate)
        onEventDetailsPage.validateEventTime(editEventTime)
        onEventDetailsPage.validateEventLocation(editEventLocation)
        onEventDetailsPage.validateEventAgeGroup(editEventAge)
        onEventDetailsPage.validateEventOrganizer(editEventOrganizer)
        onEventDetailsPage.validateShortDescr(editEventShortDescr)
        onEventDetailsPage.validateEventLongDescr(editEventLongDescr)
        onEventDetailsPage.validateEventCreator(username)

        //Open edit dialog and cancel the edit
        onEventDetailsPage.clickEditEventButton()
        onEventDialog.clickCancelButton()
        onEventDetailsPage.validateEventTitle(editEventTitle)

    }) 

    it('Login, check event number and open map', () => {
        cy.visit('/')
        onEventPage.countEvents().then((eventCount) => {
            onEventPage.clickOnMapButton();
            onMapPage.checkPin(eventCount);
            //Open map throug event
            onMapPage.clickOnEventsPageButton()
            onEventPage.openEventDetails(editEventTitle)
            onEventDetailsPage.clickOnMapButton()
            onMapPage.checkPin(eventCount);

        }); 
    });

    it('Login, check event details on the map and navigate to event details', () => {
        cy.visit('/')
        onEventPage.openEventOnMap(editEventTitle)
        cy.wait(2000)
        onMapPage.checkEventImageExist()
        onMapPage.checkEventTitle(editEventTitle)
        onMapPage.checkEventDate(editEventDate)
        onMapPage.checkEventTime(editEventTime)
        onMapPage.clickOnEventDetaislLink()
        onEventDetailsPage.validateEventTitle(editEventTitle)
    });
    

    it('Check that event is not created after click on the cancel button', () => {
        cy.visit('/')
        onEventPage.countEvents().then((eventCount) => {
            onEventPage.createEvent()
            onEventDialog.addEventTitle('a')
            onEventDialog.addEventDate(createEventDate)
            onEventDialog.addEventTime(createEventTime)
            onEventDialog.addEventLocation('a')
            onEventDialog.addEventOrganizer('a')
            onEventDialog.addEventShortDescr('a')
            onEventDialog.addEventImg("eventEdit.jpg")
            onEventDialog.confirmationMsg(userData.imgUploadedMessage)
            onEventDialog.addEventCoordinates()
            onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
            onEventDialog.clickCancelButton()

            onEventPage.createEvent()
            onEventDialog.addEventTitle('a')
            onEventDialog.addEventDate(createEventDate)
            onEventDialog.addEventTime(createEventTime)
            onEventDialog.addEventLocation('a')
            onEventDialog.addEventOrganizer('a')
            onEventDialog.addEventShortDescr('a')
            onEventDialog.addEventImg("eventEdit.jpg")
            onEventDialog.confirmationMsg(userData.imgUploadedMessage)
            onEventDialog.addEventCoordinates()
            onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
            cy.wait(9000)
            onEventDialog.clickCloseButton()


            onEventPage.clickOnMapButton();  
            onMapPage.checkPin(eventCount);
        }); 
    });

    it('Delete the created events', () => {
        cy.visit('/')

        //Open edit dialog from event page and delete event
        onEventPage.editSelectedEvent(editEventTitle)
        onEventDialog.clickDeleteEventButton()
        onEventPage.confirmEventCreation(userData.eventDeletedMsg)

        //Open Event details using chat button, open edit dialog and delete event
        onEventPage.openEventDetailsUsingChatButton(eventField100)
        onEventDetailsPage.clickEditEventButton()
        onEventDialog.clickDeleteEventButton()
        onEventPage.confirmEventCreation(userData.eventDeletedMsg)
    }); 

    it('Create event only with mandatory fields', () => {
        cy.visit('/')
        onEventPage.createEvent()

        //Add field data
        onEventDialog.addEventTitle(createEventTitle)
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation(createEventLocation)
        onEventDialog.addEventOrganizer(createEventOrganizer)
        onEventDialog.addEventShortDescr(createEventShortDescr)
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        cy.wait(2000)

        //Submit Event
        onEventDialog.clickSubmitButton()
        onEventPage.confirmEventCreation(userData.eventConfirmationMsg) 

        //Open Event and validate fields
        onEventPage.openEventDetails(createEventTitle)
        onEventDetailsPage.validateEventTitle(createEventTitle)
        onEventDetailsPage.validateEventDate(createEventDate)
        onEventDetailsPage.validateEventTime(createEventTime)
        onEventDetailsPage.validateEventLocation(createEventLocation)
        onEventDetailsPage.validateEventOrganizer(createEventOrganizer)
        onEventDetailsPage.validateShortDescr(createEventShortDescr)
        onEventDetailsPage.validateEventCreator(username)

        //Delete event
        onEventDetailsPage.clickEditEventButton()
        onEventDialog.clickDeleteEventButton()
        onEventPage.confirmEventCreation(userData.eventDeletedMsg)
    })

    it('Create event with minimum symbols in the mandatory fields', () => {
        cy.visit('/')
        onEventPage.createEvent()

        //Add field data
        onEventDialog.addEventTitle('a')
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation('a')
        onEventDialog.addEventOrganizer('a')
        onEventDialog.addEventShortDescr('a')
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        cy.wait(2000)

        //Submit Event
        onEventDialog.clickSubmitButton()
        onEventPage.confirmEventCreation(userData.eventConfirmationMsg) 

        //Open Event and validate fields
        onEventPage.openEventDetails('a')
        onEventDetailsPage.validateEventTitle('a')
        onEventDetailsPage.validateEventDate(createEventDate)
        onEventDetailsPage.validateEventTime(createEventTime)
        onEventDetailsPage.validateEventLocation('a')
        onEventDetailsPage.validateEventOrganizer('a')
        onEventDetailsPage.validateShortDescr('a')
        onEventDetailsPage.validateEventCreator(username)

        //Delete event
        onEventDetailsPage.clickEditEventButton()
        onEventDialog.clickDeleteEventButton()
        onEventPage.confirmEventCreation(userData.eventDeletedMsg)
    })

    it('Create event with incorect img format and size', () => {
        cy.visit('/')
        onEventPage.createEvent()

        //Add field data
        onEventDialog.addEventTitle('a')
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation('a')
        onEventDialog.addEventOrganizer('a')
        onEventDialog.addEventShortDescr('a')
        onEventDialog.addEventImg("eventBig.jpg")
        onEventDialog.confirmationMsg(userData.tooBigImgMsg)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        cy.wait(2000)

        //Submit Event
        onEventDialog.clickSubmitButton()
        onEventDialog.alertMsgImg(userData.emptyImg)

        onEventDialog.addEventImg("filePdf.pdf")
        onEventDialog.clickSubmitButton()
        //TO DO: corect msg to be added
        onEventDialog.confirmationMsg(userData.wrongImgformat)
    })

    it('Create event with empty mandatory field', () => {
        //Test case coverage: 151        
        cy.visit('/')
        //Create event without img
        onEventPage.createEvent()
        onEventDialog.addEventTitle('a')
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation('a')
        onEventDialog.addEventOrganizer('a')
        onEventDialog.addEventShortDescr('a')
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        //Submit Event, validate error msg and close
        onEventDialog.clickSubmitButton()
        onEventDialog.alertMsgImg(userData.emptyImg)
        onEventDialog.clickCancelButton()

        //Create event without title
        onEventPage.createEvent()
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation('a')
        onEventDialog.addEventOrganizer('a')
        onEventDialog.addEventShortDescr('a')
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        //Submit Event, validate error msg and close
        onEventDialog.clickSubmitButton()
        onEventDialog.alertMsgTitle(userData.emptyTitle)
        onEventDialog.clickCancelButton()

        //Create event without Date
        onEventPage.createEvent()
        onEventDialog.addEventTitle('a')
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation('a')
        onEventDialog.addEventOrganizer('a')
        onEventDialog.addEventShortDescr('a')
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        //Submit Event, validate error msg and close
        onEventDialog.clickSubmitButton()
        onEventDialog.alertMsgDate(userData.emptyDate)
        onEventDialog.clickCancelButton()

        //Create event without time
        onEventPage.createEvent()
        onEventDialog.addEventTitle('a')
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventLocation('a')
        onEventDialog.addEventOrganizer('a')
        onEventDialog.addEventShortDescr('a')
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        //Submit Event, validate error msg and close
        onEventDialog.clickSubmitButton()
        onEventDialog.alertMsgTime(userData.emptyTime)
        onEventDialog.clickCancelButton()

        //Create event without location
        onEventPage.createEvent()
        onEventDialog.addEventTitle('a')
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventOrganizer('a')
        onEventDialog.addEventShortDescr('a')
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        //Submit Event, validate error msg and close
        onEventDialog.clickSubmitButton()
        onEventDialog.alertMsgLocation(userData.emptyLocation)
        onEventDialog.clickCancelButton()

        //Create event without organizer
        onEventPage.createEvent()
        onEventDialog.addEventTitle('a')
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation('a')
        onEventDialog.addEventShortDescr('a')
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        //Submit Event, validate error msg and close
        onEventDialog.clickSubmitButton()
        onEventDialog.alertMsgOrganizer(userData.emptyOrganizer)
        onEventDialog.clickCancelButton()

        //Create event without short description
        onEventPage.createEvent()
        onEventDialog.addEventTitle('a')
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation('a')
        onEventDialog.addEventOrganizer('a')
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        onEventDialog.addEventCoordinates()
        onEventDialog.confirmationMsg(userData.coordinatesSelectionMessage)
        //Submit Event, validate error msg and close
        onEventDialog.clickSubmitButton()
        onEventDialog.alertMsgShortDescr(userData.emptyShortDescr)
        onEventDialog.clickCancelButton()

        //Create event without coordinates
        onEventPage.createEvent()
        onEventDialog.addEventTitle('a')
        onEventDialog.addEventDate(createEventDate)
        onEventDialog.addEventTime(createEventTime)
        onEventDialog.addEventLocation('a')
        onEventDialog.addEventOrganizer('a')
        onEventDialog.addEventShortDescr('a')
        onEventDialog.addEventImg("eventEdit.jpg")
        onEventDialog.confirmationMsg(userData.imgUploadedMessage)
        //Submit Event, validate error msg and close
        onEventDialog.clickSubmitButton()
        onEventDialog.alertMsgCoordinates(userData.emptyCoordinates)
        onEventDialog.clickCancelButton()
    }) 

})

