import express, { Request, Response } from 'express'
import { getLogger } from 'log4js'
import { each } from 'lodash'
import { Op } from 'sequelize'
import { Validation } from '../utils'
import { STATUS, USER_ROLE } from '../constants'
import IBaseController from '../interfaces/IBaseController.Interfaces'
import { authorization } from '../middleware/authorization'
import Member from '../models/Member'
import User from '../models/User'
import moment from 'moment'

const logger = getLogger("member.controller")

class MemberController implements IBaseController {
   public router = express.Router()
   constructor() {
      this.initRoutes()
   }
   public initRoutes() {
      this.router.route('/members').all(authorization).get(this.getMembers).post(this.addMember).put(this.updateMember)
      this.router.route('/member/:id').all(authorization).get(this.getMemberById).delete(this.deleteMemberById)
      this.router.route('/sponsors').all(authorization).get(this.getSponsorIds)
   }
   getMembers = async (req: Request, res: Response) => {
      try {
         const data: Array<any> = []
         const query = queryParameters(req.query)
         const condition = queryStructure(req.query)
         User.findAndCountAll({
            limit: query.limit,
            offset: query.page,
            where: condition, // { [Op.or]: [{ status: STATUS.ACTIVE }, { status: STATUS.INACTIVE }], id: { [Op.ne]: 1 } },
            order: [[query.sort, query.order]],
            include: [User.associations.members]
         }).then((members: any) => {
            each(members && members.rows, (user: any) => {
               data.push({
                  id: user && user.id,
                  firstName: user && user.firstName,
                  lastName: user && user.lastName,
                  username: user && user.username,
                  email: user && user.email,
                  phone: user && user.phone,
                  address: user && user.address,
                  age: user && user.age,
                  dateOfBirth: user && user.dateOfBirth && moment(user.dateOfBirth).format("MMMM Do YYYY"),
                  sponsorId: user.members[0] && user.members[0].sponsorId,
                  level: user.members[0] && user.members[0].level,
                  status: user && user.status === 1 ? 'ACTIVE' : user.status === 2 ? 'INACTIVE' : ''
               })
            })
            res.json({ error: false, message: "Member fetched successfully", data: data, totalCount: members.count })
         })
      } catch (err: any) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }

   getMemberById = async (req: Request, res: Response) => {
      try {
         User.findOne({
            where: { id: req.params.id, [Op.or]: [{ status: STATUS.ACTIVE }, { status: STATUS.INACTIVE }] },
            include: [User.associations.members]
         }).then((user: any) => {
            let result = {
               id: user && user.id,
               firstName: user && user.firstName,
               lastName: user && user.lastName,
               username: user && user.username,
               email: user && user.email,
               phone: user && user.phone,
               address: user && user.address,
               age: user && user.age,
               dateOfBirth: user && user.dateOfBirth,
               sponsorId: user.members[0] && user.members[0].sponsorId,
               level: user.members[0] && user.members[0].level,
               //    status: user && user.status === 1 ? 'ACTIVE' : user.status === 2 ? 'INACTIVE' : ''
            }
            res.json({ error: false, message: "Member fetched successfully", data: result })
         })
      } catch (err: any) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }

