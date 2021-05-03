import express, { Request, Response } from 'express'
import { getLogger } from 'log4js'
import { each } from 'lodash'
import { STATUS, USER_ROLE } from '../constants'
import IBaseController from '../interfaces/IBaseController.Interfaces'
import { authorization } from '../middleware/authorization'
import Member from '../models/Member'
import User from '../models/User'

const logger = getLogger("member.controller")

class MemberController implements IBaseController {
   public router = express.Router()
   constructor() {
      this.initRoutes()
   }
   public initRoutes() {
      this.router.route('/members').all(authorization).get(this.getMembers).post(this.addMember).put(this.updateMember).delete(this.deleteMember)
      this.router.route('/sponsors').all(authorization).get(this.getSponsorIds)
   }
   getMembers = async (req: Request, res: Response) => {
      try {
         const data: Array<any> = []
         User.findAll({
            where: { status: STATUS.ACTIVE }, include: [User.associations.members]
         }).then((members: any) => {
            each(members, (user: any) => {
               data.push({
                  id: user && user.id,
                  firstName: user && user.firstName,
                  lastName: user && user.lastName,
                  email: user && user.email,
                  phone: user && user.phone,
                  founderClubMember: user && user.founderClubMember,
                  sponsorId: user.members[0] && user.members[0].sponsorId,
                  level: user.members[0] && user.members[0].level,
                  status: user && user.status,
                  createdAt: user && user.createdAt
               })
            })
            res.json({ message: "Member fetched successfully", data: data })
         })
      } catch (err) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }

   addMember = async (req: Request, res: Response) => {
      try {
         // const user = new User()
         // user.firstName = "Kushal"
         // user.lastName = "Thakur"
         // user.email = "kushalkumarthakur52@gmail.com"
         // user.password = "$2a$10$pChRV1CgHQ.gIEnKCUy5L.HBauGKYicnHZ6guYW5p9scxezUjjIC2"
         // user.phone = "+91-9816227689"
         // user.founderClubMember = 0
         // user.role = "ADMIN"
         // await user.save()
         // let member = new Member()
         // member.userId = user.id
         // member.parentId = 0
         // member.level = 0
         // member.sponsorId = "KKT99142"
         // await member.save()
         // res.json({ message: "Member created successfully" })

         if (req.body.firstName !== "" && req.body.lastName !== "" && req.body.email !== "" && req.body.sponsorId !== "" && req.body.founderClubMember !== "") {
            Member.findOne({ where: { sponsorId: req.body.sponsorId, status: STATUS.ACTIVE } })
               .then(async (result: any) => {
                  if (result) {
                     const sponsorId = Math.floor(10000000 + Math.random() * 90000000)
                     const user = new User()
                     user.firstName = req.body.firstName
                     user.lastName = req.body.lastName
                     user.email = req.body.email
                     user.phone = `+91-${req.body.phone}`
                     user.founderClubMember = req.body.founderClubMember
                     user.role = USER_ROLE.MEMBER
                     await user.save()
                     let member = new Member()
                     member.userId = user.id
                     member.parentId = result.id
                     member.sponsorId = sponsorId.toString()
                     member.level = result.level + 1
                     await member.save()
                     res.json({ message: "Member created successfully" })
                  } else {
                     res.status(400).json({ message: "Member not found" })
                  }
               })
         } else {
            res.status(422).json({ message: "All fields are required" })
         }
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

   getSponsorIds = async (req: Request, res: Response) => {
      try {
         Member.findAll({ where: { status: STATUS.ACTIVE }, attributes: ['id', 'sponsorId'] }).then((data: any) => {
            res.status(200).json({ message: "Sponsor id fetched successfully", data: data })
         })
      } catch (err) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
}

export default MemberController