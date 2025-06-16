import { tablePage } from '../page-objects/web_tables_page';
import { generateEmployees, updateEmployee } from '../support/utils';

describe('Web Tables Tests', () => {
  beforeEach('Navigate to page', () => {
    cy.visit('/webtables');
  });

  context('Add employees', () => {
    const employees = generateEmployees(3);

    it('Displays newly added employees in the table', () => {
      employees.forEach((employee) => {
        tablePage.openRegistrationForm();

        tablePage.fillAllFieldsInRegistrationForm(employee);

        tablePage.submitRegistrationForm();
      });

      tablePage.checkTableContains(...employees);
    });
  });

  context('Edit/Delete employee', () => {
    beforeEach('Setup new employee', () => {
      const newEmployee = generateEmployees(1)[0];

      cy.wrap(newEmployee).as('employee', { type: 'static' });

      cy.get('@employee').then((employee) => {
        cy.addEmployee(employee);
      });
    });

    it('Updates table row after editing employee data', () => {
      const newData = { firstName: 'New First Name', salary: 1234567, department: 'New Department' };

      cy.get('@employee').then((employee) => {
        tablePage.editTableRowByEmail(employee.email, newData);
        cy.wrap(updateEmployee(employee, newData)).as('updatedEmployee', { type: 'static' });
      });

      cy.get('@updatedEmployee').then((updatedEmployee) => {
        tablePage.checkTableContains(updatedEmployee);
      });
    });

    it('Removes employee from the table after deletion', () => {
      cy.get('@employee').then((employee) => {
        tablePage.deleteTableRowByEmail(employee.email);

        tablePage.checkTableRowDoesNotExistByEmail(employee.email);
      });
    });
  });

  context('Search functionality', () => {
    it('Filters table rows using partial input (case insensitive)', () => {
      const partialTerm = 'example.CoM';

      tablePage.searchByTerm(partialTerm);

      tablePage.checkRowsContainSearchTerm(partialTerm);
    });

    it('Finds employee by full first name (case insensitive)', () => {
      const fullTerm = 'kieRra';

      tablePage.searchByTerm(fullTerm);

      tablePage.checkRowsContainSearchTerm(fullTerm);
    });

    it('Shows empty results when no match is found', () => {
      const term = 'abcdefg';

      tablePage.searchByTerm(term);

      tablePage.checkNoRowsAreInTable();
    });
  });

  context('Pagination', () => {
    it('Changes number of visible rows based on selected page size', () => {
      const pageSizes = [5, 10, 20, 25, 50, 100];

      pageSizes.forEach((size) => {
        tablePage.setPageSize(size);

        tablePage.checkNumberOfRows(size);
      });
    });

    it('Paginates through employees correctly when page size is limited', () => {
      tablePage.deleteAllRows();

      const employees = generateEmployees(7);

      employees.forEach((employee) => {
        cy.addEmployee(employee);
      });

      tablePage.setPageSize(5);

      tablePage.checkTableContains(...employees.slice(0, 5));

      tablePage.goToNextPage();

      tablePage.checkTableContains(...employees.slice(5));
    });
  });
});
