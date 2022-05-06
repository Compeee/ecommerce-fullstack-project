import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Authenticate from "./Authenticate";

describe("Authenticate", () => {
  it("Should render login screen", () => {
    render(<Authenticate></Authenticate>);
    expect(screen.getByText("Login required")).toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "eero@tuni.fi" } });
    expect(emailInput.value).toBe("eero@tuni.fi");
    fireEvent.change(passwordInput, { target: { value: "eero123" } });
    expect(passwordInput.value).toBe("eero123");

    expect(screen.getByRole("button", { name: "LOGIN" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Signup instead?" })
    ).toBeInTheDocument();
  });
  it("Should render signup screen", () => {
    render(<Authenticate></Authenticate>);
    expect(
      screen.getByRole("button", { name: "Signup instead?" })
    ).toBeInTheDocument();
    const button = screen.getByText("Signup instead?");
    fireEvent.click(button);
    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(nameInput, { target: { value: "Eero" } });
    expect(nameInput.value).toBe("Eero");
    fireEvent.change(emailInput, { target: { value: "eero@tuni.fi" } });
    expect(emailInput.value).toBe("eero@tuni.fi");
    fireEvent.change(passwordInput, { target: { value: "eero123" } });
    expect(passwordInput.value).toBe("eero123");
    expect(screen.getByRole("button", { name: "SIGNUP" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Login instead?" })
    ).toBeInTheDocument();
  });
});
