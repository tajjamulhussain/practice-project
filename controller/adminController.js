import {
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  allAdmin,
} from "../service/adminService.js";
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
} from "../utilities/response.js";

const adminSignUp = async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;

    let Admin = await getAdmin({
      email,
    });

    if (Admin) {
      return existAlreadyResponse(res, messageUtil.emailAlready);
    }
    let hashedPassword = await bcryptHash(password);

    Admin = await createAdmin({
      ...req.body,
      password: hashedPassword,
    });

    if (Admin) {
      return successResponse(res, messageUtil.AdminCreate, Admin);
    } else {
      return notFoundResponse(res, messageUtil.NotFound, {});
    }
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

const adminLogin = async (req, res) => {
  let { email, password } = req.body;
  let Admin = await getAdmin({ email });
  if (!Admin) {
    return notFoundResponse(res, messageUtil.NotFound, {});
  }

  let is_verified = await bcryptCompare(Admin.password, password);

  if (!is_verified) {
    return notFoundResponse(res, messageUtil.incorrectPassword, {});
  }
  const token = issue({ id: Admin._id });
  {
    const data = { Admin, token };
    return successResponse(res, messageUtil.AdminLoggedIn, data);
  }
};

const getAdminById = async (req, res) => {
  try {
    let Admin = await getAdmin({
      _id: req.params.id,
    });
    console.log("req.param", req.params.id);
    return successResponse(res, messageUtil.AdminCreate, Admin);
  } catch {
    return notFoundResponse(res, messageUtil.NotFound, {});
  }
};
const adminUpdate = async (req, res) => {
  try {
    let Admin = await updateAdmin(
      {
        _id: req.query.Admin_id,
      },
      {
        ...req.body,
      }
    );

    return successResponse(res, messageUtil.AdminUpdate, Admin);
  } catch (err) {
    return serverErrorResponse(res, err);
  }
};

const adminDelete = async (req, res) => {
  let Admin = await deleteAdmin({
    _id: req.query.Admin_id,
  });

  if (!Admin) {
    return notFoundResponse(res, messageUtil.NotFound, {});
  }

  return successResponse(res, messageUtil.AdminDeleted, Admin);
};

const getAllAdmin = async (req, res) => {
  try {
    let Admin = await allAdmin();
    return successResponse(res, messageUtil.allAdmin, Admin);
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export {
  adminSignUp,
  adminLogin,
  getAdminById,
  adminUpdate,
  adminDelete,
  getAllAdmin,
};
