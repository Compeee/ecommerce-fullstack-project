import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserProfile from "./UserProfile";
describe("UserProfile", () => {
  it("Should render edit profile screen", () => {
    render(<UserProfile></UserProfile>);
    expect(screen.getByText("Edit info")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter new name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter new email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter new password")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete Account" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Confirm edit" })
    ).toBeInTheDocument();
  });
  it("Input value updates on change", () => {
    render(<UserProfile></UserProfile>);
    const nameInput = screen.getByPlaceholderText("Enter new name");
    const emailInput = screen.getByPlaceholderText("Enter new email");
    const passwordInput = screen.getByPlaceholderText("Enter new password");
    fireEvent.change(nameInput, { target: { value: "Eero" } });
    expect(nameInput.value).toBe("Eero");
    fireEvent.change(emailInput, { target: { value: "eero@tuni.fi" } });
    expect(emailInput.value).toBe("eero@tuni.fi");
    fireEvent.change(passwordInput, { target: { value: "eero123" } });
    expect(passwordInput.value).toBe("eero123");
  });
});
