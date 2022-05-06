import { validationResult } from "express-validator";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import HttpError from "../models/http-error.js";

import {
  addUser,
  getAllUsers,
  getUserByEmail,
  getUserRowCountByEmail,
  deletePerson,
  findUserById,
  updateUserWithId,
} from "../models/users.js";

const getUsers = async (req, res, next) => {
  const users = await getAllUsers();
  res.json({ users: users });
};

const getPersonById = async (req, res) => {
  const personId = req.params.pid;
  const person = await findUserById(personId);
  res.json({ person });
};

const updatePersonById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid values given, please check the data", 422)
    );
  }
  const { name, email, password } = req.body;
  const userId = req.params.pid;

  const user = await findUserById(userId);

  if (userId !== req.userData.userId)
    if (!user) {
      return next(
        new HttpError("Could not update a user for the provided id", 404)
      );
    }

  let hashedPassword;
  try {
    // Parameters, the string to hash, salt length to generate or salt to use
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not update user, try again", 500));
  }

  const result = await updateUserWithId(userId, name, email, hashedPassword);
  console.log(result);
  if (!result) {
    return next(
      new HttpError("Could not update the details for the provided id", 404)
    );
  }
  user.name = name;
  user.email = email;
  user.password = hashedPassword;

  res.status(200).json({ user: user });
};

const deletePersonById = async (req, res) => {
  const id = req.params.pid;
  const result = await deletePerson(id);
  if (!result) {
    console.log("User does not exist");
  }
  res.status(200).json({ message: "Deleted the user." });
};

const signUpUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return next(
      new HttpError("Invalid values given, please check the data", 422)
    );
  }

  const { name, email, password } = req.body;
  const exist = await getUserRowCountByEmail(email);
  if (exist) {
    return next(new HttpError("Could not create user, user exist", 422));
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (password.length < 6 || !name || !regex.test(email)) {
    return next(new HttpError("Invalid values", 422));
  }
  let hashedPassword;
  try {
    // Parameters, the string to hash, salt length to generate or salt to use
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, try again", 500));
  }

  console.log(hashedPassword.length);

  let role;

  if (email === "eero123@tuni.fi" || email === "testi@ukko.fi") {
    role = "admin";
  } else {
    role = "user";
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password: hashedPassword,
    role: role,
  };

  const result = await addUser(newUser);
  if (!result) {
    return next(new HttpError("Something went wrong creating the user", 500));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser.id, // payload, anything that make sense and
        email: newUser.email, // what you might need on the frontend
      },
      process.env.JWT_KEY, // secret key
      { expiresIn: "1h" } // options like an experation time
    );
  } catch (err) {
    return next(new HttpError("Signup failed, please try again", 500));
  }

  res.status(201).json({
    userId: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token: token,
    role: newUser.role,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = await getUserByEmail(email);

  if (!identifiedUser) {
    return next(
      new HttpError("Could not identify user, credetials might be wrong", 401)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    return next(
      new HttpError("Could not log you in , check your credetials", 500)
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Could not identify user, credetials might be wrong", 401)
    );
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: identifiedUser.id, // payload, anything that make sense and
        email: identifiedUser.email, // what you might need on the frontend
      },
      process.env.JWT_KEY, // secret key
      { expiresIn: "1h" } // options like an experation time
    );
  } catch (err) {
    return next(new HttpError("Login in failed, please try again", 500));
  }
  res.status(201).json({
    userId: identifiedUser.id,
    email: identifiedUser.email,
    token: token,
    role: identifiedUser.role,
  });
};

export {
  getUsers,
  signUpUser,
  loginUser,
  deletePersonById,
  getPersonById,
  updatePersonById,
};
