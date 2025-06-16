# Cypress Test Automation for DemoQA

This repository contains end-to-end tests using [Cypress](https://www.cypress.io/) for various components of the [DemoQA](https://demoqa.com) website.

## Getting started
Install dependencies:
```
npm install
```

Before first run (reporting setup):
```
npm run clean:reports
```

## Running E2E tests
```
npm run test
```

## Generating mochawesome report
```
npm run posttest
```
The html report is available in the /reports/mochareports/ folder.

## Test Coverage

### Radio Buttons Tests (`/radio-button`)
- ✅ Shows message corresponding to chosen radio button
- ✅ Does not allow selection of the disabled radio button option

### Web Tables Tests(`/webtables`)
#### Add employees
- ✅ Displays newly added employees in the table
#### Edit/Delete employee
- ✅ Updates table row after editing employee data
- ✅ Removes employee from the table after deletion
#### Search functionality
- ✅ Filters table rows using partial input (case insensitive)
- ✅ Finds employee by full first name (case insensitive)
- ✅ Shows empty results when no match is found
#### Pagination
- ✅ Changes number of visible rows based on selected page size
- ✅ Paginates through employees correctly when page size is limited

### Auto Complete Tests (`/auto-complete`)
#### Multiple Input
- ✅ Selects multiple valid colors from the list
- ✅ Removes all selected colors when input is cleared
#### Single Input
- ✅ Selects a valid color from the list
- ✅ Does not select any color for invalid input

