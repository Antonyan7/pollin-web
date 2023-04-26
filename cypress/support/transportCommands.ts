import { CypressIds } from '../../src/constants/cypressIds';
import { CyUtils } from '../helpers/cypressIdsUtils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      CreateNewTransportFolder(name: string, lab: string): Chainable<void>;

      AddToNewExistingTransport(specimenID: string): Chainable<void>;

      GetElementText(barcodeName: string, block: (barcode: string) => void): Chainable<void>;
    }
  }
}

Cypress.Commands.add('CreateNewTransportFolder', (name, lab) => {
  cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_NAME_FIELD)).type(name);
  cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_DESTINATION_FIELD))
    .should('exist')
    .click();
  cy.get(`ul li`).contains(lab).click();

  cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_CONFIRM_BUTTON))
    .should('exist')
    .click();
});

Cypress.Commands.add('AddToNewExistingTransport', (specimenID) => {
  cy.get('table > tbody > tr').each((elem, index) => {
    if (elem.text().includes(specimenID)) {
      cy.wrap(elem).get(`[data-cy="${CypressIds.COMMON_TABLE_CHECKBOX}-${index}"]`).realClick();
      cy.wrap(elem).get(`[data-cy="${CypressIds.COMMON_CONTEXT_MENU}-${index}"]`).realClick();
      cy.wrap(elem)
        .get(`[data-cy="${CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_NEW_TRANSPORT_BUTTON}-${index}"]`)
        .click();
    }
  });
});

Cypress.Commands.add('GetElementText', (barcodeName, block) => {
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

export {};
