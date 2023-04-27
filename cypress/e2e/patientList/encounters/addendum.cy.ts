import { CypressIds } from '../../../../src/constants/cypressIds';
import { CyUtils } from '../../../helpers/cypressIdsUtils';

describe('create and edit addendum', () => {
  before(() => {
    cy.clearCookies();

    const email = Cypress.env('userOneEmail');
    const pass = Cypress.env('userOnePassword');

    cy.SignInViaEmulator(email, pass);
  });

  it(`should verify create addendum`, () => {
    cy.visit('/patient-emr/list');
    cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
    cy.url().should('include', '/patient-emr/list');
    cy.fixture('test-data').then((data) => {
      cy.get(CyUtils.getSelector(CypressIds.PAGE_PATIENT_LIST_TABLE)).should('exist');
      cy.get('table > tbody > tr')
        .contains(data.e2e_patient_2)
        .each((elem) => {
          cy.wrap(elem).realClick();
          cy.url().should('contain', '/patient-emr/details/');

          cy.get(CyUtils.getSelector(CypressIds.PAGE_PATIENT_DETAILS_TAB_ENCOUNTERS)).should('exist').click();
          cy.url().should('contain', '/encounters');

          cy.CreateEncounter(data.encounter_type_2, data.encounter_note_2);
          cy.CreateAddendum(data.encounter_type_2, data.addendum_note);
          // Will be uncommented after 8530 bug fix
          // cy.EditAddendum(data.encounter_type_2, data.edited_addendum_note);
        });
    });
  });
});
export {};
