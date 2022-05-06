import React, { useState, useCallback, useEffect, useContext } from "react";
import axios from "axios";
import UpdateItem from "./UpdateItem";
import { AuthContext } from "../../../shared/context/auth-context";
import Button from "../../../shared/components/button/Button";
const ItemTableItems = () => {
  const auth = useContext(AuthContext);
  const [itemData, setItemData] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [selectedItem, setSelectedItem] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    headers: { Authorization: "Bearer " + auth.token },
  });

  const getItems = useCallback(() => {
    axios.get(process.env.REACT_APP_BACKEND + "/items").then((response) => {
      let items = response.data.items;
      setItemData(items);
    });
  }, []);

  useEffect(() => {
    getItems();
  }, [refresh]);

  const deleteHandler = (id) => {
    authAxios.delete(`/items/${id}`).then(() => {
      setRefresh((old) => old + 1);
    });
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addItemHandler = () => {
    if (newItem.name && newItem.description && newItem.price) {
      authAxios.post("/items", newItem).then(() => {
        setRefresh((old) => old + 1);
      });
    }
  };
  return (
    <tbody>
      {itemData.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.price}€</td>
          <td></td>
          <td>
            <Button
              submit
              onClick={() => {
                setOpenModal(true);
                setSelectedItem(item);
              }}
            >
              Edit
            </Button>
          </td>
          <td>
            <Button danger onClick={() => deleteHandler(item.id)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
      {openModal && (
        <UpdateItem
          item={selectedItem}
          setRefresh={setRefresh}
          closeModal={setOpenModal}
        />
      )}
      <tr>
        <td>
          <input
            name="name"
            label="Name"
            placeholder="Name"
            value={newItem.name}
            onChange={inputHandler}
          ></input>
        </td>
        <td>
          <input
            name="description"
            label="Description"
            placeholder="Description"
            value={newItem.description}
            onChange={inputHandler}
          ></input>
        </td>
        <td>
          <input
            name="price"
            label="Price"
            placeholder="Price"
            value={newItem.price}
            onChange={inputHandler}
          ></input>
        </td>
        <td>
          <input
            name="image"
            label="Image"
            placeholder="Image url"
            value={newItem.image}
            onChange={inputHandler}
          ></input>
        </td>
        <td>
          <Button add onClick={() => addItemHandler()}>
            Add
          </Button>
        </td>
      </tr>
    </tbody>
  );
};

export default ItemTableItems;
