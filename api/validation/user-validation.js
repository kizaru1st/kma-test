import Joi from "joi";

const registerUserValidation = Joi.object({
  name: Joi.string().required().max(50),
  username: Joi.string().required().max(50),
  password: Joi.string().required().max(50),
  confirmPassword: Joi.string().required().max(50),
});

const loginUserValidation = Joi.object({
  username: Joi.string().required().max(50),
  password: Joi.string().required().max(50),
});

const updateUserValidation = Joi.object({
  name: Joi.string().optional().max(50),
  username: Joi.string().optional().max(50),
  password: Joi.string().optional().max(50),
});

export { registerUserValidation, loginUserValidation, updateUserValidation };
