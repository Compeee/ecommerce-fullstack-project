import React from "react";
import { render, screen } from "@testing-library/react";
import Item from "./Item";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

describe("Item", () => {
  it("Should render a item with given props", () => {
    render(
      <BrowserRouter>
        <Item
          key={"12awa1216ah"}
          id={"12awa1216ah"}
          image={
            "https://www.toimistotuote.fi/media/catalog/product/cache/1/image/363x/040ec09b1e35df139433887a97daa66f/5/2/520109_8.jpg"
          }
          name={"Kahvi"}
          description={"Juhla Mokka"}
          price={7}
        ></Item>
      </BrowserRouter>
    );
    expect(screen.getByText("Kahvi")).toBeInTheDocument();
    expect(screen.getByText("Juhla Mokka")).toBeInTheDocument();
    expect(screen.getByText("7€")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reviews" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reviews" })).toHaveAttribute(
      "href",
      "/reviews/12awa1216ah"
    );
  });
});
