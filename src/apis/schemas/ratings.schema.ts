import { celebrate, Joi, Segments } from 'celebrate';

export const ratingsSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      rating: Joi.number().required().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      product_id: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      comment: Joi.string().optional().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const fetchRatingsSchema = celebrate(
    {
      [Segments.QUERY]: Joi.object().keys({
        product_id: Joi.string().required().trim().messages({
          'string.empty': `{{#label}} is not allowed to be empty`
        }),
        with_comments: Joi.boolean().optional()
      })
    },
    {
      abortEarly: false
    }
  );