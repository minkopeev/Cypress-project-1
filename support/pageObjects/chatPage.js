/// <reference types="cypress" />

export const chatPageElements = {
    
    registerPageButton: 'a[href="/register"]',
    userListRow: 'div[id*="chat-usersList-item"]',
    userListName: '#chat-usersList-item-userName',
    chatTextInputField: 'textarea[class*="ChatInput"]',
    chatSendMsgButton: 'svg[class*="ChatInput"]',
    chatMsgRows: 'div[class*="css-owdgog-Message"]',
    chatMsgName: 'span[class*="message-header-name "]',
    chatMsgUsername: 'span[class*="message-header-username "]',
    chatMsgText: 'div[class*="ec-box ec-message-body "]',
    chatMsgToolboxDelete: 'div[class*="ec-box ec-message-toolbox"] button:nth-of-type(6)',
    chatMsgToolboxEdit: 'div[class*="ec-box ec-message-toolbox"] button:nth-of-type(5)',
}

export class chatPage {

    openChatWithAnotherUser(anotherUser) {
        cy.get(chatPageElements.userListRow).each(($el) => {

            const user=$el.find(chatPageElements.userListName).text()
            if (user.includes(anotherUser))
            {
                cy.wrap($el).find(chatPageElements.userListName).click()
                return false
            
            }
        })
    }

    addChatMsg(msgText) {
        cy.get(chatPageElements.chatTextInputField).type(msgText)
        cy.get(chatPageElements.chatSendMsgButton).click()
    }

    validateChatMsg(user, text) {
        let userFound = false; // Initialize a flag to track if the user is found
        
        cy.get(chatPageElements.chatMsgRows).each(($el, index, $list) => {
            const userName = $el.find(chatPageElements.chatMsgName).text();
            
            if (userName.includes(user)) {
                userFound = true; // Set the flag to true if the user is found
                cy.wrap($el).find(chatPageElements.chatMsgUsername).should('have.text', "@" + user);
                cy.wrap($el).find(chatPageElements.chatMsgText).should('have.text', text);
                return false;
            }
        }).then(() => {
            // Assert that the user was found after the loop completes
            expect(userFound).to.be.true;
        });
    }

    deleteChatMsg(user, text) {
        let userFound = false; // Initialize a flag to track if the user is found
        
        cy.get(chatPageElements.chatMsgRows).each(($el, index, $list) => {
            const userName = $el.find(chatPageElements.chatMsgName).text()
         
            if (userName.includes(user)) {
                userFound = true; // Set the flag to true if the user is found
                cy.wrap($el).find(chatPageElements.chatMsgText).should('have.text', text)
                cy.wrap($el).find(chatPageElements.chatMsgToolboxDelete).click({ force: true })
                return false;
            }
        }).then(() => {
            // Assert that the user was found after the loop completes
            expect(userFound).to.be.true;
        });
    }

    editChatMsg(user, oldText, newText) {
        let userFound = false; // Initialize a flag to track if the user is found
        
        cy.get(chatPageElements.chatMsgRows).each(($el, index, $list) => {
            const userName = $el.find(chatPageElements.chatMsgName).text()
         
            if (userName.includes(user)) {
                userFound = true; // Set the flag to true if the user is found
                cy.wrap($el).find(chatPageElements.chatMsgText).should('have.text', oldText)
                cy.wrap($el).find(chatPageElements.chatMsgToolboxEdit).click({ force: true })
                return false;
            }
        }).then(() => {
            // Assert that the user was found after the loop completes
            expect(userFound).to.be.true
            cy.get(chatPageElements.chatTextInputField).type(newText)
            cy.get(chatPageElements.chatSendMsgButton).click()
        });

        
    }
    
}

export const onChatPage = new chatPage()