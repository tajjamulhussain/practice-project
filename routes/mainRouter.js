import express from "express";

import adminRouter from "./adminRouter.js";
import userRouter from "./userRouter.js";

var router = express.Router();

router.use("/admin", adminRouter);
router.use("/user", userRouter);
export default router;
