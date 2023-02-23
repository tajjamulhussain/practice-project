import {
  successResponse,
  existAlreadyResponse,
  notFoundResponse,
  serverErrorResponse,
  authorizationErrorResponse,
  validationErrorResponse,
} from "../utilities/response.js";
import {
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  allAdmin,
} from "../service/adminService.js";
import messageUtil from "../utilities/message.js";
const isAdmin = async (req, res, next) => {
  let Admin = await getAdmin({ _id: req.user.id });
  if (!Admin) {
    return authorizationErrorResponse(res, messageUtil.unauthorise, {});
  }
  next();
};
export default isAdmin;
