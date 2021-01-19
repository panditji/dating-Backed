import { celebrate, Joi, Segments } from 'celebrate';

export default {

    payment: () => celebrate({
        [Segments.BODY]: Joi.object().keys({
            venueId: Joi.number().allow(null,),
            paymentType: Joi.string().valid('stripe', 'paypal', 'apple-pay', 'google-pay'),
            paymentApproved: Joi.boolean(),
            paymentDescription: Joi.string(),
            transactionId: Joi.string(),
            paidAmount: Joi.number()
        }),
    }),

};
