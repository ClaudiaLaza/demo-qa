class RadioPage {
  locators = {
    yes_radio: '.custom-radio:has(#yesRadio)',
    impressive_radio: '.custom-radio:has(#impressiveRadio)',
    no_radio: '.custom-radio:has(#noRadio)',
    displayed_text: 'p:has(.text-success)',
  };

  selectRadioOption(option) {
    switch (option) {
      case 'Yes':
        cy.get(this.locators.yes_radio).click();
        break;
      case 'Impressive':
        cy.get(this.locators.impressive_radio).click();
        break;
      case 'No':
        cy.get(this.locators.no_radio).click({ force: true });
        break;
      default:
        throw new Error('Invalid option!');
    }
  }

  checkDisplayedTextContains(option) {
    cy.get(this.locators.displayed_text)
      .should('be.visible')
      .and('have.text', 'You have selected ' + option);
  }

  checkTextIsNotDisplayed() {
    cy.get(this.locators.displayed_text).should('not.exist');
  }
}

export const radioPage = new RadioPage();
