import React from "react";
import { render, screen } from "@testing-library/react";
import ItemTable from "./ItemTable";
import "@testing-library/jest-dom/extend-expect";

describe("ItemTable", () => {
  it("Should render a table", () => {
    render(<ItemTable></ItemTable>);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Image url")).toBeInTheDocument();
  });
});
