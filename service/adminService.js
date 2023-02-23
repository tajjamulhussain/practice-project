import admin from "../model/adminModel.js";
const createAdmin = async (query) => {
  return await admin.create(query);
};
const getAdmin = async (param) => {
  return await admin.findOne(param);
};
const updateAdmin = async (query, data) => {
  return await admin.findOneAndUpdate(query, data, {
    new: true,
  });
};
const deleteAdmin = async (query) => {
  return await admin.findByIdAndRemove(query);
};
const allAdmin = async (query) => {
  return await admin.find(query);
};
export { createAdmin, getAdmin, updateAdmin, deleteAdmin, allAdmin };
