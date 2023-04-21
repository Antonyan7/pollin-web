import { addDays, format, getMonth } from 'date-fns';

import { CypressIds } from '../../../../src/constants/cypressIds';
import { CyUtils } from '../../../helpers/cypressIdsUtils';
import { LabDestinations, TransportStatus } from '../../../helpers/helpers';

const futureDate = addDays(new Date(), 1);

describe('new transport', () => {
  before(() => {
    cy.clearCookies();

    const email = Cypress.env('userOneEmail');
    const pass = Cypress.env('userOnePassword');

    cy.SignInViaEmulator(email, pass);
  });

  beforeEach(() => {
    cy.visit('/clinic-test-results/specimen-tracking/transports');
    cy.url().should('include', '/clinic-test-results/specimen-tracking/transports');
    cy.get(CyUtils.getSelector(CypressIds.PAGE_SCHEDULING_TEMPLATES_LOADING_INDICATOR)).should('not.exist');
  });

  it(`should verify create new transport folder`, () => {
    const futureDayString = format(futureDate, 'd');
    const dateToSelect = RegExp(`^${futureDayString}$`);
    const currentMonth = getMonth(new Date());
    const futureMonth = getMonth(futureDate);

    cy.fixture('test-data').then((data) => {
      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_BUTTON))
        .should('exist')
        .click();
      cy.get(CyUtils.getSelector(CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_TRANSPORT_DATE_PICKER))
        .should('exist')
        .click();

      if (currentMonth !== futureMonth) {
        cy.get(`[data-testid="ArrowRightIcon"]`).should('exist').click();
        cy.get(`.MuiCalendarOrClockPicker-root`).should('contain', futureMonth);
      }

      cy.get(`.MuiCalendarPicker-root`).contains(dateToSelect).click();
      cy.CreateNewTransportFolder(data.new_transport_name, LabDestinations.SickKids);

      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_DATE_PICKER)).click();

      if (currentMonth !== futureMonth) {
        cy.get(`[data-testid="ArrowRightIcon"]`).should('exist').click();
        cy.get(`.MuiCalendarOrClockPicker-root`).should('contain', futureMonth);
      }

      cy.get(`.MuiCalendarPicker-root`).contains(dateToSelect).click();

      cy.get(CyUtils.getSelector(CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST))
        .should('contain', data.new_transport_name)
        .should('contain', TransportStatus.ReadyForTransport)
        .should('contain', LabDestinations.SickKids);
    });
  });
});

export {};
