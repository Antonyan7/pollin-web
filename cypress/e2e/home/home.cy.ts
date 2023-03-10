describe('Booking Appointments', () => {
  before(() => {
    cy.clearCookies();
  });

  const email = Cypress.env('userOneEmail');
  const pass = Cypress.env('userOnePassword');
  const serviceProviderName = 'Test_Service_Provider';

  it('Sign in with email/password via emulator, should show singed in state', () => {
    cy.visit('http://localhost:3000');

    cy.window()
      .its('cypressEmailsPassSingIn')
      .then((cypressEmailsPassSingIn) => {
        cy.wrap(
          (async () => {
            await cypressEmailsPassSingIn(email, pass);
          })()
        );
      });

    cy.get('h2').contains('Pollin Portal').should('exist');
  });

  it(`Open appointment pages, click on resources, should show at least one provider`, () => {
    cy.visit('http://localhost:3000/booking/appointments');
    cy.url().should('include', '/booking/appointments');

    // Should have at least one service provider
    cy.get(`[data-cy="page.appointments.select.resource"]`).should('be.visible').click();
    cy.get('ul').its('length').should('be.gte', 1);

    cy.get(`ul`).children().contains(serviceProviderName).click();
  });
});

export {};
