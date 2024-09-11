/// <reference types="cypress" />

import { confirmationMsgLocator } from "../dataConstants/data"

export const usersPageElements = {

userInfoRow: 'tr[id*="row"]',
userName: '#userManagement-card-tableBody-row-userName',
userEmail: '#userManagement-card-tableBody-row-userEmail',
userRoleDropdown: '#userManagement-card-tableBody-row-role',
userDeletionButton: '#userManagement-card-tableBody-row-trashButton',
dropdownOptions: 'div[role="presentation"] div'

}

export class usersPage {

assertAllInfoForUser(userEmailInfo, userNameInfo, userRoleInfo) {

    cy.contains(usersPageElements.userEmail, userEmailInfo).should('exist')

    cy.get(usersPageElements.userInfoRow).each(($el, index, $list) =>{

        const selectedRow=$el.find(usersPageElements.userEmail).text()

        if (selectedRow.includes(userEmailInfo)) {
            cy.log('User found:'+ userEmailInfo)
            cy.wrap($el).find(usersPageElements.userEmail).should('have.text', userEmailInfo)
            cy.wrap($el).find(usersPageElements.userName).should('have.text', userNameInfo)
            cy.wrap($el).find(usersPageElements.userRoleDropdown).should('have.text', userRoleInfo)
            cy.wrap($el).find(usersPageElements.userDeletionButton).should('exist')
            return false  
        } 
    })
}

changeUserRole(userEmailInfo, newUserRole) {

    cy.contains(usersPageElements.userEmail, userEmailInfo).should('exist')

    cy.get(usersPageElements.userInfoRow).each(($el, index, $list) =>{

        const selectedRow=$el.find(usersPageElements.userEmail).text()

        if (selectedRow.includes(userEmailInfo)) {
            cy.log('User found:'+ userEmailInfo)
            cy.wrap($el).find(usersPageElements.userRoleDropdown).first().click()
            cy.contains(usersPageElements.dropdownOptions, newUserRole).click()
            return false  
        } 
    })
}

confirmSavedChanges(savedChangesMsg) {
    cy.get(confirmationMsgLocator).should('have.text', savedChangesMsg)
}

assertAdminNotExistInList(adminEmail) {
    cy.contains(usersPageElements.userEmail, adminEmail).should('not.exist')
}

deleteUser(userForDeletion) {

    cy.contains(usersPageElements.userEmail, userForDeletion).should('exist')

    cy.get(usersPageElements.userInfoRow).each(($el, index, $list) =>{

        const selectedRow=$el.find(usersPageElements.userEmail).text()

        if (selectedRow.includes(userForDeletion)) {
                cy.wrap($el).find(usersPageElements.userDeletionButton).click()
            return false  
        } 
    })

}

assertDeletionMsg(deletionMsg) {
    cy.get(confirmationMsgLocator).should('have.text', deletionMsg)
}

assertUserPageNotOpen() {
    cy.get(usersPageElements.userInfoRow).should('not.exist')
}

}

export const onUsersPage = new usersPage()