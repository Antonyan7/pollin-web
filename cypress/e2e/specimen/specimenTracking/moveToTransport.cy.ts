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

  it(`should verify move specimen to transport folder`, () => {
    cy.visit('/clinic-test-results/specimen-tracking/all-tests');
    cy.url().should('include', '/clinic-test-results/specimen-tracking/all-tests');
    cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should('not.exist');
    cy.fixture('test-data').then((data) => {
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_LIST)).should('exist');

      cy.AddToNewExistingTransport(data.specimen_barcode_1);
      cy.AddNewTransportFolder(data.move_to_transport, LabDestinations.DynacareLaboratory);

      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_TAB_TRANSPORTS))
        .should('exist')
        .click();
      cy.url().should('include', '/clinic-test-results/specimen-tracking/transports');
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should('not.exist');
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST)).should(
        'contain',
        data.move_to_transport
      );
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST))
        .contains(data.move_to_transport)
        .realClick();

      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should('not.exist');
      cy.get(`.MuiTableContainer-root`).should('contain', data.specimen_barcode_1);
    });
  });
});

export {};
