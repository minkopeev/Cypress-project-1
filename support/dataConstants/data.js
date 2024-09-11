/// <reference types="cypress" />

//URL section
export const baseUrl = 'http://localhost:5173/'

//Credential section
export const email = 'auto_test1@abv.bg'
export const username = 'GeorgiIvanov1'
export const password = 'Qwerty12345!'
export const confirmLoginMsg = 'Вие сте влезли успешно!'
export const logoutMsg = 'Вие сте излезли от системата!'

//Login page object locators
export const emailLocator = 'input[name="email"]'
export const passwordLocator = 'input[name="password"]'
export const loginSubmitButtonLocator = 'button[type="submit"]'
export const confirmationMsgLocator = 'div[class="text-sm opacity-90"]'
export const allEventsButton = 'nav svg[class*="lucide-calendar"]'
export const mapButton = '#navigation a[href="/map"]'
export const menuButton = '.lucide-menu'
export const chatButton = '.lucide-messages-square'
export const logoutButton = '#navigation-menu-logoutLink'
export const userManagmetButton = '#navigation-menu-userManagementLink'

//Create event section
export const createEventTitle = 'Музикален фестивал @#!$"%&?-_'
export const createEventDate = '2025-06-05'
export const createEventTime = '18:30'
export const createEventLocation = 'Габрово, Централен площад @#!$"%&?-_'
export const createEventAge = '10-18'
export const createEventOrganizer = 'ПМГ-Габрово @#!$"%&?-_'
export const createEventShortDescr = 'Годишен музикален фестивал на Природоматематическа Гимназия "Академик Иван Гюзелев" - Габрово @#!$"%&?-_'
export const createEventLongDescr = '@#!$"%&?-_ Музикалният фестивал на ПМГ "Академик Иван Гюзелев" - Габрово е ежегодно събитие създадено от учениците на гимназия. Провежда се през месец май и е с продължителност от два дни.'

//Edit event section
export const editEventTitle = 'Музикален фестивал, направо концерт @#!$"%&?-_'
export const editEventDate = '2024-09-11'
export const editEventTime = '20:30'
export const editEventLocation = 'В някоя @#!$"%&?-_ зала'
export const editEventAge = '16 и нагоре @#!$"%&?-_'
export const editEventOrganizer = 'Габровско радио @#!$"%&?-_'
export const editEventShortDescr = '@#!$"%&?-_ Годишни музикални награди на Габровското радио'
export const editEventLongDescr = '@#!$"%&?-_ През 2024 годишните музикални награди на Габровското радио ще се връчат за 115 път. Ще има много музика и забавление!'