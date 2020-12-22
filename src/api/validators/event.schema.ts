import { celebrate, Joi, Segments } from 'celebrate';

export default {
  createEvent: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      isPublic: Joi.number().valid(0, 1).required(),
      eventName: Joi.string().required(),
      eventAbout: Joi.string().required(),
      currency: Joi.number().integer().required(),
      targetAmount: Joi.number().required(),
      isPremiumPlacement: Joi.number().valid(0, 1).required(),
      tags: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      location: Joi.number().valid(1, 2, 3).required(),
      status: Joi.string().valid('saved', 'published').required(),
    }),
  }),
  updateEvent: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      isPublic: Joi.number().valid(0, 1).required(),
      eventName: Joi.string().required(),
      eventAbout: Joi.string().required(),
      currency: Joi.number().integer().required(),
      targetAmount: Joi.number().required(),
      isPremiumPlacement: Joi.number().valid(0, 1).required(),
      tags: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      location: Joi.number().valid(1, 2, 3).required(),
      status: Joi.string().valid('saved', 'published', 'unpublished').required(),
    }),
  })
};
