import { CypressIds } from '../../src/constants/cypressIds';
import { CyUtils } from '../helpers/cypressIdsUtils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      CreateEncounter(type: string, note: string): Chainable<void>;
      EditEncounter(type: string, editedNote: string): Chainable<void>;
      CreateAddendum(type: string, addendumNote: string): Chainable<void>;
    EditAddendum(type: string, editedNote: string): Chainable<void>;}
  }
}

Cypress.Commands.add('CreateEncounter', (type, note) => {
  cy.get(CyUtils.getSelector(CypressIds.PAGE_PATIENT_ENCOUNTERS_CREATE_ENCOUNTER_BTN)).should('exist').click();
  cy.url().should('contain', '/add-note');

  cy.get(CyUtils.getSelector(CypressIds.PAGE_PATIENT_CREATE_ENCOUNTER_TYPE_SELECT)).should('exist').click();
  cy.get(`ul li`).contains(type).click();

  cy.get(`[id="common.text.editor.text.field"]`).should('exist').type(note);
  cy.get(CyUtils.getSelector(CypressIds.COMMON_TEXT_EDITOR_SAVE_BTN)).should('exist').click();
  cy.url().should('contain', '/encounters');
  cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
  cy.get('.MuiTableBody-root').should('contain', note);
});

Cypress.Commands.add('EditEncounter', (type, editedNote) => {
  cy.get(`table > tbody`)
    .contains(type)
    .each((encounter, index) => {
      cy.wrap(encounter).get(`[data-cy="${CypressIds.PAGE_PATIENT_ENCOUNTERS_ITEM}-${index}"]`).realClick();
      cy.url().should('contain', '/encounters/encounter/');
      cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');

      cy.get(CyUtils.getSelector(CypressIds.PAGE_PATIENT_EDIT_ENCOUNTER_BTN)).should('exist').click();
      cy.url().should('contain', '/edit-note');
      cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');

      // It is unsafe to chain further commands that rely on the subject after .clear().
      const qlEditor = '[id="common.text.editor.text.field"] .ql-editor';

      cy.get(qlEditor).focus();
      cy.get(qlEditor).clear();
      cy.get(qlEditor).type(editedNote);
      cy.get(CyUtils.getSelector(CypressIds.COMMON_TEXT_EDITOR_SAVE_BTN)).should('exist').click();
      cy.url().should('contain', '/encounters/encounter/');
      cy.get(CyUtils.getSelector(CypressIds.PAGE_PATIENT_DETAILS_BACK_BTN)).should('exist').click();
      cy.url().should('contain', '/encounters');
      cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
    });
});

Cypress.Commands.add('CreateAddendum', (type, addendumNote) => {
  cy.get(`table > tbody`)
    .contains(type)
    .each((encounter, index) => {
      cy.wrap(encounter).get(`[data-cy="${CypressIds.PAGE_PATIENT_ENCOUNTERS_ITEM}-${index}"]`).realClick();
      cy.url().should('contain', '/encounters/encounter/');
      cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');

      cy.get(CyUtils.getSelector(CypressIds.PAGE_PATIENT_DETAILS_ADD_ADDENDUM_BTN)).should('exist').click();
      cy.url().should('contain', '/add-addendum');
      cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');
      cy.get(`[id="common.text.editor.text.field"]`).should('exist').type(addendumNote);

      cy.get(CyUtils.getSelector(CypressIds.COMMON_TEXT_EDITOR_SAVE_BTN)).should('exist').click();
      cy.url().should('contain', '/encounters/encounter/');
      cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist');

      cy.get('.MuiPaper-root').should('contain', addendumNote);
    });
});

Cypress.Commands.add('EditAddendum', (type, editedNote) => {
    cy.get('.MuiPaper-root')
        .contains(type)
        .each((encounter, index) => {
            cy.wrap(encounter).get(`[data-cy="${CypressIds.PAGE_PATIENT_DETAILS_ADDENDUM_EDIT_ICON}-${index}"]`).realClick()
            cy.url().should('contain', '/edit-addendum')
            cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist')

            cy.get(`[id="common.text.editor.text.field"] .ql-editor`).focus().clear().type(editedNote)

            cy.get(CyUtils.getSelector(CypressIds.COMMON_TEXT_EDITOR_SAVE_BTN)).should('exist').click()
            cy.url().should('contain', '/encounters/encounter/')
            cy.get(CyUtils.getSelector(CypressIds.COMMON_LOADING_INDICATOR)).should('not.exist')
        });
});
export {};
