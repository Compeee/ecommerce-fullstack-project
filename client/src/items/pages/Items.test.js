import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Items from "./Items";

describe("Items", () => {
  it("Show loading spinner", () => {
    render(<Items />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
