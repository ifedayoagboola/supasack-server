import { User } from '@src/interfaces/user';
import { createBulkRepo, createUserRepo, fetchUserDetailsRepo, findAuthUser, findUserRepo, updateUserRepo } from '../../repositories/auth.repository';
import bcrypt from 'bcrypt';
import { BadRequestError } from '@src/common/errors';
import JWT from '@src/utilities/JWT.utility';

import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import cuid from 'cuid';

import { PasswordResetRequestPayload } from '@src/interfaces/emailService';
import variables from '@src/variables';
import { fetchStoresRepo, softDeleteStoreRepo } from '@src/apis/repositories/store.repository';
import { fetchProductsRepo, softDeleteProductRepo } from '@src/apis/repositories/product.repository';
import EmailService from '@src/integrations/email-service';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const emailService = new EmailService();

const appleClient = jwksClient({
  jwksUri: 'https://appleid.apple.com/auth/keys'
});

const getAppleSigningKey = async (kid: any) => {
  const key = await appleClient.getSigningKey(kid);
  return key.getPublicKey();
};

const verifyJWT = (json: any, publicKey: any) => {
  return new Promise((resolve) => {
    jwt.verify(json, publicKey, (err: any, payload: any) => {
      if (err) {
        console.log(err);
        return resolve(null);
      }
      resolve(payload);
    });
  });
};

export const createUserSrv = async (user: Partial<User>) => {
  const existingUser = await findUserRepo({ email: user.email });
  if (existingUser) {
    throw new BadRequestError(`User ${user.email} already exists`);
  }
  const createdUser = await createUserRepo(user);
  const accessToken = JWT.encode({ id: createdUser.id });
  delete createdUser.password;
  return {
    accessToken,
    ...createdUser
  };
};

export const createBulkUserSrv = async (user: Partial<User[]>) => {
  // const existingUser = await findUserRepo({ email: user.email });
  // if (existingUser) {
  //   throw new BadRequestError(`User ${user.email} already exists`);
  // }
  const createdUser = await createBulkRepo(user);
  

  return {
    createdUser
  };

};

export const fetchUserDetailsSrv = async (filters: Partial<User>) => {
  const user = await findAuthUser({ ...filters });
  if (!user || !bcrypt.compareSync(filters.password, user.password)) {
    throw new BadRequestError('Invalid credentials');
  }
  return user;
};

export const requestPasswordResetSrv = async (payload: { email: string; redirectUrl: string }) => {
  const existingUser = await fetchUserDetailsRepo({ email: payload.email });
  if (!existingUser) {
    return;
  }
  const accessToken = JWT.encode({ email: existingUser.email });

  const data: PasswordResetRequestPayload = {
    data: {
      to: payload.email,
      fName: existingUser.first_name,
      lName: '',
      actionLink: `${payload.redirectUrl}/${accessToken}`,
      btnText: 'Reset Password',
      body: 'Please click on the <strong>Reset</strong> button below to <strong>reset</strong> your password.'
    },
    templateName: 'password-reset'
  };

  const passwordResetRequest = await emailService.PasswordReset.requestPasswordReset(data);
  return passwordResetRequest;
};

export const resetPasswordSrv = async (payload:any ) => {
  const { token, password} = payload;
  const decodedToken = JWT.decode(token);

  const existingUser = await fetchUserDetailsRepo({email: decodedToken.email})

  if (!existingUser) {
    throw new BadRequestError("Invalid token provided");
  }

  const updatedUser = await updateUserRepo({id: existingUser.id}, {password})
  return updatedUser
}


export const authenticateUserSrv = async (filters: Partial<User>) => {
   console.log(filters);
  const user = await findAuthUser({ email: filters.email });
  
  if (!user || !bcrypt.compareSync(filters.password, user.password) || user.isDeleted) {
    throw new BadRequestError('Invalid credentials');
  }
  const accessToken = JWT.encode({ id: user.id });
  console.log(JSON.stringify(user), "======= SECRET PASS");
  delete user.password;
  return {
    accessToken,
    ...user
  };
};

export const googleAuthUserSrv = async (token: string) => {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: variables.auth.googleAuthClientId
    });

    const payload = ticket.getPayload();
    const oAuthToken = payload['sub'];

    const user = await fetchUserDetailsRepo({ oAuth_token: oAuthToken });

    if (user) {
      const accessToken = JWT.encode({ id: user.id });
      return {
        accessToken,
        ...user
      };
    } else {
      throw new BadRequestError(`Error authenticating using google auth`);
    }
  
};

