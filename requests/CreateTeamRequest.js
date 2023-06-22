const Joi = require('joi');

const CreateTeamRequest = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    description: Joi.string()
        .min(3)
        .max(500)
        .required(),

    creatorUser: Joi.string().length(24).hex().required()
})

module.exports = CreateTeamRequest;