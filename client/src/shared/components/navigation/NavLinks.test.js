import React from "react";
import { render, screen } from "@testing-library/react";
import NavLinks from "./NavLinks";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { AuthContext } from "../../context/auth-context";

describe("navigation links", () => {
  it("Should show all items and authenticate if not logged in", () => {
    render(
      <BrowserRouter>
        <NavLinks />
      </BrowserRouter>
    );
    expect(screen.getByRole("list")).toHaveClass("nav-links");

    expect(screen.getByText("PRODUCTS")).toBeInTheDocument();
    expect(screen.getByText("PRODUCTS")).toHaveAttribute("href", "/");

    expect(screen.getByText("AUTHENTICATE")).toBeInTheDocument();
    expect(screen.getByText("AUTHENTICATE")).toHaveAttribute("href", "/auth");
  });
  it("Should show more navlinks if logged in", () => {
    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: true,
          token: "125129119-1234192451",
          userId: "user1",
          userName: "eero123",
          role: "user",
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

    expect(screen.getByText("PRODUCTS")).toBeInTheDocument();
    expect(screen.getByText("PRODUCTS")).toHaveAttribute("href", "/");

    expect(screen.getByText("PROFILE")).toBeInTheDocument();
    expect(screen.getByText("PROFILE")).toHaveAttribute(
      "href",
      "/profile/user1"
    );
    expect(screen.getByRole("button", { name: "LOGOUT" })).toBeInTheDocument();
  });
  it("Should show more navlinks if logged in as admin", () => {
    render(
      <AuthContext.Provider
        value={{
          isLoggedIn: true,
          token: "125129119-1234192451",
          userId: "user1",
          userName: "eero123",
          role: "admin",
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

    expect(screen.getByText("PRODUCTS")).toBeInTheDocument();
    expect(screen.getByText("PRODUCTS")).toHaveAttribute("href", "/");

    expect(screen.getByText("PROFILE")).toBeInTheDocument();
    expect(screen.getByText("PROFILE")).toHaveAttribute(
      "href",
      "/profile/user1"
    );
    expect(screen.getByText("USER LIST")).toBeInTheDocument();
    expect(screen.getByText("USER LIST")).toHaveAttribute("href", "/user-list");
    expect(screen.getByText("ITEM LIST")).toBeInTheDocument();
    expect(screen.getByText("ITEM LIST")).toHaveAttribute("href", "/item-list");
    expect(screen.getByRole("button", { name: "LOGOUT" })).toBeInTheDocument();
  });
});
