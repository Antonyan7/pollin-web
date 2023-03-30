import {format, getMonth} from "date-fns";

import {CypressIds} from '../../src/constants/cypressIds';
import {CyUtils} from '../helpers/cypressIdsUtils';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            ChooseProvider(provider: string): Chainable<void>;
            ChooseAppointmentType(serviceType: string): Chainable<void>;
            ChoosePatient(patient: string): Chainable<void>;
            ChooseDateAndTime(futureDate: Date, time: number): Chainable<void>;
            SelectDate(futureDate: Date): Chainable<void>;
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

Cypress.Commands.add('ChooseDateAndTime', (futureDate, time) => {
    // when looking for 20, cypress is looking for text containing 20 which can be 2023
    // regexp used to match exactly 20
    const futureDayString = format(futureDate, 'd');
    const dateToSelect = RegExp(`^${futureDayString}$`);
    const currentMonth = getMonth(new Date())
    const futureMonth = getMonth(futureDate)

    cy.get(CyUtils.getSelector(CypressIds.COMMON_DATE_TIME_PICKER)).should('exist').click();
    cy.get(CyUtils.getSelector(CypressIds.COMMON_TIME_PICKER_MODAL_DIALOG_COMPONENT)).should('be.visible');

    if (currentMonth !== futureMonth) {
        cy.get(`[data-testid="ArrowRightIcon"]`).should("exist").realClick()
    }

    cy.get(CyUtils.getSelector(CypressIds.COMMON_TIME_PICKER_MODAL_DIALOG_COMPONENT)).contains(dateToSelect).click();
    cy.get(CyUtils.getSelector(CypressIds.COMMON_TIME_PICKER_MODAL_DIALOG_COMPONENT)).contains(time).realClick();
});
Cypress.Commands.add('SelectDate', (futureDate) => {
    const futureDayString = format(futureDate, 'd');
    const dateToSelect = RegExp(`^${futureDayString}$`);
    const currentMonth = getMonth(new Date())
    const futureMonth = getMonth(futureDate)

    cy.get(CyUtils.getSelector(CypressIds.COMMON_DATE_PICKER)).should('exist').click();
    cy.get(`.MuiCalendarOrClockPicker-root`).should('contain',currentMonth)

    if (currentMonth !== futureMonth) {
        cy.get(`[data-testid="ArrowRightIcon"]`).should("exist").click()
        cy.get(`.MuiCalendarOrClockPicker-root`).should('contain',futureMonth)
    }

    cy.get(`.MuiCalendarOrClockPicker-root`)
        .contains(dateToSelect)
        .click()
});
export {};
