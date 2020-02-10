const Joi = require('@hapi/joi');

const registerValidation = data => {
    const validationschema = Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        keywords: Joi.array().items(Joi.string()),
        cryptoCurrencies: Joi.array().items(Joi.string()),
        currency: Joi.string().required()
    });
    return validationschema.validate(data);
}

module.exports.registerValidation = registerValidation;

const loginValidation = data => {
    const validationschema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    });
    return validationschema.validate(data);
}
module.exports.loginValidation = loginValidation;