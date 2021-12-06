import { NextFunction, Response } from 'express'
import { getLogger } from 'log4js'
import fs from 'fs'
import path from 'path'
import jwt, { SignOptions, VerifyOptions, Secret } from 'jsonwebtoken'
import { Environment } from '../../environment'
import { UserAttributes } from '../../models/User'

const logger = getLogger("jwt.middleware")

const privateKey: Secret = fs.readFileSync(path.join(process.cwd(), '/server/private.key'), 'utf8')
const publicKey: Secret = fs.readFileSync(path.join(process.cwd(), '/server/public.key'), 'utf8')

let iss = "Kushal Thakur";
let sub = "kushalkumarthakur52@gmail.com";
let aud = "http://localhost:3005";
let exp = Environment.JWT_TOKEN_EXP_TIME;

export const signOptions: SignOptions = {
   issuer: iss,
   subject: sub,
   audience: aud,
   expiresIn: exp,
   algorithm: "RS256"
}
/**
 * create jwt access token
 *
 */
export const accessToken = (user: UserAttributes, options: SignOptions) => {
   let payload: any = {};
   payload.id = user && user.id;
   payload.firstName = user && user.firstName;
   payload.lastName = user && user.lastName;
   payload.email = user && user.email;
   payload.role = user && user.role;
   payload.status = user && user.status;
   payload.createdAt = user && user.createdAt;
   return jwt.sign(payload, privateKey, options)
}
/**
 * create jwt refresh token
 * 
 */
export const refreshToken = (user: UserAttributes, key: string, options: any) => {
   let payload: any = {};
   payload.id = user && user.id;
   payload.email = user && user.email;
   payload.createdAt = user && user.createdAt;
   return jwt.sign(payload, key, options)
}
/**
 * access token verification
 * 
*/
const verifyOptions: VerifyOptions = {
   issuer: iss,
   subject: sub,
   audience: aud,
   maxAge: exp,
   algorithms: ["RS256"]
};
export const authorization = (req: any, res: Response, next: NextFunction) => {
   try {
      let token: Array<string> | undefined = req.header('Authorization')?.split(" ", 2)
      if (token && token[0] === 'Bearer') {
         const jwtToken: any = jwt.verify(token[1], publicKey, verifyOptions)
         if (!jwtToken) {
            res.status(403).json({ error: true, message: "invalid token." });
         }
         let decoded: any = jwt.decode(token[1], { complete: true });
         req.user = decoded
         next()
      } else {
         res.status(404).json({ error: true, message: "Bearer your_token." });
         logger.error("Bearer your_token");
      }
   } catch (err: any) {
      res.status(403).json({ error: true, message: err.message });
      logger.error(err.message);
   }
}