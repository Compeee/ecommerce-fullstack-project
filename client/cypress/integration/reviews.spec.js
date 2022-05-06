describe("Reviews", () => {
  before(() => {
    cy.request("POST", "http://localhost:5000/api/items", {
      name: "Test-Item",
      description: "EpicTest",
      image: "test-link",
      price: 10,
    });
  });
  it("Should not be possible for a user to leave reviews if hes not logged in", () => {
    cy.visit("/");
    cy.contains("Ecommerce");
    cy.get("h1.main-navigation__title").should("contain", "Ecommerce");
    cy.contains("Test-Item");
    cy.contains("EpicTest");
    cy.contains("10€");
    cy.get(":nth-child(1) > .reviews-button > a")
      .should("contain", "Reviews")
      .click();
    cy.get(".button").should("be.disabled");
    cy.get("p").should("contain", "Log in to leave a review!");
    cy.get(".title > h1").should("contain", "Reviews");
  });
  it("Should be able to leave a review if logged in", () => {
    cy.visit("/auth");
    cy.login("john@jones.com", "john12345");
    cy.get(":nth-child(1) > .reviews-button > a")
      .should("contain", "Reviews")
      .click();
    cy.get(".button").should("be.enabled");
    cy.get(".input-box").type("Great item 5/5");
    cy.get(".button").click();
    cy.get(".body > :nth-child(1) > div").should("contain", "Great item 5/5");
  });
});
