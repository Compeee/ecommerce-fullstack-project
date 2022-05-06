import { validationResult } from "express-validator";
import { v4 } from "uuid";

import HttpError from "../models/http-error.js";

import {
  addItem,
  getAllItems,
  deleteItem,
  findItemById,
  updateItemWithId,
} from "../models/items.js";

const getItems = async (req, res, next) => {
  const items = await getAllItems();
  res.json({ items: items });
};

const getItemById = async (req, res, next) => {
  const itemId = req.params.iid;
  const item = await findItemById(itemId);
  if (!item) {
    return next(
      new HttpError("Could not find a item for the provided id", 404)
    );
  }
  res.json({ item });
};

const deleteItemById = async (req, res, next) => {
  const id = req.params.iid;
  const result = await deleteItem(id);
  if (!result) {
    return next(
      new HttpError("Could not find a item for the provided id", 404)
    );
  }
  res.status(200).json({ message: "Deleted the item." });
};

const updateItemById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid values given, please check the data", 422)
    );
  }

  const { name, description, price, image } = req.body;
  const itemId = req.params.iid;

  const item = await findItemById(itemId);
  if (!item) {
    return next(
      new HttpError("Could not find a item for the provided id", 404)
    );
  }

  const result = await updateItemWithId(
    itemId,
    name,
    description,
    price,
    image
  );
  console.log(result);
  if (!result) {
    return next(
      new HttpError("Could not update the info for the provided id", 404)
    );
  }
  item.name = name;
  item.description = description;
  item.price = price;
  item.image = image;

  res.status(200).json({ item: item });
};

const addNewItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return next(
      new HttpError("Invalid values given, please check the data", 422)
    );
  }

  const item = req.body;

  const newItem = {
    id: v4(),
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
  };

  const result = await addItem(newItem);
  if (!result) {
    return next(new HttpError("Something went wrong creating the user", 500));
  }

  res.status(201).json({
    id: newItem.id,
    name: newItem.name,
    description: newItem.description,
    price: newItem.price,
    image: newItem.image,
  });
};
export { getItems, addNewItem, deleteItemById, getItemById, updateItemById };
