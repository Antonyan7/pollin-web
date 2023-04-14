// import { CypressIds } from '../../../../src/constants/cypressIds';
// import { CyUtils } from '../../../helpers/cypressIdsUtils';
//
// describe('create and edit encounters', () => {
//   before(() => {
//     cy.clearCookies();
//
//     const email = Cypress.env('userOneEmail');
//     const pass = Cypress.env('userOnePassword');
//
//     cy.SignInViaEmulator(email, pass);
//   });
//
//   it(`should verify create and edit encounters`, () => {
//     cy.visit('/patient-emr/list');
//     cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
//     cy.url().should('include', '/patient-emr/list');
//     cy.fixture('test-data').then((data) => {
//       cy.get(CyUtils.getSelector(CypressIds.PAGE_PATIENT_LIST_TABLE)).should('exist');
//       cy.get('table > tbody > tr')
//         .contains(data.e2e_patient_2)
//         .each((elem) => {
//           cy.wrap(elem).realClick();
//           cy.url().should('contain', '/patient-emr/details/');
//
//           cy.get(CyUtils.getSelector(CypressIds.PAGE_PATIENT_DETAILS_TAB_ENCOUNTERS)).should('exist').click();
//           cy.url().should('contain', '/encounters');
//
//           cy.CreateEncounter(data.encounter_type_1, data.encounter_note);
//           cy.EditEncounter(data.encounter_type_1, data.edited_encounter_note);
//           cy.get('.MuiTableBody-root').should('contain', data.edited_encounter_note);
//         });
//     });
//   });
// });
export {};
