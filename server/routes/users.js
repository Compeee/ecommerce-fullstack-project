import { Router } from "express";
import { check } from "express-validator";
import {
  getUsers,
  signUpUser,
  loginUser,
  deletePersonById,
  getPersonById,
  updatePersonById,
} from "../controllers/users.js";
import verifyToken from "../models/middleware/verifyToken.js";
const usersRouter = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - role
 *        properties:
 *          id:
 *            type: string
 *            description: Auto generated id of user
 *          name:
 *            type: string
 *            description: Username
 *          email:
 *            type: string
 *            description: Users email
 *          password:
 *            type: string
 *            description: Users password
 *        example:
 *          id: d6a_asg
 *          name: eero12345
 *          email: eero12345@tuni.fi
 *          password: eero12345
 *          role: user
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users API
 */

/**
 * @swagger
 * /api/users:
 *    get:
 *      summary: Returns list of all the users
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: The list of the users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 */

usersRouter.get("/", getUsers);
/**
 * @swagger
 * /api/users/signup:
 *    post:
 *      summary: Create new user
 *      description: Takes name, email and password in body
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      responses:
 *        201:
 *          description: succesfully created new user
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *        422:
 *          description: User exists or invalid values given
 *        500:
 *          description: Server error
 */
usersRouter.post(
  "/signup",
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signUpUser
);
/**
 * @swagger
 * /api/users/login:
 *    post:
 *      summary: Log user in
 *      description: Takes email and password in body
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      responses:
 *        201:
 *          description: succesfully logged in
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *        422:
 *          description: User exists or invalid values given
 *        500:
 *          description: Server error
 */
usersRouter.post("/login", loginUser);
/**
 * @swagger
 * /api/users/{id}:
 *    get:
 *      summary: Return user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: User id
 *      responses:
 *        200:
 *          description: User by id succesfully found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Review'
 *        404:
 *          description: User not found
 */
usersRouter.get("/:pid", getPersonById);

usersRouter.use(verifyToken);
/**
 * @swagger
 * /api/users/{id}:
 *    delete:
 *      summary: Delete user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *      responses:
 *        200:
 *          description: Succesfully removed the user
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Review'
 *        404:
 *          description: User not found
 */

usersRouter.delete("/:pid", deletePersonById);
/**
 * @swagger
 * /api/users/{id}:
 *    patch:
 *      summary: Update user by id
 *      description: Takes email, name, pass in body
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: Patch user by id
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *        422:
 *          description: Invalid data given
 *        404:
 *          description: User not found
 */
usersRouter.patch("/:pid", updatePersonById);

export default usersRouter;
