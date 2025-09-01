import { celebrate, Joi as CelebrateJoi, Segments } from 'celebrate';
import JoiDate from '@joi/date';

const Joi = CelebrateJoi.extend(JoiDate);

export const createProductSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().trim(),
      description: Joi.string().trim(),
      category_id: Joi.string().required().trim(),
      subcategory_id: Joi.string().required().trim(),
      store_id: Joi.string().required().trim(),
      estimated_delivery_duration: Joi.number(),
      quantity: Joi.number().required(),
      quantity_alert: Joi.number().required(),
      price: Joi.number().required(),
      discount: Joi.number().required(),
      images: Joi.array().optional(),
      is_organic: Joi.boolean().optional(),
      is_gluten_free: Joi.boolean().optional(),
      is_vegan: Joi.boolean().optional(),
      is_halal: Joi.boolean().optional(),
      is_kosher: Joi.boolean().optional(),
      allergens: Joi.array().items(Joi.string()).optional(),
      nutritional_info: Joi.object().optional(),
      origin_country: Joi.string().optional(),
      storage_instructions: Joi.string().optional(),
      preparation_instructions: Joi.string().optional(),
      serving_size: Joi.string().optional(),
      weight_unit: Joi.string().optional(),
      brand: Joi.string().optional(),
      manufacturer: Joi.string().trim(),
      manufactured_date: Joi.date().format('DD-MM-YYYY').raw().optional(),
      expiry_date: Joi.date().format('DD-MM-YYYY').raw().optional()
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
      estimated_delivery_duration: Joi.number(),
      is_organic: Joi.boolean().optional(),
      is_gluten_free: Joi.boolean().optional(),
      is_vegan: Joi.boolean().optional(),
      is_halal: Joi.boolean().optional(),
      is_kosher: Joi.boolean().optional(),
      allergens: Joi.array().items(Joi.string()).optional(),
      nutritional_info: Joi.object().optional(),
      origin_country: Joi.string().optional(),
      storage_instructions: Joi.string().optional(),
      preparation_instructions: Joi.string().optional(),
      serving_size: Joi.string().optional(),
      weight_unit: Joi.string().optional(),
      brand: Joi.string().optional(),
      expiry_date: Joi.date().optional()
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

export const fetchProductByStoreSchema = celebrate(
  {
    [Segments.PARAMS]: Joi.object({
      store_id: Joi.string().required().trim()
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
