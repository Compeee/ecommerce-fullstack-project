import React from "react";
import { render, screen } from "@testing-library/react";
import ItemsList from "./ItemsList";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
const DUMMY_ITEMS = [
  {
    id: "12awa1216ah",
    image:
      "https://www.toimistotuote.fi/media/catalog/product/cache/1/image/363x/040ec09b1e35df139433887a97daa66f/5/2/520109_8.jpg",
    name: "Kahvi2",
    description: "Juhla Mokka2",
    price: 7,
  },
  {
    id: "12awa1216aghh",
    image:
      "https://www.toimistotuote.fi/media/catalog/product/cache/1/image/363x/040ec09b1e35df139433887a97daa66f/5/2/520109_8.jpg",
    name: "Kahvi",
    description: "Juhla Mokka",
    price: 8,
  },
];

describe("ItemList", () => {
  it("Should render ItemList with given items", () => {
    render(
      <BrowserRouter>
        <ItemsList items={DUMMY_ITEMS}></ItemsList>
      </BrowserRouter>
    );
    expect(screen.getByText("Kahvi2")).toBeInTheDocument();
    expect(screen.getByText("Juhla Mokka2")).toBeInTheDocument();
    expect(screen.getByText("Kahvi")).toBeInTheDocument();
    expect(screen.getByText("Juhla Mokka")).toBeInTheDocument();
    expect(screen.getByText("7€")).toBeInTheDocument();
    expect(screen.getByText("8€")).toBeInTheDocument();
  });
});
