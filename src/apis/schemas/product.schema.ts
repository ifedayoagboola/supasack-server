import { celebrate, Joi, Segments } from 'celebrate';

export const createProductSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().trim(),
      description: Joi.string().required().trim(),
      category_id: Joi.string().required().trim(),
      store_id: Joi.string().required().trim(),
      estimated_delivery_duration: Joi.number().required()
    })
  },
  {
    abortEarly: false
  }
);

export const updateProductSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().trim(),
      description: Joi.string().trim(),
      category_id: Joi.string().trim(),
      estimated_delivery_duration: Joi.number()
    }),
    [Segments.QUERY]: Joi.object().keys({
      product_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const fetchProductSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      slug: Joi.string().trim(),
      category_id: Joi.string().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const activateOrDeactivateProductSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      product_id: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      })
    })
  },
  {
    abortEarly: false
  }
);

export const createProductVariantSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      color: Joi.string().optional().trim(),
      img_urls: Joi.array().required(),
      video_url: Joi.string().optional().trim(),
      product_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const createProductVariantSpecSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      size: Joi.string().optional(),
      quantity: Joi.number().required(),
      amount: Joi.number().required(),
      product_variant_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const fetchProductVariantSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      store_id: Joi.string().trim(),
      product_id: Joi.string().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const fetchProductVariantSpecSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      product_variant_id: Joi.string().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const updateProductVariantSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      color: Joi.string().trim(),
      img_urls: Joi.array(),
      video_url: Joi.string().trim()
    }),
    [Segments.QUERY]: Joi.object().keys({
      product_variant_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const updateProductVariantSpecSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      size: Joi.string(),
      quantity: Joi.number(),
      amount: Joi.number()
    }),
    [Segments.QUERY]: Joi.object().keys({
      product_variant_spec_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const deleteProductVariantSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      product_variant_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const deleteProductVariantSpecSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      product_variant_spec_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const activateOrDeactivateProductVariantSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      product_variant_id: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      })
    })
  },
  {
    abortEarly: false
  }
);
