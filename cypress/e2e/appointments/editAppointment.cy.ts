import dayjs from 'dayjs';

import {CypressIds} from "../../../src/constants/cypressIds";
import {CyUtils} from "../../helpers/cypressIdsUtils";
import {StatusesEnum} from "../../helpers/helpers";

const futureDate = Number(dayjs().add(2, 'day').format('D'));

describe('Edit appointments', () => {

    before(() => {
        cy.clearCookies();

        const email = Cypress.env('userOneEmail');
        const pass = Cypress.env('userOnePassword');

        cy.SignInViaEmulator(email, pass)

    });

    it(`should edit appointment's description and status fields`, () => {
        cy.intercept(`/clinic-booking/v2/provider`).as('getProviders',)
        cy.visit('/booking/appointments');
        cy.url().should('include', '/booking/appointments')
        cy.fixture('test-data').then((data) => {
            cy.wait('@getProviders')
            cy.ChooseProvider(data.service_provider_1).then(() => {

                cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_BUTTON_NEW_APPOINTMENT))
                    .should('be.enabled').click()
                cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_DIALOG_FORM)).should('be.visible')

                cy.ChooseAppointmentType(data.service_type_1)

                cy.ChoosePatient(data.e2e_patient)

                cy.ChooseDateAndTime(futureDate, 7)
                cy.get(CyUtils.getSelector(CypressIds.COMMON_TIME_PICKER_BUTTON_SAVE))
                    .should('be.enabled').click()

                cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_BUTTON_ADD))
                    .should('be.enabled').click()
                cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_CREATE_SUCCESS_STATUS))
                    .should("exist")
                cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_DESKTOP_DATE_PICKER))
                    .should('exist').click()
                cy.get(`.MuiCalendarOrClockPicker-root`)
                    .contains(futureDate).click().then(() => {

                    cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_LOADING_INDICATOR)).should('not.exist')
                    cy.contains(StatusesEnum.Booked).click({force: true})
                    cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_CLOSE_ICON)).should("exist")


                    cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_DESCRIPTION))
                        .should("be.visible")
                        .clear()
                        .type('Edited')
                    cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_BUTTON_STATUS))
                        .should("exist").click()
                    cy.get(`ul li`).contains(StatusesEnum.RunningLate).click()

                    cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_EDIT_BUTTON_SAVE))
                        .should("be.enabled").click({force: true})

                    cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_EDIT_SUCCESS_STATUS))
                        .should("exist")
                });
            });
        });
    });
});

export {};