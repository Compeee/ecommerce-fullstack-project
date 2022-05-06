import pool from "../db/db.js";

const getAllUsers = async () => {
  const users = await pool.query("SELECT * FROM users ORDER BY id ASC");
  console.log(users);
  return users.rows;
};

const findUserById = async (userId) => {
  const users = await pool.query("SELECT * FROM users WHERE id=$1", [userId]);
  return users.rows[0];
};

const deletePerson = async (pid) => {
  const result = await pool.query("DELETE FROM users where id = $1", [pid]);
  console.log("delete", result);
  return result.rowCount !== 0;
};

const getUserRowCountByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  console.log(result);
  return result.rowCount !== 0;
};

const updateUserWithId = async (userId, name, email, password) => {
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4",
    [name, email, password, userId]
  );
  return result.rowCount !== 0;
};

const getUserByEmail = async (email) => {
  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  console.log(user);
  return user.rows[0];
};

const addUser = async (user) => {
  const result = await pool.query(
    "INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5)",
    [user.id, user.name, user.email, user.password, user.role]
  );
  console.log(result);
  return result.rows;
};

export {
  getAllUsers,
  getUserByEmail,
  getUserRowCountByEmail,
  addUser,
  deletePerson,
  findUserById,
  updateUserWithId,
};
