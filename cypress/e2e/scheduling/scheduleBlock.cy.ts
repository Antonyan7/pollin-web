import {addDays} from "date-fns";

import {CypressIds} from "../../../src/constants/cypressIds";
import {CyUtils} from "../../helpers/cypressIdsUtils";

const futureDate = addDays(new Date(), 1);

describe('block schedule', () => {

    before(() => {
        cy.clearCookies();

        const email = Cypress.env('userOneEmail');
        const pass = Cypress.env('userOnePassword');

        cy.SignInViaEmulator(email, pass)
    });

    it(`should verify block schedule and it displays in calendar`, () => {
        cy.visit('/scheduling/block-schedule');
        cy.url().should('include', '/scheduling/block-schedule')
        cy.fixture('test-data').then((data) => {
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_BLOCK_RESOURCE)).click()
            cy.get(`ul li`).contains(data.service_provider_2).click()

            // Choose start time
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_BLOCK_DATE_START)).click()
            cy.ScheduleDateAndTime(futureDate, 12)

            // Choose end time
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_BLOCK_DATE_END)).click()
            cy.ScheduleDateAndTime(futureDate, 14)

            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_BLOCK_PLACEHOLDER)).type(data.block_schedule_comment)
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_BLOCK_BUTTON_APPLY)).click()

            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_BLOCK_ALERT_MESSAGE_SUCCESS)).should('exist')

            cy.visit('/booking/appointments');
            cy.url().should('include', '/booking/appointments');
            cy.ChooseProvider(data.service_provider_2).then(() => {
                cy.SelectDate(futureDate).then(() => {
                    cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_LOADING_INDICATOR)).should('not.exist');
                    cy.get(CyUtils.getSelector(CypressIds.COMMON_FULL_CALENDAR_COMPONENT)).should(
                        'contain',
                        `${data.block_schedule_comment}`);
                });
            });
        });
    });
});
export {};