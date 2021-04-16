import express, { Request, Response } from 'express'
import { getLogger } from 'log4js'
import IBaseController from '../interfaces/IBaseController.Interfaces'
import User from '../models/User'
import Member from '../models/Member'

const logger = getLogger("user.controller")

class UserController implements IBaseController {
   public router = express.Router()
   constructor() {
      this.initRoutes()
   }
   public initRoutes() {
      this.router.route('/login').get(this.signin)
   }
   signin = async (req: Request, res: Response) => {
      try {
         // User.create({
         //    name: "Kushal Thakur",
         //    email: "kushal@gmail.com",
         //    password: "1234567",
         //    role: "ADMIN"
         // }).then((result: any) => {
         //    Member.create({
         //       userId: result.id,
         //       parentId: 0,
         //       depth: 0
         //    }).then((data: any) => {
         //       res.json({ message: "success", result: result, data: data })
         //    })
         // })
         const user: any = await User.findByPk(1);
         // const user: any = await User.findOne({ where: { id: 1 } });
         if (user) {
            console.log('Synchronous', user)
            res.json({ data: user })
         } else {
            console.log('Synchronous Not Found')
         }

      } catch (err) {
         logger.error('Catch error')
      }
   }
}

export default UserController