import { Router } from "express";
import {
  getAllReviews,
  getReviewByItem,
  deleteReviewById,
  addNewReview,
} from "../controllers/reviews.js";
import verifyToken from "../models/middleware/verifyToken.js";

/**
 * @swagger
 * components:
 *    schemas:
 *      Review:
 *        type: object
 *        required:
 *          - item
 *          - review
 *          - creator
 *        properties:
 *          id:
 *            type: string
 *            description: Auto generated id of review
 *          item:
 *            type: string
 *            description: Item id
 *          review:
 *            type: string
 *            description: Review text
 *          creator:
 *            type: string
 *            description: Users name
 *        example:
 *          id: d6a_asg
 *          item: item-id-1231as-asf9k
 *          review: Great Product! 5/5
 *          creator: eero123
 */

/**
 * @swagger
 * tags:
 *  name: Reviews
 *  description: Reviews API
 */

const reviewsRouter = Router();
/**
 * @swagger
 * /api/reviews:
 *    get:
 *      summary: Returns list of all the reviews
 *      tags: [Reviews]
 *      responses:
 *        200:
 *          description: The list of the reviews
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Review'
 */

reviewsRouter.get("/", getAllReviews);
/**
 * @swagger
 * /api/reviews/{id}:
 *    get:
 *      summary: Return reviews by item id
 *      tags: [Reviews]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: Item id
 *      responses:
 *        200:
 *          description: Reviews by item id succesfully found
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Review'
 *        404:
 *          description: Reviews not found
 */

reviewsRouter.get("/:iid", getReviewByItem);

reviewsRouter.use(verifyToken);
/**
 * @swagger
 * /api/reviews:
 *    post:
 *      summary: Create new review
 *      description: item id, creator and review msg in body
 *      tags: [Reviews]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Review'
 *      responses:
 *        200:
 *          description: succesfully created review
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Review'
 *        500:
 *          description: Server error
 */
reviewsRouter.post("/", addNewReview);
/**
 * @swagger
 * /api/reviews/{id}:
 *    delete:
 *      summary: Delete review by id
 *      tags: [Reviews]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The review id
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Succesfully removed review
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Review'
 *        404:
 *          description: Review not found
 */

reviewsRouter.delete("/:rid", deleteReviewById);

export default reviewsRouter;
