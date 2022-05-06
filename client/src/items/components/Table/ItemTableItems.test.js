import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemTableItems from "./ItemTableItems";
import "@testing-library/jest-dom/extend-expect";

describe("ItemTableItems", () => {
  it("Should render table and add button", () => {
    render(<ItemTableItems></ItemTableItems>);
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });
  it("Should be able to add a new item", () => {
    render(<ItemTableItems></ItemTableItems>);
    const nameInput = screen.getByPlaceholderText("Name");
    const descInput = screen.getByPlaceholderText("Description");
    const priceInput = screen.getByPlaceholderText("Price");
    const urlInput = screen.getByPlaceholderText("Image url");
    fireEvent.change(nameInput, { target: { value: "Kulta Katriina" } });
    expect(nameInput.value).toBe("Kulta Katriina");
    fireEvent.change(descInput, { target: { value: "Perus kahvi" } });
    expect(descInput.value).toBe("Perus kahvi");
    fireEvent.change(priceInput, { target: { value: 9 } });
    expect(priceInput.value).toBe("9");
    fireEvent.change(urlInput, {
      target: {
        value:
          "https://cdn.s-cloud.fi/v1/h480w320/product/ean/6411300000494_kuva1.jpg",
      },
    });
    const button = screen.getByText("Add");
    fireEvent.click(button);
  });
});
