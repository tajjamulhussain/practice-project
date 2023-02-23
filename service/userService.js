import User from "../model/userModel.js";
const createUser = async (query) => {
  return await User.create(query);
};
const getUser = async (param) => {
  return await User.findOne(param);
};
const updateUser = async (query, data) => {
  return await User.findOneAndUpdate(query, data, {
    new: true,
  });
};
const deleteUser = async (query) => {
  return await User.findByIdAndRemove(query);
};
const allUser = async (query) => {
  return await User.find(query);
};
export { createUser, getUser, updateUser, deleteUser, allUser };
