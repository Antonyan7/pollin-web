import { CypressIds } from '../../src/constants/cypressIds';
import { CyUtils } from '../helpers/cypressIdsUtils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      AddNewTransportFolder(name: string, lab: string): Chainable<void>;

      AddToNewExistingTransport(specimenID: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('AddNewTransportFolder', (name, lab) => {
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
  cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_LIST_SEARCH))
    .type(specimenID)
    .realPress('{enter}');

  cy.get('table > tbody > tr').each((elem, index) => {
    if (elem.text().includes(specimenID)) {
      cy.wrap(elem).get(`[data-cy="${CypressIds.COMMON_TABLE_CHECKBOX}-${index}"]`).realClick();
      cy.wrap(elem).get(`[data-cy="${CypressIds.COMMON_CONTEXT_MENU}-${index}"]`).realClick();

      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_ALL_TEST_NEW_TRANSPORT_BUTTON)).click();
    }
  });
});
export {};
