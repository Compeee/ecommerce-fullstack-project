import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = (props) => {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={props.image} />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>{props.name}</h3>
        </div>
        <div className="card-price">{props.price}€</div>
        <div className="card-body">
          <p>{props.description}</p>
        </div>
      </div>
      <div className="reviews-button">
        <Link
          to={`/reviews/${props.id}`}
          style={{
            textDecoration: "none",
            font: "inherit",
            padding: "0.5rem 1.5rem",
            border: "1px solid black",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          Reviews
        </Link>
      </div>
    </div>
  );
};

export default Item;
