import { celebrate, Joi, Segments } from 'celebrate';

export default {
  create: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      categoryName: Joi.string().required(),
    }),
  }),
  update: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      categoryName: Joi.string(),
    }),
  })
};
