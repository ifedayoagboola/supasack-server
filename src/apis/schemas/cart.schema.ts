import { celebrate, Joi, Segments } from 'celebrate';

export const createCartSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      product_id: Joi.string().required().trim(),
      product_variant_id: Joi.string().required().trim(),
      product_variant_spec_id: Joi.string().required().trim(),
      quantity: Joi.number().required()
    })
  },
  {
    abortEarly: false
  }
);

export const updateCartSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      quantity: Joi.number().required()
    }),
    [Segments.QUERY]: Joi.object().keys({
      cart_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const deleteCartSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      cart_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);
