import jwt, { JwtPayload } from 'jsonwebtoken';

export class JwtService {
  static verify(token: string) {
    return new Promise<string | JwtPayload>((resolve, reject) => {
      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? '');
      resolve(decoded);
    });
  }

  static sign(payload: string | Buffer | object) {
    return new Promise<string>((resolve) => {
      const token = jwt.sign(payload, process.env.JWT_SECRET ?? '');
      resolve(token);
    });
  }
}
