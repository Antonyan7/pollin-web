declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      SignInViaEmulator(email: string, pass: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('SignInViaEmulator', (email, pass) => {
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

export {};
