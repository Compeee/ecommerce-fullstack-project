import React from "react";
import { render, screen } from "@testing-library/react";
import NavLinks from "./NavLinks";
import { BrowserRouter } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

describe("navigation links", () => {
  it("Should show all users and authenticate if not logged in", () => {
    render(
      <BrowserRouter>
        <NavLinks />
      </BrowserRouter>
    );
    expect(screen.getByRole("list")).toHaveClass("nav-links");

    expect(screen.getByText("ALL USERS")).toBeInTheDocument();
    expect(screen.getByText("ALL USERS")).toHaveAttribute("href", "/");

    expect(screen.getByText("AUTHENTICATE")).toBeInTheDocument();
    expect(screen.getByText("AUTHENTICATE")).toHaveAttribute("href", "/auth");

    expect(screen.queryByText("MY PLACES")).toBeNull();
  });
  it("Should show more navlinks if logged in", () => {
    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: true,
          token: "125129119-1234192451",
          userId: "user1",
          login: () => {},
          logout: () => {},
        }}
      >
        <BrowserRouter>
          <NavLinks />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByRole("list")).toHaveClass("nav-links");
    expect(screen.queryByText("AUTHENTICATE")).toBeNull();

    expect(screen.getByText("ALL USERS")).toBeInTheDocument();
    expect(screen.getByText("ALL USERS")).toHaveAttribute("href", "/");

    expect(screen.getByText("MY PLACES")).toBeInTheDocument();
    expect(screen.getByText("MY PLACES")).toHaveAttribute(
      "href",
      "/user1/places"
    );

    expect(screen.getByText("ADD PLACE")).toBeInTheDocument();
    expect(screen.getByText("ADD PLACE")).toHaveAttribute(
      "href",
      "/places/new"
    );

    expect(screen.getByRole("button", { name: "LOGOUT" })).toBeInTheDocument();
  });
});
