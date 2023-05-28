import * as bcrypt from 'bcrypt';
import { sign, SignOptions, VerifyOptions, verify } from 'jsonwebtoken';

export async function getPasswordHash(password: string): Promise<string> {
  const salt = 10;
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePassword(
  providedPassword,
  storedHashedPassword,
): Promise<boolean> {
  const passwordMatch = await bcrypt.compare(
    providedPassword,
    storedHashedPassword,
  );
  return passwordMatch;
}

export async function signToken(
  payload: any,
  options?: SignOptions,
): Promise<string> {
  const token = sign(payload, 'asdasdasdasdasd', options);
  return token;
}

export async function decodeToken(
  token: string,
  options?: VerifyOptions,
): Promise<any> {
  return verify(token, 'asdasdasdasdasd', options);
}

// export async decodeToken(token: string, options?: VerifyOptions): Promise<any> {
//   const decoded = verify(token, this.secretKey, options);
//   return decoded;
// }
