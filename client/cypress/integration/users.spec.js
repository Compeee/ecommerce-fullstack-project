describe("Project landing page", () => {
  it("should open", () => {
    cy.visit("/");
    cy.contains("Ecommerce");
    cy.get("h1.main-navigation__title").should("contain", "Ecommerce");
  });

  it("Should open the authentication form when clicking Authenticate", () => {
    cy.visit("/");
    cy.contains("AUTHENTICATE").click();
    cy.url().should("include", "/auth");

    cy.contains("Login required");
    cy.contains("Signup instead?").click();
    cy.get(".button--inverse").should("not.contain", "Signup instead?");
    cy.contains("Login instead?").click();
    cy.get(".button--inverse").should("not.contain", "Login instead?");
  });

  it("should signup a user", () => {
    cy.visit("/auth");
    cy.contains("Signup instead?").click();
    cy.get("#name").clear();
    cy.get("#name").type("John Jones");
    cy.get("#email").clear();
    cy.get("#email").type("john@jones.com");
    cy.get("#password").clear();
    cy.get("#password").type("john12345");
    cy.contains("SIGNUP").click();
  });

  it("should allow a valid user to login", () => {
    cy.visit("/auth");
    cy.get("#email").type("john@jones.com");
    cy.get("#password").type("john12345");
    cy.get("form > .button").should("be.enabled").click();
  });
  it("Should allow a user to edit their account information", () => {
    cy.contains("PROFILE").click();
    cy.get(".title > h1").should("contain", "Edit info");
    cy.get('[placeholder="Enter new name"]').type("John Jones Edit");
    cy.get('[placeholder="Enter new email"]').type("john@jonesedit.com");
    cy.get('[placeholder="Enter new password"]').type("john12345edit");
    cy.get(".footer > :nth-child(1)").click();
  });
  it("Should allow user to delete their account", () => {
    cy.contains("PROFILE").click();
    cy.get(".title > h1").should("contain", "Edit info");
    cy.get(".button--danger").should("be.enabled").click();
    cy.get("h2").should("contain", "Login required");
  });
});
