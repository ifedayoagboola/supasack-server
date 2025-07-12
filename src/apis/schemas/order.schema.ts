import { celebrate, Joi, Segments } from 'celebrate';

export const createOrderSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      account_name: Joi.string().required().trim(),
      bank_account_number: Joi.string().required().trim(),
      bank_name: Joi.string().required().trim()
    }),
    [Segments.QUERY]: Joi.object().keys({
      store_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);