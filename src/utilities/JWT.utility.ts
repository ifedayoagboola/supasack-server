import jwt from 'jsonwebtoken';
import { User } from '@src/interfaces';

import variables from '@src/variables';

export default class JWT {
  private static secret: jwt.Secret = variables.auth.secret;

  public static encode(payload: Partial<User>, options?: Partial<jwt.SignOptions>): string {
    const token = jwt.sign(payload, this.secret, { expiresIn: '36600h', ...options });
    return token;
  }

  public static decode(token: string): jwt.JwtPayload {
    const decoded = jwt.verify(token, this.secret);
    return decoded as jwt.JwtPayload;
  }
}
