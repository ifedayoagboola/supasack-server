import { celebrate, Joi, Segments } from 'celebrate';

export const createCategorySchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      category: Joi.string().required().trim(),
      img_url: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const updateCategorySchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      category: Joi.string().trim(),
      img_url: Joi.string().trim()
    }),
    [Segments.QUERY]: Joi.object().keys({
      category_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);
