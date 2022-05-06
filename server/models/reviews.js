import pool from "../db/db.js";

const getReviews = async () => {
  const items = await pool.query("SELECT * FROM reviews ORDER BY id ASC");
  return items.rows;
};

const findReviewByItem = async (itemId) => {
  const items = await pool.query("SELECT * FROM reviews WHERE item=$1", [
    itemId,
  ]);
  return items.rows;
};

const addReview = async (review) => {
  const result = await pool.query(
    "INSERT INTO reviews (id, item, review, creator) VALUES ($1, $2, $3, $4)",
    [review.id, review.item, review.review, review.creator]
  );
  return result.rows;
};

const deleteReview = async (id) => {
  const result = await pool.query("DELETE FROM reviews where id=$1", [id]);
  return result.rowCount !== 0;
};

export { addReview, deleteReview, findReviewByItem, getReviews };
