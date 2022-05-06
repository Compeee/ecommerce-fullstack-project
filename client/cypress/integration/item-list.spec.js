describe("ItemList", () => {
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
  it("Should be able to see item-list", () => {
    cy.contains("ITEM LIST").click();
    cy.get("thead > tr > :nth-child(1)").should("contain", "Name");
    cy.get("thead > tr > :nth-child(2)").should("contain", "Description");
    cy.get("thead > tr > :nth-child(3)").should("contain", "Price");
    cy.get("thead > tr > :nth-child(4)").should("contain", "Image url");
    cy.url().should("include", "/item-list");
  });
  it("Should be able to add a new item", () => {
    cy.get(":nth-child(1) > input").type("Test-Item");
    cy.get(":nth-child(2) > input").type("EpicTest");
    cy.get(":nth-child(3) > input").type("10");
    cy.get(":nth-child(4) > input").type("Epic");
    cy.contains("Add").click();
    cy.get(":nth-child(1) > input").clear();
    cy.get(":nth-child(2) > input").clear();
    cy.get(":nth-child(3) > input").clear();
    cy.get(":nth-child(4) > input").clear();
    cy.contains("Test-Item");
    cy.contains("EpicTest");
    cy.contains("10€");
  });
  it("Should be able to edit a item", () => {
    cy.contains("Edit").click();
    cy.get('[placeholder="Enter new name"]').type("Testi-Item");
    cy.get('[placeholder="Enter new description"]').type("TestattuTuote");
    cy.get('[placeholder="Enter new price"]').type("20");
    cy.get('[placeholder="Enter new image url"]').type("url.url");
    cy.contains("Confirm edit").click();
  });
  it("Should allow user to delete their account", () => {
    cy.contains("PROFILE").click();
    cy.get(".title > h1").should("contain", "Edit info");
    cy.get(".button--danger").should("be.enabled").click();
    cy.get("h2").should("contain", "Login required");
  });
});
