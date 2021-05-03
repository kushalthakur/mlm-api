import express, { Request, Response } from 'express'
import { getLogger } from 'log4js'
import { each } from 'lodash'
import { Op } from "sequelize"
import { STATUS } from '../constants'
import IBaseController from '../interfaces/IBaseController.Interfaces'
import { authorization } from '../middleware/authorization'
import User from '../models/User'

const logger = getLogger("tree.controller")

class TreeController implements IBaseController {
   public router = express.Router()
   constructor() {
      this.initRoutes()
   }
   public initRoutes() {
      this.router.route('/tree').all(authorization).get(this.getTree)
   }
   getTree = async (req: Request, res: Response) => {
      try {
         let members: Array<any> = []
         const users: any = await User.findAll({ where: { status: STATUS.ACTIVE }, include: [User.associations.members] })
         each(users, (user: any) => {
            members.push({
               id: user.members[0] && user.members[0].id,
               name: user && user.firstName + ' ' + user.lastName,
               parentId: user.members[0] && user.members[0].parentId,
               attributes: {
                  email: user && user.email,
                  founderClubMember: user && user.founderClubMember,
                  sponsorId: user.members[0] && user.members[0].sponsorId,
                  level: user.members[0] && user.members[0].level,
                  status: user && user.status
               },
               children: null
            })
         })
         const tree = makeTree(members)
         res.status(200).json({ message: "Tree get successfully", data: tree })
      } catch (err) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
}

export default TreeController

export const makeTree = (data: any) => {
   let map: any = {}, roots: Array<any> = [], node: any, i: number
   for (i = 0; i < data.length; i += 1) {
      map[data[i].id] = i // initialize the map
      data[i].children = [] // initialize the children
   }
   for (i = 0; i < data.length; i += 1) {
      node = data[i]
      if (node.parentId !== 0) {
         data[map[node.parentId]].children.push(node) // if you have dangling branches check that map[node.parentId] exists
      } else {
         roots.push(node)
      }
   }
   return roots
}