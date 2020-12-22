import { celebrate, Joi, Segments } from 'celebrate';

export default {
  register: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.number().integer(),
      password: Joi.string().required(),
    }),
  }),
  login: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
  }),
};
