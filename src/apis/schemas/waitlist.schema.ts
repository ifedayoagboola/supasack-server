import { celebrate, Joi, Segments } from 'celebrate';

export const waitlistSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      full_name: Joi.string().required().trim(),
      email: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);
