import express, { Request, Response } from 'express'
import { getLogger } from 'log4js'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import IBaseController from '../interfaces/IBaseController.Interfaces'
import { STATUS } from '../constants'
import { bcryptJs, sendMail } from '../utils'
import { accessToken, signOptions, refreshToken } from '../middleware/authorization'
import User, { UserAttributes } from '../models/User'
import { Environment } from '../environment'

const logger = getLogger("user.controller")

class UserController implements IBaseController {
   public router = express.Router()
   constructor() {
      this.initRoutes()
   }
   public initRoutes() {
      this.router.route('/login').post(this.login)
      this.router.route('/forgot/password').post(this.forgotPasswordUsingEmail).post(this.forgotPassword)
      this.router.route('/auth/token').post(this.refreshAccessToken)
      this.router.route('/auth/logout').post(this.logout)
   }
   login = async (req: Request, res: Response) => {
      try {
         if (req.body.email && req.body.password) {
            User.findOne({ where: { email: req.body.email, status: STATUS.ACTIVE } }).then((user: UserAttributes | null) => {
               if (user) {
                  bcryptJs(req.body.password, user.password, (err: any, isMatch: boolean) => {
                     if (isMatch) {
                        const token: string = accessToken(user, signOptions)
                        const refToken: string = refreshToken(user, Environment.JWT_REFRESH_TOKEN_SECRET_KEY, { expiresIn: Environment.JWT_REFRESH_TOKEN_EXP_TIME })
                        const expiresIn: any = _.pick(jwt.decode(token), ['exp'])
                        const data = {
                           id: user.id,
                           firstName: user.firstName,
                           lastName: user.lastName,
                           username: user.username,
                           email: user.email,
                           role: user.role,
                           status: user.status,
                           createdAt: user.createdAt
                        }
                        refreshTokens.push(refToken)
                        res.status(200).json({
                           message: "Logged In successfully",
                           data: data,
                           token: token,
                           refreshToken: refToken,
                           exp: expiresIn && expiresIn.exp,
                           tokenType: "Bearer"
                        })
                        logger.info('Logged In successfully');
                     } else {
                        res.status(404).json({ message: "You have entered an invalid email or password" })
                     }
                  })
               } else {
                  res.status(404).json({ message: "You have entered an invalid email or password" })
               }
            })
         } else {
            res.status(422).json({ message: "Email and password fields are required" })
         }
      } catch (err: any) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
   refreshAccessToken = async (req: Request, res: Response) => {
      try {
         const refreshToken: any = req.header('x-auth-token');
         if (refreshToken) {
            if (refreshTokens.includes(refreshToken)) {
               const data: any = await jwt.verify(refreshToken, Environment.JWT_REFRESH_TOKEN_SECRET_KEY)
               const user: any = await User.findOne({
                  where: { id: data.id, email: data.email, status: STATUS.ACTIVE },
                  attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'status', 'createdAt']
               })
               const token: string = accessToken(user, signOptions)
               const expiresIn: any = _.pick(jwt.decode(token), ['exp'])
               res.status(200).json({
                  token: token,
                  exp: expiresIn && expiresIn.exp,
                  tokenType: "Bearer"
               })
               logger.info('Generate new access token');
            } else {
               res.status(403).json({ error: true, message: "Invalid refresh token." });
            }
         } else {
            res.status(401).json({ error: true, message: "Not found refresh token." });
         }
      } catch (err: any) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
   logout = async (req: Request, res: Response) => {
      try {
         const refreshToken: any = req.header('x-auth-token');
         if (refreshToken) {
            if (refreshTokens.includes(refreshToken)) {
               refreshTokens.filter((e: any) => {
                  return e !== refreshToken
               })
               res.status(200).json({ error: false, message: "Logout successfully." })
               logger.info('Logout successfully.');
            } else {
               res.status(403).json({ error: true, message: "Invalid refresh token." });
            }
         } else {
            res.status(401).json({ error: true, message: "Not found refresh token." });
         }
      } catch (err: any) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
   forgotPasswordUsingEmail = async (req: Request, res: Response) => {
      try {
         const mail: any = sendMail()
         if (mail) {
            console.log('success', mail)
         }
      } catch (err: any) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
   forgotPassword = async (req: Request, res: Response) => {
      try {

         // User.create({
         //    name: "Ajay Thakur",
         //    email: "ajay@gmail.com",
         //    password: "1234567",
         //    role: "MEMBER",
         // }).then((result: any) => {
         //    Member.create({
         //       userId: result.id,
         //       parentId: 0,
         //       sponsorId: 9380593204,
         //       level: 0
         //    }).then((data: any) => {
         //       res.json({ message: "success", result: result, data: data })
         //    })
         // })

         // const user = await User.findByPk(2, {
         //    include: [User.associations.members]
         // });
         // if (user) {
         //    res.json({ message: "success", data: user })
         // } else {
         //    res.json({ message: "Not found" })
         // }
      } catch (err: any) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
}

export default UserController


let refreshTokens: Array<any> = [];