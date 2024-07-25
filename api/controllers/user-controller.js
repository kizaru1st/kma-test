import userService from "../services/user-service.js";

const register = async (req, res, next) => {
  try {
    const reqBody = req.body
    const result = await userService.register(reqBody);
    return res.status(200).json({
      message: "Register success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    return res.status(200).json({
      message: "Login success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await userService.getUser(userId);
    return res.status(200).json({
      message: "Get user success",
      username: result.username,
      name: result.name,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await userService.logout(userId);
    return res.status(200).json({
      message: "Logout success",
    });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const reqBody = req.body;
    const result = await userService.update(userId, reqBody);
    return res.status(200).json({
      message: "Update success",
      username: result.username,
      name: result.name,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getUser,
  logout,
  update,
};
