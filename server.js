import express from "express";
import connectDB from "./config/dataBase.js";
dotenv.config();
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/mainRouter.js";
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/", routes);
app.listen(3001, () => {
  console.log("App is running on port 3001");
});
