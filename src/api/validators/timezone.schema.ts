import { celebrate, Joi, Segments } from 'celebrate';

export default {
  create: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      countryCode: Joi.string().required(),
      latitude: Joi.string().required(),
      logitude: Joi.string().required(),
      utcOffset: Joi.string().required(),
      text: Joi.string().required(),
    }),
  }),
  update: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      countryCode: Joi.string(),
      latitude: Joi.string(),
      logitude: Joi.string(),
      utcOffset: Joi.string(),
      text: Joi.string(),
    }),
  })
};
