import React, { useContext, useState } from "react";
import "./UpdateItem.css";
import axios from "axios";
import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../../../shared/components/button/Button";

const UpdateItem = ({ item, closeModal, setRefresh }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [image, setImage] = useState(item.image);
  const auth = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    headers: { Authorization: "Bearer " + auth.token },
  });

  const updateItem = (iid) => {
    if (name && description.length > 6 && price && image) {
      authAxios.patch(`/items/${iid}`, {
        name: name,
        description: description,
        price: price,
        image: image,
      }),
        setRefresh((old) => old + 1);
    } else {
      console.log("One of the fields was empty");
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="title">
          <h1>Edit</h1>
        </div>
        <div className="body">
          <input
            className="input"
            placeholder="Enter new name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            className="input"
            placeholder="Enter new description"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <input
            className="input"
            placeholder="Enter new price"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <input
            className="input"
            placeholder="Enter new image url"
            onChange={(e) => setImage(e.target.value)}
          ></input>
        </div>
        <div className="footer">
          <Button
            onClick={() => {
              updateItem(item.id);
              closeModal(false);
            }}
          >
            Confirm edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
