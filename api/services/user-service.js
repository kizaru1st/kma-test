import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validate.js";
import { prismaClient } from "../application/database.js";
import bcrypt from "bcrypt";
import { ResponseError } from "../error/response-error.js";

const register = async (request) => {
  const validateUser = validate(registerUserValidation, request);

  // Compare password
  if (validateUser.password !== validateUser.confirmPassword) {
    throw new ResponseError(400, "Password not match");
  }

  // Check username if available
  const findUserExist = await prismaClient.user.count({
    where: {
      username: validateUser.username,
    },
  });
  if (findUserExist > 0) {
    throw new ResponseError(400, "Username already exist");
  }

  // encrypt password
  validateUser.password = await bcrypt.hash(validateUser.password, 10);

  return await prismaClient.user.create({
    data: {
      name: validateUser.name,
      username: validateUser.username,
      password: validateUser.password,
    },
    select: {
      name: true,
      username: true,
    },
  });
};

const login = async (request) => {
  const validateUser = validate(loginUserValidation, request);

  // Check username
  const findUserExist = await prismaClient.user.findFirst({
    where: {
      username: validateUser.username,
    },
  });
  if (!findUserExist)
    throw new ResponseError(400, "Username or Password Wrong");

  // Check password
  const checkPassword = await bcrypt.compare(
    validateUser.password,
    findUserExist.password
  );
  if (!checkPassword)
    throw new ResponseError(400, "Username or Password Wrong");

  // Generate Token
  const token = await bcrypt.hash(findUserExist.username, 10);

  return prismaClient.user.update({
    where: {
      id: findUserExist.id,
    },
    data: {
      token,
    },
    select: {
      name: true,
      token: true,
    },
  });
};

const getUser = async (request) => {
  // Check user exist
  const findUser = await prismaClient.user.findFirst({
    where: {
      id: request,
    },
  });
  if (!findUser) throw new ResponseError(400, "User not found");
  return findUser;
};

const logout = async (request) => {
  // Check user exist
  const findUser = await prismaClient.user.findFirst({
    where: {
      id: request,
    },
  });
  if (!findUser) throw new ResponseError(400, "User not found");

  return prismaClient.user.update({
    where: {
      id: request,
    },
    data: {
      token: null,
    },
  });
};

const update = async (userId, request) => {
  // Validate request
  const validateUser = validate(updateUserValidation, request);

  // Check user exist
  const findUser = await prismaClient.user.findFirst({
    where: {
      id: validateUser.id,
    },
  });
  if (!findUser) throw new ResponseError(400, "User not found");

  // Send Object
  const obj = {};
  if (validateUser.name) obj.name = validateUser.name;
  if (validateUser.username) obj.username = validateUser.username;
  if (validateUser.password)
    obj.password = await bcrypt.hash(validateUser.password, 10);

  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: obj,
  });
};

export default {
  register,
  login,
  getUser,
  logout,
  update,
};
