import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  allUser,
} from "../service/userService.js";
import messageUtil from "../utilities/message.js";
import { issue, verify } from "../middleware/jwt.js";

import {
  bcryptCompare,
  bcryptHash,
  comparePassword,
  hashPassword,
} from "../utilities/bcryptjs.js";

import {
  successResponse,
  existAlreadyResponse,
  notFoundResponse,
  serverErrorResponse,
  validationErrorResponse,
  authorizationErrorResponse,
} from "../utilities/response.js";

const userSignUp = async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;

    let user = await getUser({
      email,
    });

    if (user) {
      return existAlreadyResponse(res, messageUtil.emailAlready);
    }
    let hashedPassword = await bcryptHash(password);

    user = await createUser({
      ...req.body,
      password: hashedPassword,
    });

    if (user) {
      return successResponse(res, messageUtil.userCreate, user);
    } else {
      return notFoundResponse(res, messageUtil.NotFound, {});
    }
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

const userLogin = async (req, res) => {
  let { email, password } = req.body;
  let user = await getUser({ email });
  if (!user) {
    return notFoundResponse(res, messageUtil.NotFound, {});
  }

  let is_verified = await bcryptCompare(user.password, password);

  if (!is_verified) {
    return notFoundResponse(res, messageUtil.incorrectPassword, {});
  }
  const token = issue({ id: user._id });
  {
    const data = { user, token };
    return successResponse(res, messageUtil.userLoggedIn, data);
  }
};

const getUserById = async (req, res) => {
  try {
    let user = await getUser({
      _id: req.params.id,
    });
    console.log("aassas", req.params.id);
    return successResponse(res, messageUtil.userCreate, user);
  } catch {
    return notFoundResponse(res, messageUtil.NotFound, {});
  }
};
const userUpdate = async (req, res) => {
  try {
    let user = await updateUser(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
      }
    );

    return successResponse(res, messageUtil.userUpdate, user);
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

const userDelete = async (req, res) => {
  let user = await deleteUser({
    _id: req.params.id,
  });

  if (!user) {
    return notFoundResponse(res, messageUtil.NotFound, {});
  }

  return successResponse(res, messageUtil.userDeleted, user);
};

const getAllUser = async (req, res) => {
  try {
    let user = await allUser();
    return successResponse(res, messageUtil.alluser, user);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export {
  userSignUp,
  userLogin,
  getUserById,
  userUpdate,
  userDelete,
  getAllUser,
};
