import { CypressIds } from '../../../../src/constants/cypressIds';
import { CyUtils } from '../../../helpers/cypressIdsUtils';
import { LabDestinations } from '../../../helpers/helpers';

describe('move specimen to transport folder', () => {
  before(() => {
    cy.clearCookies();

    const email = Cypress.env('userOneEmail');
    const pass = Cypress.env('userOnePassword');

    cy.SignInViaEmulator(email, pass);
  });

  it(`should verify search by barcode and move specimen to transport folder`, () => {
    cy.visit('/clinic-test-results/specimen-tracking/all-tests');
    cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
    cy.url().should('include', '/clinic-test-results/specimen-tracking/all-tests');
    cy.fixture('test-data').then((data) => {
      cy.getElementText('Specimen ID', (barcode) => {
        cy.log(`Barcode is ${barcode}`);

        cy.scanBarcode(barcode);
        cy.clickOnContextMenuItems(barcode, CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_NEW_TRANSPORT_BUTTON);
        cy.createNewTransportFolder(data.move_to_transport, LabDestinations.DynacareLaboratory);

        cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_TAB_TRANSPORTS))
          .should('exist')
          .click();

        cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
        cy.url().should('include', '/clinic-test-results/specimen-tracking/transports');
        cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST)).should(
          'contain',
          data.move_to_transport
        );
        cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST))
          .contains(data.move_to_transport)
          .realClick();

        cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
        cy.get(`.MuiTableContainer-root`).should('contain', barcode);
      });
    });
  });
});

export {};
