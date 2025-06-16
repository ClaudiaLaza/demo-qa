class WebTablesPage {
  locators = {
    add_button: '#addNewRecordButton',
    form_dialog: '[role="dialog"]',
    registration_form: {
      first_name_input: '#firstName',
      last_name_input: '#lastName',
      email_input: '#userEmail',
      age_input: '#age',
      salary_input: '#salary',
      department_input: '#department',
      submit_button: '#submit',
    },
    table: {
      rows: '[role="rowgroup"]',
      filled_rows: '[role="rowgroup"] .rt-tr:not(.-padRow)',
      edit_icon: '[id^=edit-record-]',
      delete_icon: '[id^=delete-record-]',
    },
    search_input: '#searchBox',
    page_size_select: 'select[aria-label="rows per page"]',
    next_button: '.-next button',
  };

  openRegistrationForm() {
    cy.get(this.locators.add_button).click();
    cy.get(this.locators.form_dialog).should('be.visible');
  }

  fillAllFieldsInRegistrationForm(employee) {
    cy.get(this.locators.registration_form.first_name_input).type(employee.firstName);
    cy.get(this.locators.registration_form.last_name_input).type(employee.lastName);
    cy.get(this.locators.registration_form.email_input).type(employee.email);
    cy.get(this.locators.registration_form.age_input).type(employee.age);
    cy.get(this.locators.registration_form.salary_input).type(employee.salary);
    cy.get(this.locators.registration_form.department_input).type(employee.department);
  }

  submitRegistrationForm() {
    cy.get(this.locators.registration_form.submit_button).click();
  }

  checkTableContains(...employees) {
    employees.forEach((employee) => {
      cy.get(this.locators.table.filled_rows)
        .contains('.rt-td', employee.email)
        .parent()
        .within(() => {
          cy.get('.rt-td').eq(0).should('have.text', employee.firstName);
          cy.get('.rt-td').eq(1).should('have.text', employee.lastName);
          cy.get('.rt-td').eq(2).should('have.text', employee.age);
          cy.get('.rt-td').eq(3).should('have.text', employee.email);
          cy.get('.rt-td').eq(4).should('have.text', employee.salary);
          cy.get('.rt-td').eq(5).should('have.text', employee.department);
        });
    });
  }

  checkTableRowDoesNotExistByEmail(email) {
    cy.get(this.locators.table.filled_rows).contains('.rt-td', email).should('not.exist');
  }

  editTableRowByEmail(email, newData) {
    cy.get(this.locators.table.filled_rows)
      .contains('.rt-td', email)
      .parent()
      .within(() => {
        cy.get(this.locators.table.edit_icon).click();
      })
      .then(() => {
        if (newData.firstName) {
          cy.get(this.locators.registration_form.first_name_input).clear().type(newData.firstName);
        }
        if (newData.lastName) {
          cy.get(this.locators.registration_form.last_name_input).clear().type(newData.lastName);
        }
        if (newData.email) {
          cy.get(this.locators.registration_form.email_input).clear().type(newData.email);
        }
        if (newData.age) {
          cy.get(this.locators.registration_form.age_input).clear().type(newData.age);
        }
        if (newData.salary) {
          cy.get(this.locators.registration_form.salary_input).clear().type(newData.salary);
        }
        if (newData.department) {
          cy.get(this.locators.registration_form.department_input).clear().type(newData.department);
        }
        this.submitRegistrationForm();
      });
  }

  deleteTableRowByEmail(email) {
    cy.get(this.locators.table.filled_rows)
      .contains('.rt-td', email)
      .parent()
      .within(() => {
        cy.get(this.locators.table.delete_icon).click();
      });
  }

  searchByTerm(term) {
    cy.get(this.locators.search_input).clear().type(term);
  }

  checkRowsContainSearchTerm(term) {
    cy.get(this.locators.table.filled_rows).each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('.rt-td')
          .invoke('text')
          .then((text) => {
            expect(text.toLowerCase()).to.include(term.toLowerCase());
          });
      });
    });
  }

  checkNoRowsAreInTable() {
    cy.contains('No rows found').should('be.visible');
  }

  setPageSize(size) {
    cy.get(this.locators.page_size_select).select(size.toString());
  }

  checkNumberOfRows(size) {
    cy.get(this.locators.table.rows).should('have.length', size);
  }

  deleteAllRows() {
    const deleteNextRow = () => {
      cy.get('.rt-tbody').then((tbody) => {
        if (tbody.find(this.locators.table.filled_rows).length) {
          cy.get(this.locators.table.filled_rows).then(($rows) => {
            if ($rows.length === 0) return;
            cy.wrap($rows[0])
              .find(this.locators.table.delete_icon)
              .click()
              .then(() => {
                deleteNextRow();
              });
          });
        }
      });
    };
    deleteNextRow();
  }

  goToNextPage() {
    cy.get(this.locators.next_button).click();
  }
}

export const tablePage = new WebTablesPage();
