import {CypressIds} from '../../../src/constants/cypressIds';
import {CyUtils} from '../../helpers/cypressIdsUtils';

describe('edit and delete templates', () => {
    before(() => {
        cy.clearCookies();

        const email = Cypress.env('userOneEmail');
        const pass = Cypress.env('userOnePassword');

        cy.SignInViaEmulator(email, pass);

        cy.visit('/scheduling/schedule-templates');
        cy.url().should('include', '/scheduling/schedule-templates')
        cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_TEMPLATES_TABLE))
            .should("exist")
            .then((table) => {

                cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should("not.exist")
                // eslint-disable-next-line cypress/no-unnecessary-waiting
                cy.wait(2000)
                    .then(() => {

                        const tableLength = table.children('tbody').children('tr').length

                        if (tableLength > 0) {
                            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_CHECKBOX_SELECT_ALL)).should("exist").realClick()
                            // eslint-disable-next-line cypress/no-unnecessary-waiting
                            cy.wait(2000)
                            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_BUTTON_DELETE)).should("exist").click()
                            cy.get(CyUtils.getSelector(CypressIds.MODAL_SCHEDULING_DELETION_BUTTON_CONFIRM)).should("exist").realClick()

                            cy.log(`List has items`)
                        } else {
                            cy.log(`List is empty`)
                        }

                    })
            })


        cy.url().should('include', '/scheduling/schedule-templates');
        cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should('not.exist');
        cy.fixture('test-data').then((data) => {
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_BUTTON_CREATE)).should('be.enabled').click();
            cy.url().should('include', '/scheduling/create-template');
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)).type(data.templateName3);
            // Wednesday checkbox
            cy.get(`[data-cy="${CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_CHECKBOX_WEEKDAYS}-2"]`).click();

            cy.ChooseStartTime(10, 30);
            cy.ChooseEndTime(12, 30);

            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPES)).click();
            cy.get(`ul li`).contains(data.service_type_2).click();
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER)).type(data.comment);
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE)).should('be.enabled').click();

            cy.url().should('include', '/scheduling/schedule-templates');
            cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should('not.exist');
        });
    });

    it(`should view schedule from lists view`, () => {
        cy.get(`[data-cy="${CypressIds.PAGE_SCHEDULING_TEMPLATES_CHECKBOX_SELECT}-0"]`).click();
        cy.get(`[data-cy="${CypressIds.PAGE_SCHEDULING_TEMPLATES_VISIBILITY_ICON}-0"]`).should('exist').click();
        cy.url().should('include', '/scheduling/view-schedule');
    });

    it(`should edit template`, () => {
        cy.visit('/scheduling/schedule-templates');
        cy.url().should('include', '/scheduling/schedule-templates');
        cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should('not.exist');
        cy.fixture('test-data').then((data) => {
            cy.get(`table > tbody > tr`).each((elem, index) => {
                if (elem.text().includes(data.templateName3)) {
                    cy.wrap(elem).realClick();
                    cy.wrap(elem).get(`[data-cy="${CypressIds.PAGE_SCHEDULING_TEMPLATES_EDIT_ICON}-${index}"]`).realClick();
                }

                cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should('not.exist');

                cy.get(`[data-cy="${CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_CHECKBOX_WEEKDAYS}-2"]`).click();
                // thursday and friday checkboxes
                cy.get(`[data-cy="${CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_CHECKBOX_WEEKDAYS}-3"]`).click();
                cy.get(`[data-cy="${CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_CHECKBOX_WEEKDAYS}-4"]`).click();

                cy.ChooseStartTime(13, 30);
                cy.ChooseEndTime(15, 10);

                });
        });
    });
    it(`should delete template`, () => {
        cy.visit('/scheduling/schedule-templates');
        cy.url().should('include', '/scheduling/schedule-templates')
        cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should("not.exist")
        cy.fixture('test-data').then((data) => {

            cy.get(`table > tbody > tr`)
                .each((elem, index) => {
                    if (elem.text().includes(data.templateName3)) {
                        cy.wrap(elem).realClick()
                        cy.wrap(elem).get(`[data-cy="${CypressIds.PAGE_SCHEDULING_TEMPLATES_CHECKBOX_SELECT}-${index}"]`).realClick()
                    }

                    cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_BUTTON_DELETE)).should("exist").click()
                    // eslint-disable-next-line cypress/no-unnecessary-waiting
                    cy.wait(2000)
                    cy.get(CyUtils.getSelector(CypressIds.MODAL_SCHEDULING_DELETION_BUTTON_CONFIRM)).should("exist").realClick()
                    cy.url().should('include', '/scheduling/schedule-templates')
                    cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should("not.exist")
                    cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_TEMPLATES_TABLE)).should("not.have.text", data.templateName3)
                });
        });
    });
});
export {};