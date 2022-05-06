import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UpdateItem from "./UpdateItem";
import "@testing-library/jest-dom/extend-expect";

const item = {
  id: "as123ah",
  name: "Juhla Mokka",
  description: "Kahvi",
  price: 8,
  image:
    "https://cdn.s-cloud.fi/v1/h480w320/product/ean/6411300000494_kuva1.jpg",
};
describe("UpdateItem", () => {
  it("Should render UpdateItem", () => {
    const handleClose = jest.fn();
    const setRefresh = jest.fn();
    render(
      <UpdateItem
        item={item}
        closeModal={handleClose}
        setRefresh={setRefresh}
      ></UpdateItem>
    );
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Confirm edit" })
    ).toBeInTheDocument();
  });
  it("Should be able to input new values and edit item ", () => {
    const handleClose = jest.fn();
    const setRefresh = jest.fn();
    render(
      <UpdateItem
        item={item}
        closeModal={handleClose}
        setRefresh={setRefresh}
      ></UpdateItem>
    );
    const nameInput = screen.getByPlaceholderText("Enter new name");
    const descInput = screen.getByPlaceholderText("Enter new description");
    const priceInput = screen.getByPlaceholderText("Enter new price");
    const urlInput = screen.getByPlaceholderText("Enter new image url");
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
    expect(urlInput.value).toBe(
      "https://cdn.s-cloud.fi/v1/h480w320/product/ean/6411300000494_kuva1.jpg"
    );
  });
});
