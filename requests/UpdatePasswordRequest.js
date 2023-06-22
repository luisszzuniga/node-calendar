const Joi = require('joi');

const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()\-=+_{}\[\]|;:'",.<>\/?`~À-ÿ\s]{8,30}$/;

const UpdatePasswordRequest = Joi.object({
    old_password:
        Joi
        .string()
        .pattern(new RegExp(passwordRegex))
        .required(),

    password: Joi.string()
        .pattern(new RegExp(passwordRegex))
        .required(),

    confirm_password: Joi.string().required().valid(Joi.ref('password'))
})

module.exports = UpdatePasswordRequest;