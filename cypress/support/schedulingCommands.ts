import { format, getMonth } from 'date-fns';

import { CypressIds } from '../../src/constants/cypressIds';
import { CyUtils } from '../helpers/cypressIdsUtils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      ChooseStartTime(hours: string, minutes: string): Chainable<void>;

      ChooseEndTime(hours: string, minutes: string): Chainable<void>;

      ScheduleDateAndTime(futureDate: Date, time: number): Chainable<void>;

      SelectApplyDate(date: Date): Chainable<void>;
    }
  }
}

Cypress.Commands.add('ChooseStartTime', (hours, minutes) => {
  cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_START)).click();
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(2000);
  cy.get(`.MuiCalendarOrClockPicker-root`).contains(hours).realClick();
  cy.get(`.MuiCalendarOrClockPicker-root`).contains(minutes).realClick();
});

Cypress.Commands.add('ChooseEndTime', (hours, minutes) => {
  cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_END)).click();
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(2000);
  cy.get(`.MuiCalendarOrClockPicker-root`).contains(hours).realClick();
  cy.get(`.MuiCalendarOrClockPicker-root`).contains(minutes).realClick();
});

Cypress.Commands.add('ScheduleDateAndTime', (futureDate, time) => {
  const futureDayString = format(futureDate, 'd');
  const dateToSelect = RegExp(`^${futureDayString}$`);
  const currentMonth = getMonth(new Date());
  const futureMonth = getMonth(futureDate);

  cy.get(`.MuiDialogContent-root`).should('be.visible');

  if (currentMonth !== futureMonth) {
    cy.get(`[data-testid="ArrowRightIcon"]`).should('exist').realClick();
  }

  cy.get(`.MuiCalendarPicker-root`).contains(dateToSelect).click();
  cy.get(`.MuiClockPicker-root`).contains(time).realClick();

  cy.get(CyUtils.getSelector(CypressIds.COMMON_TIME_PICKER_BUTTON_SAVE)).should('exist').click();
});

Cypress.Commands.add('SelectApplyDate', (date) => {
  const futureDayString = format(date, 'd');
  const dateToSelect = RegExp(`^${futureDayString}$`);
  const currentMonth = getMonth(new Date());
  const futureMonth = getMonth(date);

  cy.get(`.MuiCalendarOrClockPicker-root`).should('contain', currentMonth);

  if (currentMonth !== futureMonth) {
    cy.get(`[data-testid="ArrowRightIcon"]`).should('exist').click();
    cy.get(`.MuiCalendarOrClockPicker-root`).should('contain', futureMonth);
  }

  cy.get(`.MuiCalendarOrClockPicker-root`).contains(dateToSelect).click();
});
export {};
