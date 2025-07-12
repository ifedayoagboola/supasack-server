import { celebrate, Joi, Segments } from 'celebrate';

export const createAddressBookSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      first_name: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      last_name: Joi.string().required().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      email: Joi.string().email().trim().lowercase().messages({
        'string.email': `{{#label}} should be a valid email`,
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      phone_number: Joi.string().required().trim(),
      state: Joi.string().required().trim(),
      street: Joi.string().required().trim(),
      city: Joi.string().required().trim(),
      alternative_phone_number: Joi.string().optional().trim(),
      additional_information: Joi.string().optional().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const updateAddressBookSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      first_name: Joi.string().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      last_name: Joi.string().trim().messages({
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      email: Joi.string().email().trim().lowercase().messages({
        'string.email': `{{#label}} should be a valid email`,
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      phone_number: Joi.string().trim(),
      state: Joi.string().trim(),
      street: Joi.string().trim(),
      city: Joi.string().trim(),
      alternative_phone_number: Joi.string().optional().trim(),
      additional_information: Joi.string().optional().trim()
    }),
    [Segments.QUERY]: Joi.object().keys({
      address_book_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const updateAddressBookStatusSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      address_book_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const deleteAddressBookSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      address_book_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);
