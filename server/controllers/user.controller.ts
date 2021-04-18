import express, { Request, Response } from 'express'
import { getLogger } from 'log4js'
import IBaseController from '../interfaces/IBaseController.Interfaces'
import { STATUS } from '../constants'
import { bcryptJs, sendMail } from '../utils'
import { authToken } from '../middleware/authorization'
import User, { UserAttributes } from '../models/User'

const logger = getLogger("user.controller")

class UserController implements IBaseController {
   public router = express.Router()
   constructor() {
      this.initRoutes()
   }
   public initRoutes() {
      this.router.route('/login').post(this.login)
      this.router.route('/forgot/password').get(this.forgotPasswordUsingEmail).post(this.forgotPassword)
   }
   login = async (req: Request, res: Response) => {
      try {
         if (req.body.email && req.body.password) {
            User.findOne({ where: { email: req.body.email, status: STATUS.ACTIVE } }).then((user: UserAttributes | null) => {
               if (user) {
                  bcryptJs(req.body.password, user.password, (err: any, isMatch: boolean) => {
                     if (isMatch) {
                        const token: any = authToken(user)
                        res.json({ message: "Logged In successfully", data: user, token: token })
                        logger.info('Logged In successfully');
                     } else {
                        res.status(422).json({ message: "You have entered an invalid email or password" })
                     }
                  })
               } else {
                  res.status(422).json({ message: "You have entered an invalid email or password" })
               }
            })
         } else {
            res.status(422).json({ message: "Email and password fields are required" })
         }
      } catch (err) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
   forgotPasswordUsingEmail = async (req: Request, res: Response) => {
      try {
         const mail: any = sendMail()
      } catch (err) {
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
         //    founderClubMember: 0
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
      } catch (err) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
}

export default UserController