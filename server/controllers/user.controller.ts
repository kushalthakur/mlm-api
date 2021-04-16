import express, { Request, Response } from 'express'
import { getLogger } from 'log4js'
import IBaseController from '../interfaces/IBaseController.Interfaces'
import User from '../models/User'

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

         const user = await User.findByPk(2, {
            include: [User.associations.members],
            rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
         });
         console.log('user', user)
         res.json({ message: "success", data: user })

      } catch (err) {
         logger.error(err.message)
         res.status(500).json({ message: err.message });
      }
   }
}

export default UserController