import { celebrate, Joi, Segments } from 'celebrate';

export default {

  userProfile: () => celebrate({
    [Segments.BODY]: Joi.object().keys({
      dob: Joi.date().required(),
      gender: Joi.string().valid('Men', 'Women', 'Other'),
      addressLine: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      postCode: Joi.number().integer(),
      latitude: Joi.string().required(),
      longitude: Joi.string().required(),
      interestedGender: Joi.string().valid('Men', 'Women', 'Other'),
      AboutMe: Joi.string().allow(null, ''),
      height: Joi.number().allow(null,),
      job: Joi.string().allow(null, '')
    }),
  }),

};
