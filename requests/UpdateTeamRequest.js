const Joi = require('joi');

const UpdateTeamRequest = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    description: Joi.string()
        .min(3)
        .max(500)
        .required()
})

module.exports = UpdateTeamRequest;