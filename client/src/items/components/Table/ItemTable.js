import React from "react";
import ItemTableItems from "./ItemTableItems";
import "./ItemTable.css";
const ItemTable = () => {
  return (
    <table className="item-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image url</th>
        </tr>
      </thead>
      <ItemTableItems></ItemTableItems>
    </table>
  );
};

export default ItemTable;
