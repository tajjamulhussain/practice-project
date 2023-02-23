"use strict";
import { verify } from "./jwt.js";

let checkToken = (req, res, next) => {
  let token = req.header("x-auth-token");
  if (token) {
    const isVerified = verify(token);
    console.log("isVerified", isVerified);
    if (isVerified) {
      req.userId = isVerified.id;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
    }
  } else {
    return res.json({
      success: 404,
      message: "Token is not provided",
      missingParameters: ["login_token"],
    });
  }
};
export { checkToken };