export const registerUserWithGoogleSrv = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: variables.auth.googleAuthClientId
  });

  const payload = ticket.getPayload();
  const oAuthToken = payload['sub'];

  let  existingUser = await findUserRepo({ email: payload.email });
  if (existingUser) {
        throw new BadRequestError('User already registered, kindly proceed to login');
      // const updateExisting = await updateUserRepo({id: existingUser.id}, { oAuth_channel: "GOOGLE", oAuth_token: oAuthToken }) 
      // const accessToken = JWT.encode({ id: updateExisting.id });
      // return {
      //   accessToken,
      //   ...updateExisting
      // };
      } else {
        const newUserRegPayload = {
          first_name: payload.given_name,
          last_name: payload.family_name,
          oAuth_token: oAuthToken,
          oAuth_channel: "GOOGLE",
          password: cuid(),
          email: payload.email,
          is_email_verified: payload.email_verified,
          img_url: payload.picture,
        }
      const createdUser = await createUserRepo(newUserRegPayload);
      const accessToken = JWT.encode({ id: createdUser.id });
      delete createdUser.password;
      return {
        accessToken,
        ...createdUser
      };
      }
};


export const appleAuthUserSrv = async (identity_token: string, user: string) => {
  const json:any = jwt.decode(identity_token, { complete: true });
  const kid = json?.header?.kid;

  const appleKey = await getAppleSigningKey(kid);

  if (!appleKey) {
    throw new BadRequestError('Apple key not generated');
  }

  const payload: any = await verifyJWT(identity_token, appleKey);
  if (!payload) {
    throw new BadRequestError('Payload not resolved');
  }

  if (payload.sub === user && payload.aud === json.payload.aud) {
    const user = await fetchUserDetailsRepo({ email: payload.email });
    if (user) {
      const accessToken = JWT.encode({ id: user.id });
      return {
        accessToken,
        ...user
      };
    } else {
      throw new BadRequestError(`Error authenticating via apple auth`);
    }

  } else {
    throw new BadRequestError(`Invalid signing key`);
  }
};

export const registerUserWithAppleSrv = async (data: any) => {
  const { identity_token, user, family_name, given_name } = data;

  const json:any = jwt.decode(identity_token, { complete: true });
  const kid = json?.header?.kid;
  const appleKey = await getAppleSigningKey(kid);
  if (!appleKey) {
    throw new BadRequestError('Apple key not generated');
  }

  const payload: any = await verifyJWT(identity_token, appleKey);
  if (!payload) {
    throw new BadRequestError('Payload not resolved');
  }

  if (payload.sub === user && payload.aud === json.payload.aud) {
  
    let existingUser = await findUserRepo({ email: payload.email });
    if (existingUser) {
      throw new BadRequestError('User already registered, kindly proceed to login');
      // const updateExisting = await updateUserRepo({ id: existingUser.id }, { oAuth_channel: 'APPLE', oAuth_token: user });
      // const accessToken = JWT.encode({ id: updateExisting.id });
      // return {
      //   accessToken,
      //   ...updateExisting
      // };
    } else {
      const newUserRegPayload = {
        first_name: given_name,
        last_name: family_name,
        oAuth_token: user,
        oAuth_channel: 'APPLE',
        password: cuid(),
        email: payload.email,
        is_email_verified: true
      };
      const createdUser = await createUserRepo(newUserRegPayload);
      const accessToken = JWT.encode({ id: createdUser.id });
      delete createdUser.password;
      return {
        accessToken,
        ...createdUser
      };
    }
  } else {
    throw new BadRequestError("Apple authentication failed")
  }
};

export const updateUserDetailsSrv = async (filter: Partial<User>, data: Partial<User>): Promise<User> => {
  const existingUser = await findUserRepo({ ...filter });
  if (!existingUser) {
    throw new BadRequestError('Record not found');
  }

  const updatedUser = await updateUserRepo(filter, data);
  return updatedUser;
};

export const deleteUserAccountSrv = async (filter: Partial<User>, data: Partial<User>): Promise<User> => {
  const existingUser = await findUserRepo({ ...filter });
  if (!existingUser) {
    throw new BadRequestError('Record not found');
  }
  const updatedUser = await updateUserRepo(filter, data)
  const stores = await fetchStoresRepo({ user_id: filter.id });
  if (stores && stores.length !== 0) {
    await softDeleteStoreRepo({ user_id: filter.id });
  }

  const products = await fetchProductsRepo({user_id: filter.id})
  if (products && products.length !== 0) {
    await softDeleteProductRepo({ user_id: filter.id });
  }


  return updatedUser;
};