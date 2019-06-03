
const Joi = require('joi');


module.exports.save = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().optional(),
        message: Joi.string().required()
    }).unknown(false),
} 

module.exports.fetch = {
    param: Joi.object({
        name: Joi.string().allow('apple','banana').required(),
    })
}