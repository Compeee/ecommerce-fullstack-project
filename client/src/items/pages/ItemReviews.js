import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import axios from "axios";
import Button from "../../shared/components/button/Button";
import "./ItemReviews.css";
const ItemReviews = () => {
  const auth = useContext(AuthContext);
  const { itemid } = useParams();
  const [reviews, setReviews] = useState([{}]);
  const [refresh, setRefresh] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const getReviews = async (id) => {
    const reviews = await axios.get(
      process.env.REACT_APP_BACKEND + `/reviews/${id}`
    );
    setReviews(reviews.data.reviews);
  };

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    headers: { Authorization: "Bearer " + auth.token },
  });

  const addReviewHandler = async () => {
    const newItem = { item: itemid, review: reviewText, creator: auth.userId };
    await authAxios.post("/reviews", newItem);
    setRefresh((old) => old + 1);
  };

  useEffect(() => {
    getReviews(itemid);
  }, [refresh]);

  return (
    <div className="center">
      <div className="modalContainer">
        <div className="title">
          <h1>Reviews</h1>
        </div>
        <div className="body">
          {reviews.map((r) => (
            <div key={r.id}>
              <div>{r.review}</div>
            </div>
          ))}
        </div>
        {auth.isLoggedIn ? (
          <p>Leave a review below!</p>
        ) : (
          <p>Log in to leave a review!</p>
        )}
        <input
          className="input-box"
          placeholder="Start typing here!"
          onChange={(e) => setReviewText(e.target.value)}
        ></input>
        <div className="footer">
          <Button submit disabled={!auth.isLoggedIn} onClick={addReviewHandler}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemReviews;
