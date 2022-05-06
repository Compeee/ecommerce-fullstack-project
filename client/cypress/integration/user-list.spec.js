describe("UserList", () => {
  it("Login as admin", () => {
    cy.visit("/");
    cy.contains("Ecommerce");
    cy.get("h1.main-navigation__title").should("contain", "Ecommerce");
    cy.visit("/auth");
    cy.contains("Signup instead?").click();
    cy.get("#name").clear();
    cy.get("#name").type("testiukko");
    cy.get("#email").clear();
    cy.get("#email").type("testi@ukko.fi");
    cy.get("#password").clear();
    cy.get("#password").type("testaaja");
    cy.contains("SIGNUP").click();
  });
  it("Should be able to see user-list with own info", () => {
    cy.contains("USER LIST").click();
    cy.get("thead > tr > :nth-child(1)").should("contain", "Username");
    cy.get("thead > tr > :nth-child(2)").should("contain", "Email");
    cy.get("thead > tr > :nth-child(3)").should("contain", "Role");
    cy.url().should("include", "/user-list");
    cy.contains("testiukko");
    cy.contains("testi@ukko.fi");
    cy.contains("admin");
  });
  it("Should allow user to delete their account", () => {
    cy.contains("PROFILE").click();
    cy.get(".title > h1").should("contain", "Edit info");
    cy.get(".button--danger").should("be.enabled").click();
    cy.get("h2").should("contain", "Login required");
  });
});
