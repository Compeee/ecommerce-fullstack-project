import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserTableItems from "./UserTableItems";

describe("ItemTableItems", () => {
  it("Should render itemdata and buttons in the table", () => {
    render(<UserTableItems></UserTableItems>);
  });
});
