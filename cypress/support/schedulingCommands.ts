import {CypressIds} from '../../src/constants/cypressIds';
import {CyUtils} from '../helpers/cypressIdsUtils';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            ChooseStartTime(hours: number, minutes: number): Chainable<void>;

            ChooseEndTime(hours: number, minutes: number): Chainable<void>;
        }
    }
}

Cypress.Commands.add('ChooseStartTime', (hours, minutes) => {
    cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_START)).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)
    cy.get(`.MuiCalendarOrClockPicker-root`).contains(hours).realClick();
    cy.get(`.MuiCalendarOrClockPicker-root`).contains(minutes).realClick();
});

Cypress.Commands.add('ChooseEndTime', (hours, minutes) => {
    cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_END)).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)
    cy.get(`.MuiCalendarOrClockPicker-root`).contains(hours).realClick();
    cy.get(`.MuiCalendarOrClockPicker-root`).contains(minutes).realClick();
});
export {};
