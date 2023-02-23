import express from "express";
import { checkToken } from "../middleware/tokenAuth.js";
import isAdmin from "../middleware/isAdmin.js";

import {
  adminLogin,
  adminSignUp,
  getAllAdmin,
  adminUpdate,
  adminDelete,
  getAdminById,
} from "../controller/adminController.js";

const router = express.Router();

router.post("/signup", adminSignUp);
router.post("/login", adminLogin);
router.get("/", checkToken, isAdmin, getAllAdmin);
router.put("/:id", adminUpdate);
router.delete("/:id", adminDelete);
router.get("/:id", getAdminById);

export default router;
