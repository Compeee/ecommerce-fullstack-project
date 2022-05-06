import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import ItemReviews from "./ItemReviews";

describe("ItemReviews", () => {
  it("Render ItemReviews page", () => {
    render(
      <BrowserRouter>
        <ItemReviews></ItemReviews>
      </BrowserRouter>
    );
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("Log in to leave a review!")).toBeInTheDocument();

    const inputBox = screen.getByPlaceholderText("Start typing here!");

    userEvent.type(inputBox, "Great product 5/5");

    userEvent.click(screen.getByText("Submit"));
  });
});
