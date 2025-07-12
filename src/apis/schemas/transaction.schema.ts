import { celebrate, Joi, Segments } from 'celebrate';

export const fetchTransactionSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      store_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);
