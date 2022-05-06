/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />

describe("Campsite places", () => {
  it("should be possible for a logged in user to add a place", () => {
    cy.login("john@jones.com", "john12345");
    cy.get(".card > a").should("have.text", "John Jones Places");

    cy.contains("ADD PLACE").click();
    cy.contains("Add place").should("be.disabled");

    cy.get("#title").type("Repovesi Park");
    cy.get("#description").type("Super nice place to visit");
    cy.get("#address").type("Turuntie 1");

    cy.contains("Add place").should("be.enabled").click();
  });

  it("should be possible for a logged in user to see own place", () => {
    cy.contains("MY PLACES").click();
    cy.url().should("include", "/places");
    cy.get(":nth-child(1) .card > .place-item__info > h2").should(
      "have.text",
      "Repovesi Park"
    );
    cy.get(":nth-child(1) .card > .place-item__info > h3").should(
      "have.text",
      "Turuntie 1"
    );
    cy.get(":nth-child(1) .card > .place-item__info > p").should(
      "have.text",
      "Super nice place to visit"
    );
  });
  it("should be possible for a logged in user to edit own place", () => {
    cy.contains("Edit").click();
    cy.get("#title").should("have.value", "Repovesi Park");
    cy.get("#description").should("have.value", "Super nice place to visit");
    cy.get("#description").clear().type("RP is great!");
    cy.contains("Update place").should("be.enabled");
    cy.contains("Update place").click();
    cy.url().should("include", "/places");
  });
  it("should be possible for a logged in user to delete own place", () => {
    cy.contains("Delete").click();
    cy.get("#modal-hook > div").should("be.visible");
    cy.get(".modal__header > h2").should("contain.text", "Are you sure?");
    cy.get(".modal__content > p").should(
      "contain",
      "Are you sure? Once it's gone, it's gone!"
    );
    cy.contains("Delete").click();
    cy.url().should("include", "/places");
  });
});
