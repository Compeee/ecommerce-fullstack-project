import { validationResult } from "express-validator";
import { v4 } from "uuid";

import HttpError from "../models/http-error.js";

import {
  addReview,
  deleteReview,
  findReviewByItem,
  getReviews,
} from "../models/reviews.js";

const getAllReviews = async (req, res, next) => {
  const reviews = await getReviews();
  res.json({ reviews: reviews });
};

const getReviewByItem = async (req, res, next) => {
  const itemId = req.params.iid;
  const reviews = await findReviewByItem(itemId);
  if (!reviews) {
    return next(new HttpError("No reviews for this item id", 404));
  }
  res.json({ reviews: reviews });
};

const deleteReviewById = async (req, res, next) => {
  const id = req.params.rid;
  const result = await deleteReview(id);
  if (!result) {
    return next(new HttpError("No reviews for this id", 404));
  }
  res.status(200).json({ message: "Deleted the review." });
};

const addNewReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return next(
      new HttpError("Invalid values given, please check the data", 422)
    );
  }

  const review = req.body;

  const newReview = {
    id: v4(),
    item: review.item,
    review: review.review,
    creator: review.creator,
  };

  const result = await addReview(newReview);
  if (!result) {
    return next(new HttpError("Something went wrong creating the review", 500));
  }

  res.status(201).json({
    id: newReview.id,
    item: newReview.item,
    review: newReview.review,
    creator: newReview.creator,
  });
};
export { getAllReviews, getReviewByItem, deleteReviewById, addNewReview };
