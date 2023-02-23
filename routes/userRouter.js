import express from "express";
import { checkToken } from "../middleware/tokenAuth.js";
import isAdmin from "../middleware/isAdmin.js";

import {
  userLogin,
  userSignUp,
  getAllUser,
  userUpdate,
  userDelete,
  getUserById,
} from "../controller/userController.js";
import grantAccess from "../utilities/accessControl.js";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/", checkToken, grantAccess("readAny", "access"), getAllUser);
router.put("/:id", userUpdate);
router.delete("/:id", userDelete);
router.get("/:id", getUserById);

export default router;
