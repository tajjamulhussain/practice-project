import roles from "./rbac.js";
import { getUser } from "../service/userService.js";

import {
  successResponse,
  existAlreadyResponse,
  notFoundResponse,
  serverErrorResponse,
  validationErrorResponse,
  authorizationErrorResponse,
} from "../utilities/response.js";
import messageUtil from "./message.js";

let grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      //find user

      console.log("User>>>>>", req.userId);
      let User = await getUser({ _id: req.userId });
      //return if not found
      if (!User) return notFoundResponse(res, messageUtil.USER_NOT_FOUND);
      //catch the role of user, its action and its resource
      const permission = roles().can(User.role)[action](resource);
      //if not permission
      if (!permission.granted)
        return authorizationErrorResponse(res, messageUtil.AUTHORIZATION_ERROR);
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default grantAccess;
