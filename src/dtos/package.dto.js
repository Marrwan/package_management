const Joi = require('joi');

const createPackageDto = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    expirationDate: Joi.date().iso().required(),
});

const updatePackageDto = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().positive(),
    expirationDate: Joi.date().iso(),
}).min(1);

module.exports = { createPackageDto, updatePackageDto };
