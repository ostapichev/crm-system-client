import Joi from 'joi';

const searchValidator = Joi.object({
    search: Joi.string().required()
});

export {
    searchValidator
};
