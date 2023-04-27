import { addDays, format, getMonth } from 'date-fns';

import { CypressIds } from '../../../../src/constants/cypressIds';
import { CyUtils } from '../../../helpers/cypressIdsUtils';
import { LabDestinations, TransportStatus } from '../../../helpers/helpers';

const futureDate = addDays(new Date(), 1);

describe('new transport', () => {
  before(() => {
    cy.clearCookies();

    const email = Cypress.env('userOneEmail');
    const pass = Cypress.env('userOnePassword');

    cy.SignInViaEmulator(email, pass);
  });

  before(() => {
    cy.visit('/clinic-test-results/specimen-tracking/transports');
    cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
    cy.url().should('include', '/clinic-test-results/specimen-tracking/transports');
    cy.fixture('test-data').then((data) => {
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_BUTTON))
        .should('exist')
        .click();
      cy.createNewTransportFolder(data.test_transport, LabDestinations.DynacareLaboratory);
      cy.url().should('include', '/clinic-test-results/specimen-tracking/transports');
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_BUTTON))
        .should('exist')
        .click();
      cy.createNewTransportFolder(data.change_transport, LabDestinations.DynacareLaboratory);
    });
  });

  it(`should verify create new transport folder`, () => {
    const futureDayString = format(futureDate, 'd');
    const dateToSelect = RegExp(`^${futureDayString}$`);
    const currentMonth = getMonth(new Date());
    const futureMonth = getMonth(futureDate);

    cy.visit('/clinic-test-results/specimen-tracking/transports');
    cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
    cy.url().should('include', '/clinic-test-results/specimen-tracking/transports');

    cy.fixture('test-data').then((data) => {
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_BUTTON))
        .should('exist')
        .click();
      cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_DATE_PICKER))
        .should('exist')
        .click();

      if (currentMonth !== futureMonth) {
        cy.get(`[data-testid="ArrowRightIcon"]`).should('exist').click();
        cy.get(`.MuiCalendarOrClockPicker-root`).should('contain', futureMonth);
      }

      cy.get(`.MuiCalendarPicker-root`).contains(dateToSelect).click();
      cy.createNewTransportFolder(data.verify_transport, LabDestinations.SickKids);

      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_DATE_PICKER)).click();

      if (currentMonth !== futureMonth) {
        cy.get(`[data-testid="ArrowRightIcon"]`).should('exist').click();
        cy.get(`.MuiCalendarOrClockPicker-root`).should('contain', futureMonth);
      }

      cy.get(`.MuiCalendarPicker-root`).contains(dateToSelect).click();

      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST))
        .should('contain', data.verify_transport)
        .should('contain', TransportStatus.ReadyForTransport)
        .should('contain', LabDestinations.SickKids);
    });
  });

  it(`should verify search by barcode and move specimen back to All Tests`, () => {
    cy.visit('/clinic-test-results/specimen-tracking/all-tests');
    cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
    cy.url().should('include', '/clinic-test-results/specimen-tracking/all-tests');
    cy.fixture('test-data').then((data) => {
      cy.getElementText('Specimen ID', (barcode) => {
        cy.log(`Barcode is ${barcode}`);

        cy.scanBarcode(barcode);
        cy.clickOnContextMenuItems(barcode, CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_NEW_TRANSPORT_BUTTON);
        cy.addToExistingTransport(data.test_transport);

        cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
        cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_TAB_TRANSPORTS)).click();
        cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
        cy.url().should('include', '/clinic-test-results/specimen-tracking/transports');
        cy.scanBarcode(barcode);

        cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST))
          .contains(data.test_transport)
          .click();
        cy.get('table > tbody').contains(barcode);
        cy.clickOnContextMenuItems(barcode, CypressIds.PAGE_SPECIMEN_TRACKING_IN_TRANSPORT_ACTION_MOVE_BACK_ALL_TESTS);
        cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');

        cy.visit('/clinic-test-results/specimen-tracking/all-tests');
        cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
        cy.url().should('include', '/clinic-test-results/specimen-tracking/all-tests');

        cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_LIST)).should('contain', barcode);
      });
    });
  });

  it(`should verify Move to Another Transport Folder`, () => {
    cy.visit('/clinic-test-results/specimen-tracking/all-tests');
    cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
    cy.url().should('include', '/clinic-test-results/specimen-tracking/all-tests');
    cy.fixture('test-data').then((data) => {
      cy.getElementText('Specimen ID', (barcode) => {
        cy.log(`Barcode is ${barcode}`);

        cy.scanBarcode(barcode);
        cy.clickOnContextMenuItems(barcode, CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_NEW_TRANSPORT_BUTTON);
        cy.addToExistingTransport(data.test_transport);

        cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
        cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_TAB_TRANSPORTS)).click();
        cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
        cy.url().should('include', '/clinic-test-results/specimen-tracking/transports');
        cy.scanBarcode(barcode);

        cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST))
          .contains(data.test_transport)
          .click();
        cy.get('table > tbody').contains(barcode);
        cy.clickOnContextMenuItems(barcode, CypressIds.PAGE_SPECIMEN_TRACKING_IN_TRANSPORT_ACTION_MOVE_TO_ANOTHER);
        cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_DESTINATION_FIELD))
          .should('exist')
          .click();
        cy.get(`ul li`).contains(data.change_transport).click();
        cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_CONFIRM_BUTTON))
          .should('exist')
          .click();
        cy.get(CyUtils.getSelector(CypressIds.COMMON_TOAST_SUCCESS_MESSAGE)).should('exist');

        cy.visit('/clinic-test-results/specimen-tracking/transports');
        cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
        cy.url().should('include', '/clinic-test-results/specimen-tracking/transports');

        cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST))
          .contains(data.change_transport)
          .click();

        cy.get('table > tbody').should('contain', barcode);
      });
    });
  });
});

export {};
