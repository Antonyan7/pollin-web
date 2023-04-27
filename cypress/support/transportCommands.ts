import { CypressIds } from '../../src/constants/cypressIds';
import { CyUtils } from '../helpers/cypressIdsUtils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      createNewTransportFolder(name: string, lab: string): Chainable<void>;

      clickOnContextMenuItems(specimenID: string, selector: string): Chainable<void>;

      addToExistingTransport(transport: string): Chainable<void>;

      scanBarcode(barcode: string): Chainable<void>;

      getElementText(barcodeName: string, block: (barcode: string) => void): Chainable<void>;
    }
  }
}

Cypress.Commands.add('createNewTransportFolder', (name, lab) => {
  cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_NAME_FIELD)).type(name);
  cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_DESTINATION_FIELD))
    .should('exist')
    .click();
  cy.get(`ul li`).contains(lab).click();

  cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_CONFIRM_BUTTON))
    .should('exist')
    .click();
  cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
});

Cypress.Commands.add('clickOnContextMenuItems', (specimenID, selector) => {
  cy.get('table > tbody > tr').each((elem, index) => {
    if (elem.text().includes(specimenID)) {
      cy.wrap(elem).get(`[data-cy="${CypressIds.COMMON_TABLE_CHECKBOX}-${index}"]`).realClick();
      cy.wrap(elem).get(`[data-cy="${CypressIds.COMMON_CONTEXT_MENU}-${index}"]`).realClick();
      cy.wrap(elem).get(`[data-cy="${selector}-${index}"]`).click();
    }
  });
});

Cypress.Commands.add('getElementText', (barcodeName, block) => {
  cy.get(`table > thead > tr`)
    .children()
    .each((element, barcodeIndex) => {
      if (element.text().includes(barcodeName)) {
        cy.get(`table > tbody > tr`)
          .eq(0)
          .children()
          .eq(barcodeIndex)
          .then((barcodeElement) => block(barcodeElement.text()));
      }
    });
});

Cypress.Commands.add('scanBarcode', (barcode) => {
  cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_LIST_SEARCH)).type(barcode);
  cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_LIST_SEARCH)).realPress('{enter}');
});

Cypress.Commands.add('addToExistingTransport', (transport) => {
  cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_TAB_EXISTING))
    .should('exist')
    .click();
  cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_DESTINATION_FIELD))
    .should('exist')
    .click();
  cy.get(`ul li`).contains(transport).click();

  cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_CONFIRM_BUTTON))
    .should('be.enabled')
    .click();

  cy.get(CyUtils.getSelector(CypressIds.COMMON_TOAST_SUCCESS_MESSAGE)).should('exist');
});

export {};
