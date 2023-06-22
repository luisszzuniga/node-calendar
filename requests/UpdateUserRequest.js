const Joi = require('joi');

const UpdateUserRequest = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .max(100)
        .required()
})

module.exports = UpdateUserRequest;