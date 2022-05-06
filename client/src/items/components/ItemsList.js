import React from "react";
import Item from "./Item";

import "./ItemsList.css";

const ItemsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No items found.</h2>
      </div>
    );
  }
  return (
    <ul className="items-list">
      {props.items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          image={item.image}
          name={item.name}
          description={item.description}
          price={item.price}
        />
      ))}
    </ul>
  );
};

export default ItemsList;
