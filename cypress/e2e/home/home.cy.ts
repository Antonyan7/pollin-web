describe('Cypress experiment', () => {
  it('should log simple string', () => {
    cy.log(String(1));
  });
});

export {};
