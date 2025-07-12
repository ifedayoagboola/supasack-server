import { STORE_ROLES } from '@src/constants/roles.contant';
import { celebrate, Joi, Segments } from 'celebrate';

export const createRoleSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      role: Joi.string()
        .valid(...Object.values(STORE_ROLES))
        .required()
    })
  },
  {
    abortEarly: false
  }
);

export const createStoreRoleSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().trim(),
      store_id: Joi.string().required().trim(),
      role_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const fetchStoreRoleSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      store_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const updateStoreRoleSchema = celebrate(
  {[Segments.QUERY]: Joi.object().keys({
      store_role_id: Joi.string().required().trim()
    }),
    [Segments.BODY]: Joi.object().keys({
      store_id: Joi.string().trim(),
      role_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const deleteStoreRoleSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      store_role_id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);
