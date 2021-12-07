const Joi = require('joi');

const getTokenDetails = Joi.object({
  query: Joi.object({
    token: Joi.string().required()
  }).required()
});

const register = Joi.object({
  body: Joi.object({
    id: Joi.string().guid().required(),
    username: Joi.string().trim().max(40).required(),
    email: Joi.string().trim().email().required(),
    user_role: Joi.number().integer().required(),
    password: Joi.string().trim().required()
  }).required()
});


const login = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim()
  }).required()
});

module.exports = {
  getTokenDetails,
  register,
  login,
};
