import { addDays } from 'date-fns';

import { CypressIds } from '../../../src/constants/cypressIds';
import { CyUtils } from '../../helpers/cypressIdsUtils';
import { StatusesEnum } from '../../helpers/helpers';

const futureDate = addDays(new Date(), 2);
const editedFutureDate = addDays(new Date(), 4);

describe('Edit appointments', () => {
  beforeEach(() => {
    cy.clearCookies();

    const email = Cypress.env('userOneEmail');
    const pass = Cypress.env('userOnePassword');

    cy.SignInViaEmulator(email, pass);

    cy.visit('/booking/appointments');
    cy.url().should('include', '/booking/appointments');
    cy.fixture('test-data').then((data) => {
      cy.ChooseProvider(data.service_provider_1).then(() => {
        cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_BUTTON_NEW_APPOINTMENT)).should('be.enabled').click();
        cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_DIALOG_FORM)).should('be.visible');

        cy.ChooseAppointmentType(data.service_type_1);

        cy.ChoosePatient(data.e2e_patient);

        cy.ChooseDateAndTime(futureDate, 7);

        cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_BUTTON_ADD)).should('be.enabled').click();
        cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_CREATE_SUCCESS_STATUS)).should('exist');
      });
    });
  });

  it(`should edit appointment's description and status fields`, () => {
    cy.visit('/booking/appointments');
    cy.url().should('include', '/booking/appointments');
    cy.fixture('test-data').then((data) => {
      cy.ChooseProvider(data.service_provider_1).then(() => {
        cy.SelectDate(futureDate).then(() => {
          cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_LOADING_INDICATOR)).should('not.exist');
          cy.contains(StatusesEnum.Booked).click({ force: true });
          cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_CLOSE_ICON)).should('exist');
          cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_DESCRIPTION)).should('be.visible');
          // It is unsafe to chain further commands that rely on the subject after .clear().
          cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_DESCRIPTION)).clear();
          cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_DESCRIPTION)).type('Edited');
          cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_BUTTON_STATUS)).should('exist').click();
          cy.get(`ul li`).contains(StatusesEnum.RunningLate).click();

          cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_BUTTON_SAVE)).should('be.enabled').click();

          cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_EDIT_SUCCESS_STATUS)).should('exist');

          cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_LOADING_INDICATOR)).should('not.exist');
          cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_COMPONENT)).should(
            'contain',
            `${data.e2e_patient} | ${data.service_type_1_short} | RunningLate`
          );
        });
      });
    });
  });

  it(`should edit booked appointment's date and displays in calendar under edited date`, () => {
    cy.visit('/booking/appointments');
    cy.url().should('include', '/booking/appointments');
    cy.fixture('test-data').then((data) => {
      cy.ChooseProvider(data.service_provider_1).then(() => {
        cy.SelectDate(futureDate).then(() => {
          cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_LOADING_INDICATOR)).should('not.exist');
          cy.contains(StatusesEnum.Booked).click({ force: true });
          cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_CLOSE_ICON)).should('exist');

          cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_BUTTON_SAVE)).should('be.disabled');
          cy.ChooseDateAndTime(editedFutureDate, 12);

          cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_BUTTON_SAVE)).should('be.enabled').click();

          cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_EDIT_SUCCESS_STATUS)).should('exist');
        });
        cy.SelectDate(editedFutureDate).then(() => {
          cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_LOADING_INDICATOR)).should('not.exist');
          cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_COMPONENT)).should(
            'contain',
            `${data.e2e_patient}`
          );
        });
      });
    });
  });
});

export {};
