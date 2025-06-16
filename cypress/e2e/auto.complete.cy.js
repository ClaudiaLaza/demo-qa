import { autoCompletePage } from '../page-objects/auto_complete_page';

describe('Auto Complete Tests', () => {
  beforeEach('Navigate to page', () => {
    cy.visit('/auto-complete');
  });

  context('Multiple Input', () => {
    it('Selects multiple valid colors from the list', () => {
      const colors = ['red', 'green', 'blue'];

      colors.forEach((color) => {
        autoCompletePage.typeColorNameInMultipleInput(color);

        autoCompletePage.selectColorFromMenu(color);
      });

      autoCompletePage.checkSelectedColorChips(...colors);
    });

    it('Removes all selected colors when input is cleared', () => {
      const colors = ['blue', 'yellow'];

      colors.forEach((color) => {
        autoCompletePage.typeColorNameInMultipleInput(color);

        autoCompletePage.selectColorFromMenu(color);
      });

      autoCompletePage.clearMultipleInput();

      autoCompletePage.checkSelectedColorChips();
    });
  });

  context('Single Input', () => {
    it('Selects a valid color from the list', () => {
      const color = 'red';

      autoCompletePage.typeColorNameInSingleInput(color);

      autoCompletePage.selectColorFromMenu(color);

      autoCompletePage.checkSingleSelectedValue(color);
    });

    it('Does not select any color for invalid input', () => {
      const invalidColor = 'bbblue';

      autoCompletePage.typeColorNameInSingleInput(invalidColor);

      autoCompletePage.blurSingleInput();

      autoCompletePage.checkSingleInputIsEmpty();
    });
  });
});
