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

const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.post(
  "/signup",
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signUpUser
);

usersRouter.get("/:pid", getPersonById);

usersRouter.delete("/:pid", deletePersonById);

usersRouter.patch("/:pid", updatePersonById)

usersRouter.post("/login", loginUser);

export default usersRouter;
