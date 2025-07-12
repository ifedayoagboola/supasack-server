import { celebrate, Joi, Segments } from 'celebrate';

export const createMerchantAccountSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      business_name: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      first_name: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      last_name: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      email: Joi.string().email().required().trim().lowercase().messages({
        'string.email': `{{#label}} should be a valid email`,
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      password: Joi.string()
        .required()
        .trim()
        .min(8)
        .max(25)
        .regex(/[A-Z]/, 'upper-case')
        .regex(/[a-z]/, 'lower-case')
        .regex(/[^\w]/, 'special character')
        .regex(/[0-9]/, 'digits')
        .messages({
          'string.min': `{{#label}} should be a minimum of 8 characters`,
          'string.max': `{{#label}} should be a maximum of 25 characters`,
          'string.empty': `{{#label}} is not allowed to be empty`
        }),
      phone_number: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      country_id: Joi.number().required(),
      yearly_revenue: Joi.string().required().trim().messages({
        'string.base': `{{#label}} should be a range of accepted numbers`,
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      pass_fee_to_customer: Joi.boolean()
    })
  },
  {
    abortEarly: false
  }
);

export const loginMerchantUserSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required().trim().lowercase().messages({
        'string.email': `{{#label}} should be a valid email`,
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      password: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      })
    })
  },
  {
    abortEarly: false
  }
);

export const updateMerchantUserPasswordSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      current_password: Joi.string().trim().required().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      new_password: Joi.string()
        .trim()
        .min(8)
        .max(25)
        .regex(/[A-Z]/, 'upper-case')
        .regex(/[a-z]/, 'lower-case')
        .regex(/[^\w]/, 'special character')
        .regex(/[0-9]/, 'digits')
        .messages({
          'string.min': `{{#label}} should be a minimum of 8 characters`,
          'string.max': `{{#label}} should be a maximum of 25 characters`,
          'string.empty': `{{#label}} is not allowed to be empty`
        }),
      confirm_password: Joi.string().trim().required().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      })
    })
  },
  {
    abortEarly: false
  }
);

export const twoFactorAuthSchema = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      code: Joi.string().required().trim()
    })
    .messages({
      'string.empty': `{{#label}} is not allowed to be empty`
    })
});

export const verifyMerchantSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().trim().email().messages({
        'string.email': `{{#label}} should be a valid email`,
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      token: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      })
    })
  },
  {
    abortEarly: false
  }
);

export const passwordResetRequestSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().trim().email().messages({
      'string.email': `{{#label}} should be a valid email`,
      'string.empty': `{{#label}} is not allowed to be empty`
    })
  })
});

export const passwordResetSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().trim().email().messages({
        'string.email': `{{#label}} should be a valid email`,
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      token: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      password: Joi.string()
        .required()
        .trim()
        .min(8)
        .max(25)
        .regex(/[A-Z]/, 'upper-case')
        .regex(/[a-z]/, 'lower-case')
        .regex(/[^\w]/, 'special character')
        .regex(/[0-9]/, 'digits')
        .messages({
          'string.min': `{{#label}} should be a minimum of 8 characters`,
          'string.max': `{{#label}} should be a maximum of 25 characters`,
          'string.empty': `{{#label}} is not allowed to be empty`
        }),
      confirm_password: Joi.string().trim().required().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      })
    })
  },
  {
    abortEarly: false
  }
);

export const createAdminUserSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      first_name: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      last_name: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      email: Joi.string().email().required().trim().lowercase().messages({
        'string.email': `{{#label}} should be a valid email`,
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      password: Joi.string()
        .required()
        .trim()
        .min(8)
        .max(25)
        .regex(/[A-Z]/, 'upper-case')
        .regex(/[a-z]/, 'lower-case')
        .regex(/[^\w]/, 'special character')
        .regex(/[0-9]/, 'digits')
        .messages({
          'string.min': `{{#label}} should be a minimum of 8 characters`,
          'string.max': `{{#label}} should be a maximum of 25 characters`,
          'string.empty': `{{#label}} is not allowed to be empty`
        })
    })
  },
  {
    abortEarly: false
  }
);
