/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />

describe("Campsite landing page", () => {
  it("should open", () => {
    cy.visit("/");
    cy.contains("Camping Spots");
    cy.get("h1.main-navigation__title").should("contain", "Camping Spots");
  });

  it("Should open the authentication form when clicking Authenticate", () => {
    cy.visit("/");
    cy.contains("AUTHENTICATE").click();
    cy.url().should("include", "/auth");

    cy.contains("Login Required");
    cy.contains("Signup instead?").click();
    cy.get('[data-cy="switch-mode"]').should("not.contain", "Signup instead?");
    cy.contains("Login instead?").click();
    cy.get('[data-cy="switch-mode"]').should("not.contain", "Login instead?");
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

  it("should not signup a user with same email", () => {
    cy.visit("/auth");
    cy.contains("Signup instead?").click();

    cy.get("#name").clear();
    cy.get("#name").type("John Jones");
    cy.get("#email").clear();
    cy.get("#email").type("john@jones.com");
    cy.get("#password").clear();
    cy.get("#password").type("john12345");

    cy.contains("SIGNUP").click();

    cy.get("#modal-hook > div").should("be.visible");
    cy.get(".modal__header > h2").should("contain.text", "An Error Occurred!");
    cy.get(".modal__content > p").should(
      "contain.text",
      "Could not create user, user exist"
    );

    cy.contains("Okay").click();
  });

  it("should show the signed up users", () => {
    cy.visit("/");
    cy.get(".card > a").should("have.text", "John Jones Places");
  });

  it("should not allow an invalid user to login", () => {
    cy.visit("/auth");
    cy.get("form > .button").should("be.disabled");
    cy.get("#email").type("john@jones.com");
    cy.get("#password").type("johnjohn");
    cy.get("form > .button").should("be.enabled").click();

    cy.get("#modal-hook > div").should("be.visible");
    cy.get(".modal__header > h2").should("contain.text", "An Error Occurred!");
    cy.get(".modal__content > p").should(
      "contain",
      "Could not identify user, credetials might be wrong"
    );
    cy.get("h2 > .button").click();
  });

  it("should allow a valid user to login", () => {
    cy.visit("/auth");
    cy.get("form > .button").should("be.disabled");
    cy.get("#email").type("john@jones.com");
    cy.get("#password").type("john12345");
    cy.get("form > .button").should("be.enabled").click();
    cy.get(".card > a").should("have.text", "John Jones Places");
  });

  it("should show error modal if user has no places", () => {
    cy.visit("/");
    cy.get(".card > a").should("have.text", "John Jones Places");
    cy.get(".card > a").click();

    cy.get("#modal-hook > div").should("be.visible");
    cy.get(".modal__header > h2").should("contain.text", "An Error Occurred!");
    cy.get(".modal__content > p").should(
      "contain",
      "Could not find a place for the provided user id."
    );
    cy.get("h2 > .button").click();
  });
});
