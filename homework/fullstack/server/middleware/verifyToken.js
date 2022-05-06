import jwt from "jsonwebtoken";
import HttpError from "../models/http-error.js";

const verifyToken = (req, res, next) => {
  // Default behavior is that an OPTIONS request is sent before all but GET
  if (req.method === "OPTIONS") {
    next();
  }
  // we will use the headers for our token
  try {
    const token = req.headers.authorization.split(" ")[1]; // Convention is 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, "secret_only_the_server_knows");
    req.userData = { userId: decodedToken.userId };
    console.log(req.userData);
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed."));
  }
};

export default verifyToken;
