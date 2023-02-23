import mongoose from "mongoose";
const userModel = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
});

export default mongoose.model("User", userModel);
