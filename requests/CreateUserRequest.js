const Joi = require('joi');

const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()\-=+_{}\[\]|;:'",.<>\/?`~À-ÿ\s]{8,30}$/;

const CreateUserRequest = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .max(100)
        .required(),

    password: Joi.string()
        .pattern(new RegExp(passwordRegex))
        .required(),

    confirm_password: Joi.string().required().valid(Joi.ref('password'))
})

module.exports = CreateUserRequest;