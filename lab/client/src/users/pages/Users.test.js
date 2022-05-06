import React from "react";
import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import Users from "./Users";

describe("Users", () => {
  it("Show loading spinner", () => {
    render(<Users />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
