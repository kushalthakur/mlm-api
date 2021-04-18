import express, { Request, Response } from 'express'
import { getLogger } from 'log4js'
import { STATUS } from '../constants'
import IBaseController from '../interfaces/IBaseController.Interfaces'
import { authorization } from '../middleware/authorization'
import Member from '../models/Member'
// import User from '../models/User'

const logger = getLogger("member.controller")

class MemberController implements IBaseController {
   public router = express.Router()
   constructor() {
      this.initRoutes()
   }
   public initRoutes() {
      this.router.route('/members').all(authorization).get(this.getMembers).post(this.addMember).put(this.updateMember).delete(this.deleteMember)
   }
   getMembers = async (req: Request, res: Response) => {
      try {
         Member.findAll({ where: { status: STATUS.ACTIVE } })
            .then((member: any) => {
               res.json({ data: member })
            })

      } catch (err) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }

   addMember = async (req: Request, res: Response) => {
      try {
         // const code = Math.floor(10000000 + Math.random() * 90000000)
      } catch (err) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }

   updateMember = async (req: Request, res: Response) => {
      try {

      } catch (err) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }

   deleteMember = async (req: Request, res: Response) => {
      try {

      } catch (err) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
}

export default MemberController