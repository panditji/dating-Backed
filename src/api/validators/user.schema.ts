import { celebrate, Joi, Segments } from 'celebrate';

export default {

  register: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().required(),
      password: Joi.string().required(),
      countryCode: Joi.string().required(),
      role: Joi.number().required()
    }),
  }),
  login: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    }),
  }),
};
