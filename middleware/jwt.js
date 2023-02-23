"use strict";
import jwt from "jsonwebtoken";
// require("dotenv").config();
let jwtSecret = "secretS$1121212";
const issue = (payload, expiresIn) => {
  return jwt.sign(payload, jwtSecret, {
    // expiresIn: expiresIn ? expiresIn : "10s",
  });
};
const verify = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return false;
  }
};
export { issue, verify };
