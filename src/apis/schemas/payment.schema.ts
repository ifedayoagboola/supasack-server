import { celebrate, Joi, Segments } from 'celebrate';

export const createPayoutAccountSchema = celebrate(
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

export const updatePayoutAccountSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      account_name: Joi.string().required().trim(),
      bank_account_number: Joi.string().required().trim(),
      bank_name: Joi.string().required().trim()
    }),
    [Segments.QUERY]: Joi.object().keys({
      payout_account_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const fetchPayoutAccountSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      store_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);
