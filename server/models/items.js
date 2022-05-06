import pool from "../db/db.js";

const getAllItems = async () => {
  const items = await pool.query("SELECT * FROM items ORDER BY id ASC");
  return items.rows;
};

const findItemById = async (itemId) => {
  const item = await pool.query("SELECT * FROM items WHERE id=$1", [itemId]);
  return item.rows[0];
};

const addItem = async (item) => {
  const result = await pool.query(
    "INSERT INTO items (id, name, description, price, image) VALUES ($1, $2, $3, $4, $5)",
    [item.id, item.name, item.description, item.price, item.image]
  );
  return result.rows;
};

const deleteItem = async (iid) => {
  const result = await pool.query("DELETE FROM items where id = $1", [iid]);
  return result.rowCount !== 0;
};

const updateItemWithId = async (itemId, name, description, price, image) => {
  const result = await pool.query(
    "UPDATE items SET name=$1, description=$2, price=$3, image=$4 WHERE id=$5",
    [name, description, price, image, itemId]
  );
  return result.rowCount !== 0;
};

export { getAllItems, addItem, deleteItem, findItemById, updateItemWithId };
