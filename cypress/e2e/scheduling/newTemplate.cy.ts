import { CypressIds } from '../../../src/constants/cypressIds';
import { CyUtils } from '../../helpers/cypressIdsUtils';

describe('new template', () => {
  before(() => {
    cy.clearCookies();

    const email = Cypress.env('userOneEmail');
    const pass = Cypress.env('userOnePassword');

    cy.SignInViaEmulator(email, pass);
  });

  beforeEach(() => {
    cy.visit('/scheduling/schedule-templates');
    cy.url().should('include', '/scheduling/schedule-templates');
    cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should('not.exist');
    cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_BUTTON_CREATE)).should('be.enabled').click();
    cy.url().should('include', '/scheduling/create-template');
  });

  it(`should verify create new service type template`, () => {
    cy.fixture('test-data').then((data) => {
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)).type(data.templateName1);
      // Monday checkbox
      cy.get(`[data-cy="${CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_CHECKBOX_WEEKDAYS}-0"]`).click();

      cy.ChooseStartTime(10, 10);
      cy.ChooseEndTime(10, 30);

      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPES)).click();
      cy.get(`ul li`).contains(data.service_type_2).click();
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER)).type(data.comment);
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE)).should('be.enabled').click();

      cy.url().should('include', '/scheduling/schedule-templates');
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_TEMPLATES_TABLE)).should(
        'contain',
        data.templateName1
      );
    });
  });

  it(`should verify create new block template`, () => {
    cy.fixture('test-data').then((data) => {
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME)).type(data.templateName2);
      // Monday and tuesday checkboxes
      cy.get(`[data-cy="${CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_CHECKBOX_WEEKDAYS}-0"]`).click();
      cy.get(`[data-cy="${CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_CHECKBOX_WEEKDAYS}-1"]`).click();

      cy.ChooseStartTime(12, 10);
      cy.ChooseEndTime(12, 30);

      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_BLOCK)).click();
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER)).type(data.comment);
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_BUTTON_SAVE)).should('be.enabled').click();

      cy.url().should('include', '/scheduling/schedule-templates');
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_TEMPLATES_TABLE)).should(
        'contain',
        data.templateName2
      );
    });
  });
});
export {};
