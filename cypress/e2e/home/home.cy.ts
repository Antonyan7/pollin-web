describe('Booking Appointments', () => {
  before(() => {
    cy.clearCookies();
  });

  it('Sign in with email/password via emulator, should show singed in state', () => {
    cy.visit('http://localhost:3000');

    const email = Cypress.env('userOneEmail');
    const pass = Cypress.env('userOnePassword');

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

    cy.get('button[title="Open"]').click();

    // Should have at least one service provider
    cy.get('ul').its('length').should('be.gte', 1);
  });
});

export {};
