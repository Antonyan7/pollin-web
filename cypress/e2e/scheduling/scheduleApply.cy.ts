import {addDays} from "date-fns";

import {CypressIds} from "../../../src/constants/cypressIds";
import {CyUtils} from "../../helpers/cypressIdsUtils";
import {TemplateStatus} from "../../helpers/helpers";

const startDate = addDays(new Date(), 1);
const endDate = addDays(new Date(), 8);
const blockStartDate = addDays(new Date(), 3);
const blockEndDate = addDays(new Date(), 10);

describe('apply schedule', () => {

    before(() => {
        cy.clearCookies();

        const email = Cypress.env('userOneEmail');
        const pass = Cypress.env('userOnePassword');

        cy.SignInViaEmulator(email, pass)

    });

    beforeEach(() => {
        cy.visit('/scheduling/schedule-templates');
        cy.url().should('include', '/scheduling/schedule-templates')
        cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should("not.exist")
        cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_BUTTON_CREATE))
            .should("be.enabled").click()
        cy.url().should('include', '/scheduling/create-template')

    });

    it(`should apply schedule with service type template`, () => {
        cy.fixture('test-data').then((data) => {
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)).type(data.templateName4)
            // saturday checkbox
            cy.get(`[data-cy="${CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_CHECKBOX_WEEKDAYS}-5"]`).click()

            cy.ChooseStartTime('7', '00')
            cy.ChooseEndTime('18', '00')

            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPES)).click()
            cy.get(`ul li`).contains(data.service_type_2).click()
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER)).type(data.apply_schedule_comment_1)
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE))
                .should("be.enabled").click()
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_SUCCESSFULLY_CREATED_MESSAGE)).should('exist');


            cy.url().should('include', '/scheduling/schedule-templates')
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should("not.exist")
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_TEMPLATES_TABLE))
                .should("contain", data.templateName4)
                .should("contain", TemplateStatus.Complete)

            cy.visit('/scheduling/apply-schedule');
            cy.url().should('include', '/scheduling/apply-schedule')
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_RESOURCE)).click()
            cy.get(`ul li`).contains(data.service_provider_2).click()

            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_TEMPLATE)).click()
            cy.get(`ul li`).contains(data.templateName4).click()

            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_EVERY)).click()
            cy.get(`ul li`).contains('1 Week').click()

            // Choose start date
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_DATE_START)).click();
            cy.SelectApplyDate(startDate)

            // Choose end date
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_DATE_END)).click();
            cy.SelectApplyDate(endDate)

            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_BUTTON_APPLY)).should("be.enabled").click();
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_ALERT_SUCCESS)).should('exist');
        });
    });

    it(`should apply schedule with block template`, () => {
        cy.fixture('test-data').then((data) => {
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)).type(data.templateName5)
            // sunday checkbox
            cy.get(`[data-cy="${CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_CHECKBOX_WEEKDAYS}-6"]`).click()

            cy.ChooseStartTime('7', '00')
            cy.ChooseEndTime('18', '00')

            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_BLOCK)).click();
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER)).type(data.apply_schedule_comment_2)
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE))
                .should("be.enabled").click()
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_SUCCESSFULLY_CREATED_MESSAGE)).should('exist');


            cy.url().should('include', '/scheduling/schedule-templates')
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should("not.exist")
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_TEMPLATES_TABLE))
                .should("contain", data.templateName5)
                .should("contain", TemplateStatus.Complete)

            cy.visit('/scheduling/apply-schedule');
            cy.url().should('include', '/scheduling/apply-schedule')
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_RESOURCE)).click()
            cy.get(`ul li`).contains(data.service_provider_2).click()

            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_TEMPLATE)).click()
            cy.get(`ul li`).contains(data.templateName5).click()

            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_EVERY)).click()
            cy.get(`ul li`).contains('1 Week').click()

            // Choose start date
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_DATE_START)).click();
            cy.SelectApplyDate(blockStartDate)

            // Choose end date
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_DATE_END)).click();
            cy.SelectApplyDate(blockEndDate)

            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_BUTTON_APPLY)).should("be.enabled").click();
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_APPLY_ALERT_SUCCESS)).should('exist');
        });
    });
});
export {};