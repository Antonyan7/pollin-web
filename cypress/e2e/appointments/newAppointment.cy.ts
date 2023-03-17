import {addDays, format} from "date-fns";

import {CypressIds} from "../../../src/constants/cypressIds";
import {CyUtils} from "../../helpers/cypressIdsUtils";

const futureDate = Number(format(addDays(new Date(), 3), 'd'));

describe('Appointments', () => {

    before(() => {
        cy.clearCookies();

        const email = Cypress.env('userOneEmail');
        const pass = Cypress.env('userOnePassword');

        cy.SignInViaEmulator(email, pass)
    });
    beforeEach(() => {
        cy.intercept(`/clinic-booking/v2/provider`).as('getProviders',)
        cy.visit('/booking/appointments');
        cy.url().should('include', '/booking/appointments')
    });

    it(`should verify new calendar button`, () => {
        cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_BUTTON_NEW_CALENDAR))
            .should('be.enabled').click()
        cy.url().should('include', '/booking/appointments')
    });

    it(`should verify adding new appointment flow`, () => {
        cy.fixture('test-data').then((data) => {
            cy.wait('@getProviders')
            cy.ChooseProvider(data.service_provider_1).then(() => {

                cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_BUTTON_NEW_APPOINTMENT))
                    .should('be.enabled').click()
                cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_DIALOG_FORM)).should('be.visible')

                cy.ChooseAppointmentType(data.service_type_1)

                cy.ChoosePatient(data.e2e_patient)

                cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_DESCRIPTION)).should('exist')

                cy.ChooseDateAndTime(futureDate, 9)

                cy.get(CyUtils.getSelector(CypressIds.COMMON_TIME_PICKER_BUTTON_SAVE))
                    .should('be.enabled').click()
                cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_BUTTON_ADD))
                    .should('be.enabled').click()

                cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_CREATE_SUCCESS_STATUS)).should("exist")

            });
        });
    });

    it(`should verify that appointment displays in calendar`, () => {
        cy.fixture('test-data').then((data) => {
            cy.wait('@getProviders')
            cy.ChooseProvider(data.service_provider_1).then(() => {

                cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_BUTTON_NEW_APPOINTMENT))
                    .should('be.enabled').click()
                cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_DIALOG_FORM)).should('be.visible')

                cy.ChooseAppointmentType(data.service_type_1)

                cy.ChoosePatient(data.e2e_patient)

                cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_DESCRIPTION)).should('exist')

                cy.ChooseDateAndTime(futureDate, 10)

                cy.get(CyUtils.getSelector(CypressIds.COMMON_TIME_PICKER_BUTTON_SAVE))
                    .should('be.enabled').click()
                cy.get(CyUtils.getSelector(CypressIds.MODAL_APPOINTMENTS_ADD_BUTTON_ADD))
                    .should('be.enabled').click()

                cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_CREATE_SUCCESS_STATUS)).should("exist")
                cy.get(CyUtils.getSelector(CypressIds.PAGE_APPOINTMENTS_DESKTOP_DATE_PICKER))
                    .should('exist').click()
                cy.get(`.MuiCalendarOrClockPicker-root`)
                    .contains(RegExp(`^${futureDate}$`)).click().then(() => {
                    cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_LOADING_INDICATOR)).should('not.exist')
                    cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_COMPONENT))
                        .should('contain', `${data.e2e_patient} |`)
                });
            });
        });
    });
});

export {};