   addMember = async (req: Request, res: Response) => {
      try {
         // const user = new User()
         // user.firstName = "Kushal"
         // user.lastName = "Thakur"
         // user.username = "kushalthakur"
         // user.email = "kushalkumarthakur52@gmail.com"
         // user.password = "$2a$10$pChRV1CgHQ.gIEnKCUy5L.HBauGKYicnHZ6guYW5p9scxezUjjIC2"
         // user.phone = "9914287637"
         // user.address = "Village-Lulani, PO Dharer, Tehsil Baijnath, District-Kangra (HP)"
         // user.age = 28
         // user.dateOfBirth = new Date('1992-08-20')
         // user.role = "ADMIN"
         // await user.save()
         // let member = new Member()
         // member.userId = user.id
         // member.parentId = 0
         // member.level = 0
         // member.sponsorId = "KKT99142"
         // await member.save()
         // res.json({ message: "Member created successfully" })

         const v = Validation(['firstName', 'username', 'sponsorId', 'phone'], req.body)
         v.check().then((matched) => {
            if (!matched) {
               res.status(422).send({ message: "All fields are required", error: v.errors });
            } else {
               Member.findOne({ where: { [Op.or]: [{ status: STATUS.ACTIVE }, { status: STATUS.INACTIVE }], sponsorId: req.body.sponsorId } })
                  .then(async (result: any) => {
                     if (result) {
                        let arr: any = []
                        if (req.body.email) {
                           arr.push({ email: req.body.email })
                        }
                        if (req.body.phone) {
                           arr.push({ phone: req.body.phone })
                        }
                        if (req.body.username) {
                           arr.push({ username: req.body.username })
                        }
                        const checkUsernameEmailPhone: any = await User.findOne({ where: { [Op.or]: arr }, attributes: ['id', 'username', 'email', 'phone'] })
                        if (!checkUsernameEmailPhone) {
                           const sponsorId = Math.floor(10000000 + Math.random() * 90000000)
                           let addNew = { ...req.body, role: USER_ROLE.MEMBER }
                           const user = await User.create(addNew)
                           let member = new Member()
                           member.userId = user.id
                           member.parentId = result.id
                           member.sponsorId = sponsorId.toString()
                           member.level = result.level + 1
                           await member.save()
                           let data = {
                              id: user && user.id,
                              firstName: user && user.firstName,
                              lastName: user && user.lastName,
                              username: user && user.username,
                              email: user && user.email,
                              address: user && user.address,
                              age: user && user.age,
                              phone: user && user.phone,
                              dateOfBirth: user && user.dateOfBirth && moment(user.dateOfBirth).format("MMMM Do YYYY"),
                              status: user && user.status === 1 ? 'ACTIVE' : user.status === 2 ? 'INACTIVE' : '',
                              level: member && member.level,
                              sponsorId: member && member.sponsorId
                           }
                           res.json({ error: false, message: "Member created successfully", data: data })
                           logger.info("Member created successfully")
                        } else {
                           let value = Object.values(checkUsernameEmailPhone.dataValues)
                           if (value.includes(req.body.username)) {
                              res.status(400).json({ error: true, message: "Username already exists" })
                           } else if (value.includes(req.body.email)) {
                              res.status(400).json({ error: true, message: "Email already exists" })
                           } else if (value.includes(req.body.phone)) {
                              res.status(400).json({ error: true, message: "Phone already exists" })
                           }
                        }
                     } else {
                        res.status(400).json({ error: true, message: "Member not found" })
                     }
                  })
            }
         })
      } catch (err: any) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }

   updateMember = async (req: Request, res: Response) => {
      try {
         const v = Validation(['id', 'firstName', 'username', 'phone'], req.body)
         v.check().then((matched) => {
            if (!matched) {
               res.status(422).send({ message: "All fields are required", error: v.errors });
            } else {
               User.findOne({ where: { id: req.body.id, [Op.or]: [{ status: STATUS.ACTIVE }, { status: STATUS.INACTIVE }] }, include: [User.associations.members] })
                  .then(async (user: any) => {
                     if (user) {
                        let arr: any = []
                        if (req.body.email) {
                           arr.push({ email: req.body.email })
                        }
                        if (req.body.phone) {
                           arr.push({ phone: req.body.phone })
                        }
                        if (req.body.username) {
                           arr.push({ username: req.body.username })
                        }
                        const checkUsernameEmailPhone: any = await User.findOne({
                           where: { id: { [Op.ne]: user.id }, [Op.or]: arr }, attributes: ['username', 'email', 'phone']
                        })
                        if (!checkUsernameEmailPhone) {
                           delete req.body.id
                           const data = await user.update(req.body)
                           let result = {
                              id: data && data.id,
                              firstName: data && data.firstName,
                              lastName: data && data.lastName,
                              username: data && data.username,
                              email: data && data.email,
                              address: data && data.address,
                              age: data && data.age,
                              phone: data && data.phone,
                              dateOfBirth: data && data.dateOfBirth && moment(data.dateOfBirth).format("MMMM Do YYYY"),
                              status: data && data.status === 1 ? 'ACTIVE' : data.status === 2 ? 'INACTIVE' : '',
                              level: data && data.members && data.members[0].level,
                              sponsorId: data && data.members && data.members[0].sponsorId
                           }
                           res.json({ error: false, message: "Member updated successfully", data: result })
                           logger.info("Member updated successfully")
                        } else {
                           let value = Object.values(checkUsernameEmailPhone.dataValues)
                           if (value.includes(req.body.username)) {
                              res.status(400).json({ error: true, message: "Username already exists" })
                           } else if (value.includes(req.body.email)) {
                              res.status(400).json({ error: true, message: "Email already exists" })
                           } else if (value.includes(req.body.phone)) {
                              res.status(400).json({ error: true, message: "Phone already exists" })
                           }
                        }
                     } else {
                        res.status(400).json({ error: true, message: "Member not found" })
                     }
                  })
            }
         })
      } catch (err: any) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }

