import jwt from "jsonwebtoken";

import httpError from "./httpError.js";

import usermodel from "../model/userModel.js";

const auth = async function (req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    console.log("1.authheader", authHeader);

    if (!authHeader) {
      return next(new httpError("auth header is required"));
    }

    const token = authHeader.replace("Bearer ", "");

    console.log("2.token ", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("3.decoded", decoded);

    const user = await usermodel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    console.log("4. user", user);

    if (!user) {
      return next(new httpError("authentication failed", 401));
    }

    req.user = user;
    console.log("5. req.user", req.user);

    req.token = token;
    console.log("6. req.token", req.token);

    next();
  } catch (error) {
    next(new httpError(error.message, 401));
  }
};

export default auth;
