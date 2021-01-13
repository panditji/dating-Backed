import { celebrate, Joi, Segments } from 'celebrate';

export default {

    userProfileCompletion: () => celebrate({
        [Segments.BODY]: Joi.object().keys({
            wantChildren: Joi.string().valid('No', 'Definitely', 'Someday'),
            educationLevel: Joi.string().valid('High School', 'Bachelors degree', 'Graduate degree', 'PhD'),
            smoke: Joi.string().valid('No', 'Yes-sometimes', 'Yes-daily', 'Yes-trying to quit'),
            myersBriggs: Joi.string().valid('No', 'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ESFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'),
            drink: Joi.string().valid('Never', 'Social drinker', 'Moderately', 'Regularly'),
            idealFirstDate: Joi.number(),
            whoPayFirstDay: Joi.string().valid('Men', 'Women', 'Split'),
            expenseveFirstDateMaster: Joi.number(),
            linkedIn: Joi.string()
        }),
    }),

    lookingForProfileMatchQuestion: () => celebrate({
        [Segments.BODY]: Joi.object().keys({
            heightMin: Joi.number().integer(),
            heightMax: Joi.number().integer(),
            ageMin: Joi.number().integer(),
            ageMax: Joi.number().integer(),
            wantChildren: Joi.string().valid('No', 'Definitely', 'Someday'),
            educationLevel: Joi.string().valid('High School', 'Bachelors degree', 'Graduate degree', 'PhD'),
            myersBriggs: Joi.string().valid('No', 'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ESFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'),
            interestedGender: Joi.string().valid('Men', 'Women', 'Other'),
            distanceMax: Joi.number().integer(),

        }),
    }),

};
