const { radioPage } = require('../page-objects/radio_page');
import { sample } from 'lodash';

describe('Radio Buttons Tests', () => {
  beforeEach('Navigate to page', () => {
    cy.visit('/radio-button');
  });

  it('Shows message corresponding to chosen radio button', () => {
    const options = ['Yes', 'Impressive'];
    const random_option = sample(options);

    radioPage.selectRadioOption(random_option);

    radioPage.checkDisplayedTextContains(random_option);
  });

  it('Does not allow selection of the disabled radio button option', () => {
    const disabled_option = 'No';

    radioPage.selectRadioOption(disabled_option);

    radioPage.checkTextIsNotDisplayed();
  });
});
