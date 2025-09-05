import { celebrate, Joi, Segments } from 'celebrate';

export const createSubCategorySchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().trim(),
      category_name: Joi.string().required().trim(),
      img_url: Joi.string().trim(),
      description: Joi.string().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const updateSubCategorySchema = celebrate(
  {
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required().trim()
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().trim(),
      category_name: Joi.string().required().trim(),
      img_url: Joi.string().trim(),
      description: Joi.string().trim()
    })
  },
  {
    abortEarly: false
  }
);
