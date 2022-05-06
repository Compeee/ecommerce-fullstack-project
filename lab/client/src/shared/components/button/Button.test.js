// 1. Renders a link styles as a button
// 2. Renders a <Link> when it is a route
// 3. Renders a basic button, which executes a function

import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { BrowserRouter } from "react-router-dom";

describe("button", () => {
  it("Should render a normal button when no to or href prop", () => {
    render(
      <Button type={"button"} onclick={() => {}} disabled={false}>
        My Normal Button
      </Button>
    );
    expect(
      screen.getByRole("button", { name: "My Normal Button" })
    ).toBeInTheDocument();
  });

  it("should render an anchor when to prop is set", () => {
    render(<Button href={"/users"}>My Anchor Button</Button>);
    expect(
      screen.getByRole("link", { name: "My Anchor Button" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "My Anchor Button" })
    ).toHaveAttribute("href", "/users");
    expect(screen.getByRole("link", { name: "My Anchor Button" })).toHaveClass(
      "button button--default"
    );
  });
  it("Should render a route Link when to prop is set", () => {
    render(<Button href={"/users"}>My Link Button</Button>);
    expect(
      screen.getByRole("link", { name: "My Link Button" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "My Link Button" })
    ).toHaveAttribute("href", "/users");
    expect(screen.getByRole("link", { name: "My Link Button" })).toHaveClass(
      "button button--default"
    );
  });
});
