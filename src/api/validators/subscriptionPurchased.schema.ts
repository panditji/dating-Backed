import { celebrate, Joi, Segments } from 'celebrate';

export default {

    subscriptionPurchased: () => celebrate({
        [Segments.BODY]: Joi.object().keys({
            subcriptionPlanId: Joi.number(),
            transactionId: Joi.string(),
            statusId: Joi.number(),

        }),
    }),

};
