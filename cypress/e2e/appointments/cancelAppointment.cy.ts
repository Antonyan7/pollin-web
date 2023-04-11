import { addDays } from 'date-fns';

import { CypressIds } from '../../../src/constants/cypressIds';
import { CyUtils } from '../../helpers/cypressIdsUtils';
import { CancellationReasonEnum, StatusesEnum } from '../../helpers/helpers';

const futureDate = addDays(new Date(), 1);

describe('Cancel Appointments', () => {
  before(() => {
    cy.clearCookies();

    const email = Cypress.env('userOneEmail');
    const pass = Cypress.env('userOnePassword');

    cy.SignInViaEmulator(email, pass);
  });
  it(`should cancel appointment from edit appointment pop-up`, () => {
    cy.visit('/booking/appointments');
    cy.url().should('include', '/booking/appointments');
    cy.fixture('test-data').then((data) => {
      cy.ChooseProvider(data.service_provider_1).then(() => {
        cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_BUTTON_NEW_APPOINTMENT)).should('be.enabled').click();
        cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_DIALOG_FORM)).should('be.visible');

        cy.ChooseAppointmentType(data.service_type_1);

        cy.ChoosePatient(data.e2e_patient);

        cy.ChooseDateAndTime(futureDate, 15);

        cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_BUTTON_ADD)).should('be.enabled').click();
        cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_CREATE_SUCCESS_STATUS)).should('exist');

        cy.SelectDate(futureDate)
          .then(() => {
            cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_LOADING_INDICATOR)).should('not.exist');
            cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_COMPONENT)).should(
              'contain',
              StatusesEnum.Booked
            );
            cy.contains(StatusesEnum.Booked).click({ force: true });
            cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_CLOSE_ICON)).should('exist');
            cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_BUTTON_CANCEL)).should('be.enabled').click();

            cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_CONFIRM_CANCEL_SELECT_REASON))
              .should('exist')
              .click();
            cy.get(`ul li`).contains(CancellationReasonEnum.PersonalEmergency).click();

            cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_CONFIRM_CANCEL_BUTTON_CONFIRM))
              .should('be.enabled')
              .click({ force: true });

            cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_CANCEL_SUCCESS_STATUS)).should('exist').click();
            cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_COMPONENT)).should(
              'contain',
              `${data.e2e_patient} | ${data.e2e_patient_short} | ${StatusesEnum.Cancelled}`
            );
          });
      });
    });
  });
});
export {};
