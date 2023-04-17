import { CypressIds } from '../../src/constants/cypressIds';
import { CyUtils } from '../helpers/cypressIdsUtils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      AddNewTransportFolder(name: string, lab: string): Chainable<void>;
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
export {};
