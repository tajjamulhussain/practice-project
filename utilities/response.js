import messageUtil from "./message.js";
import { StatusCodes } from "http-status-codes";
const notFoundResponse = (res, message, data) => {
  res.status(StatusCodes.NOT_FOUND).send({
    success: false,
    message,
    data,
  });
};

const validationErrorResponse = (res, errors) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    // error: errors.toString(),
    message: errors.toString(),
    // messageUtil.VALIDATION_ERRORS,
  });
};

const existAlreadyResponse = (res, message) => {
  res.status(StatusCodes.CONFLICT).json({
    success: false,
    message,
  });
};
const successResponse = (res, message, data, token) => {
  const response = {
    success: true,
    message,
  };

  if (data) {
    response.data = data;
    response.token = token;
  }

  res.status(StatusCodes.OK).send(response);
};
const serverErrorResponse = (res, error) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    error: error.toString(),
    message: messageUtil.serverError,
  });
};

const authorizationErrorResponse = (res, message) => {
  res.status(StatusCodes.UNAUTHORIZED).send({
    success: false,
    message,
  });
};

export {
  successResponse,
  existAlreadyResponse,
  notFoundResponse,
  serverErrorResponse,
  authorizationErrorResponse,
  validationErrorResponse,
};
