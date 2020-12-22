import { celebrate, Joi, Segments } from 'celebrate';

export default {
  create: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      symbol: Joi.string().required(),
      abbreviation: Joi.string().required(),
      flag: Joi.string().required(),
      isRoutingRequired: Joi.boolean(),
    }),
  }),
  update: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      symbol: Joi.string(),
      abbreviation: Joi.string(),
      flag: Joi.string(),
      isRoutingRequired: Joi.boolean(),
      status: Joi.string().valid('active', 'inactive', 'deleted'),
    }),
  })
};
