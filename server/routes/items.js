import { Router } from "express";
import { check } from "express-validator";
import {
  addNewItem,
  deleteItemById,
  getItemById,
  getItems,
  updateItemById,
} from "../controllers/items.js";

import verifyToken from "../models/middleware/verifyToken.js";

const itemsRouter = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      Item:
 *        type: object
 *        required:
 *          - name
 *          - description
 *          - price
 *          - image
 *        properties:
 *          id:
 *            type: string
 *            description: Auto generated id of item
 *          name:
 *            type: string
 *            description: Item name
 *          description:
 *            type: string
 *            description: Item description
 *          price:
 *            type: string
 *            description: Item price
 *          image:
 *            type: string
 *            description: Item image url
 *        example:
 *          id: d6a_asg
 *          name: Juhla Mokka
 *          description: Maukas kahvi
 *          price: 8
 *          image: https://www.toimistotuote.fi/media/catalog/product/cache/1/image/363x/040ec09b1e35df139433887a97daa66f/5/2/520109_8.jpg
 */

/**
 * @swagger
 * tags:
 *  name: Items
 *  description: Items API
 */

/**
 * @swagger
 * /api/items:
 *    get:
 *      summary: Returns list of all the items
 *      tags: [Items]
 *      responses:
 *        200:
 *          description: The list of the books
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Item'
 *
 * */
itemsRouter.get("/", getItems);
/**
 * @swagger
 * /api/items/{id}:
 *    get:
 *      summary: Return item by id
 *      tags: [Items]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The item id*
 *      responses:
 *        200:
 *          description: Item by id
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Item'
 *        404:
 *          description: Item not found
 */

itemsRouter.get("/:iid", getItemById);

itemsRouter.use(verifyToken);
/**
 * @swagger
 * /api/items:
 *    post:
 *      summary: Create new item
 *      description: Takes name, desc, price and img url in body
 *      tags: [Items]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Item'
 *      security:
 *       - bearerAuth: []
 *      responses:
 *        200:
 *          description: succesfully created item
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Item'
 *        500:
 *          description: Server error
 */
itemsRouter.post(
  "/",
  [
    check("name").notEmpty(),
    check("description").notEmpty(),
    check("price").notEmpty(),
    check("image").notEmpty(),
  ],
  addNewItem
);

/**
 * @swagger
 * /api/items/{id}:
 *    delete:
 *      summary: Delete item by id
 *      tags: [Items]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The item id
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Item by id
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Item'
 *        404:
 *          description: Item not found
 */

itemsRouter.delete("/:iid", deleteItemById);

/**
 * @swagger
 * /api/items/{id}:
 *    patch:
 *      summary: Update item by id
 *      description: Takes name, desc, price and img url in body
 *      tags: [Items]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The item id
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Item'
 *      responses:
 *        200:
 *          description: Patch item by id
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Item'
 *        404:
 *          description: Item not found
 */

itemsRouter.patch("/:iid", updateItemById);

export default itemsRouter;
