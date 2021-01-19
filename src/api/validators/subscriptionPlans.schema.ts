import { celebrate, Joi, Segments } from 'celebrate';

export default {

    subscriptionPlans: () => celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string(),
            type: Joi.string().valid('Monthly', 'Quarterly', 'Yearly'),
            text: Joi.string(),
            price: Joi.number(),
            numberOfLove: Joi.number(),
            numberOfFiling: Joi.number(),
            validateDays: Joi.number(),
            statusId: Joi.number()
        }),
    }),

};
