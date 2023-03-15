import { CypressIds } from '../../src/constants/cypressIds';
import { CyUtils } from '../helpers/cypressIdsUtils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      ChooseProvider(provider: string): Chainable<void>;
      ChooseAppointmentType(serviceType: string): Chainable<void>;
      ChoosePatient(patient: string): Chainable<void>;
      ChooseDateAndTime(date: number, time: number): Chainable<void>;
    }
  }
}

Cypress.Commands.add('ChooseProvider', (provider) => {
  cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_SELECT_RESOURCE)).should('be.visible').click();
  cy.get(`ul li`).contains(provider).click();

  cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_LOADING_INDICATOR)).should('not.exist');
});

Cypress.Commands.add('ChooseAppointmentType', (serviceType) => {
  cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_SELECT_SERVICE_TYPE)).should('exist').click();
  cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_SELECT_SERVICE_TYPE)).type(serviceType);
  cy.get(`ul li`).contains(serviceType).click();
});

Cypress.Commands.add('ChoosePatient', (patient) => {
  cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_SELECT_PATIENT)).should('exist').click();
  cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_SELECT_PATIENT)).type(patient);
  cy.get(`ul li`).contains(patient).click();
});

Cypress.Commands.add('ChooseDateAndTime', (date, time) => {
  // when looking for 20, cypress is looking for text containing 20 which can be 2023
  // regexp used to match exactly 20
  const dateToSelect = RegExp(`^${date}$`);

  cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_DATE_AND_START_TIME)).should('exist').click();

  cy.get(CyUtils.getSelector(CypressIds.COMMON_TIME_PICKER_MODAL_DIALOG_COMPONENT)).should('be.visible');
  cy.get(CyUtils.getSelector(CypressIds.COMMON_TIME_PICKER_MODAL_DIALOG_COMPONENT)).contains(dateToSelect).click();
  cy.get(CyUtils.getSelector(CypressIds.COMMON_TIME_PICKER_MODAL_DIALOG_COMPONENT)).contains(time).realClick();
});
export {};
