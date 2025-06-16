class AutoCompletePage {
  locators = {
    multiple_container: '#autoCompleteMultiple',
    multiple_input: '#autoCompleteMultipleInput',
    multiple: {
      menu_list: '.auto-complete__menu-list',
      chip_container: '.auto-complete__multi-value',
      chip: {
        label: '.auto-complete__multi-value__label',
        remove_icon: '.auto-complete__multi-value__remove',
      },
      clear_input_icon: '.auto-complete__clear-indicator',
    },
    single_container: '#autoCompleteSingle',
    single_input: '#autoCompleteSingleInput',
    single: {
      value: '.auto-complete__single-value',
    },
    menu_options: '.auto-complete__option',
  };

  typeColorName(input, color) {
    cy.get(input).type(color);
  }

  typeColorNameInMultipleInput(color) {
    this.typeColorName(this.locators.multiple_input, color);
  }

  typeColorNameInSingleInput(color) {
    this.typeColorName(this.locators.single_input, color);
  }

  selectColorFromMenu(color) {
    cy.get(this.locators.menu_options)
      .should('be.visible')
      .filter((_, el) => el.textContent.trim().toLowerCase() === color.toLowerCase())
      .click();
  }

  checkSelectedColorChips(...colors) {
    cy.get(this.locators.multiple.chip.label)
      .should('have.length', colors.length)
      .each(($el, index) => {
        const actualColor = $el.text().trim().toLowerCase();
        const expectedColor = colors[index].toLowerCase();
        expect(actualColor).to.eq(expectedColor);
      });
  }

  clearMultipleInput() {
    cy.get(this.locators.multiple.clear_input_icon).click();
  }

  checkSingleSelectedValue(color) {
    cy.get(this.locators.single.value)
      .invoke('text')
      .then((text) => {
        expect(text.trim().toLowerCase()).to.eq(color.toLowerCase());
      });
  }

  checkSingleInputIsEmpty() {
    cy.get(this.locators.single.value).should('not.exist');
    cy.get(this.locators.single_input)
      .invoke('text')
      .then((text) => {
        expect(text).to.be.empty;
      });
  }

  blurSingleInput() {
    cy.get(this.locators.single_input).blur();
  }
}

export const autoCompletePage = new AutoCompletePage();
