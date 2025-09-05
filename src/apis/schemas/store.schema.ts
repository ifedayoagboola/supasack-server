import { celebrate, Joi, Segments } from 'celebrate';

export const createStoreSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      brand_name: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      description: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      phone_number: Joi.string().required().trim(),
      address: Joi.string().required().trim(),
      state: Joi.string().trim(),
      street: Joi.string().trim(),
      city: Joi.string().trim(),
      img_url: Joi.string().trim(),
      logo: Joi.string().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const updateStoreSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      brand_name: Joi.string().trim(),
      description: Joi.string().trim(),
      phone_number: Joi.string().trim(),
      address: Joi.string().trim(),
      state: Joi.string().trim(),
      street: Joi.string().trim(),
      city: Joi.string().trim(),
      img_url: Joi.string().trim(),
      estimated_delivery_duration: Joi.string().trim(),
      logo: Joi.string().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const createMerchantStoreSchema = celebrate({
  [Segments.BODY]: Joi.object({
    merchantDetails: Joi.object({
      email: Joi.string().email().required().trim(),
      first_name: Joi.string().required().trim(),
      last_name: Joi.string().required().trim(),
      mobile: Joi.string().trim()
    }).required(),

    storeDetails: Joi.object({
      brand_name: Joi.string().required().trim(),
      description: Joi.string().trim(),
      email: Joi.string().email().trim(),
      phone_number: Joi.string().pattern(/^\d+$/).required().trim(),
      address: Joi.string().required().trim(),
      postcode: Joi.string().required().trim()
    }).required()
  })
});

export const updateMerchantStoreSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    storeId: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object()
    .keys({
      brand_name: Joi.string().required().trim(),
      description: Joi.string().required().trim(),
      phone_number: Joi.string().pattern(/^\d+$/).required().trim(),
      email: Joi.string().email().trim(),
      address: Joi.string().required().trim(),
      postcode: Joi.string().required().trim()
    })
    .required()
});

export const activateOrDeactivateStoreSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      store_id: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      })
    })
  },
  {
    abortEarly: false
  }
);

export const fetchStoreSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      slug: Joi.string().trim(),
      user_id: Joi.string().trim(),
      brand_name: Joi.string().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const fetchStoreWalletSchema = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    store_id: Joi.string().required().trim()
  })
});