   deleteMemberById = async (req: Request, res: Response) => {
      try {
         User.findOne({
            where: { status: STATUS.ACTIVE, id: req.params.id },
            include: [User.associations.members]
         }).then(async (user: any) => {
            if (user.id === 1) {
               res.status(400).json({ error: true, message: "Wrong user Id" })
            } else {
               user.update({ status: STATUS.INACTIVE })
               Member.update({ status: STATUS.INACTIVE }, { where: { userId: user.id } })
               let result = {
                  id: user && user.id,
                  firstName: user && user.firstName,
                  lastName: user && user.lastName,
                  username: user && user.username,
                  email: user && user.email,
                  address: user && user.address,
                  age: user && user.age,
                  phone: user && user.phone,
                  dateOfBirth: user && user.dateOfBirth && moment(user.dateOfBirth).format("MMMM Do YYYY"),
                  status: user && user.status === 1 ? 'ACTIVE' : user.status === 2 ? 'INACTIVE' : '',
                  level: user && user.members && user.members[0].level,
                  sponsorId: user && user.members && user.members[0].sponsorId
               }
               res.status(200).json({ error: false, message: "Member has been inactive successfully", data: result })
               logger.info("Member has been inactive successfully")
            }
         })
      } catch (err: any) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }

   getSponsorIds = async (req: Request, res: Response) => {
      try {
         Member.findAll({ where: { [Op.or]: [{ status: STATUS.ACTIVE }, { status: STATUS.INACTIVE }] }, attributes: ['sponsorId'] }).then((data: any) => {
            res.status(200).json({ message: "Sponsor id fetched successfully", data: data })
         })
      } catch (err: any) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
}

export default MemberController


export const queryParameters = (params: any = {}) => {
   let query: any = {}
   if (params && (typeof params.limit !== 'undefined')) {
      query['limit'] = parseInt(params.limit)
   } else {
      query['limit'] = 10
   }
   if (params && (typeof params.page !== 'undefined')) {
      query['page'] = parseInt(params.page) * query.limit
   }
   if (params && (typeof params.sort !== 'undefined')) {
      query['sort'] = params.sort
   } else {
      query['sort'] = 'id'
   }
   if (params && (typeof params.order !== 'undefined')) {
      query['order'] = params.order
   } else {
      query['order'] = 'desc'
   }
   return query
}

export const queryStructure = (params: any) => {
   let query: any = {}
   if (params && params.firstName) {
      query = {
         firstName: { [Op.like]: `%${params.firstName}%` },
         [Op.or]: [{ status: STATUS.ACTIVE }, { status: STATUS.INACTIVE }], id: { [Op.ne]: 1 }
      }
   } else {
      query = { [Op.or]: [{ status: STATUS.ACTIVE }, { status: STATUS.INACTIVE }], id: { [Op.ne]: 1 } }
   }
   return query
}