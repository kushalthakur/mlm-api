import express, { Request, Response } from 'express'
import { getLogger } from 'log4js'
import { each } from 'lodash'
import { Op } from "sequelize";
import { STATUS } from '../constants'
import IBaseController from '../interfaces/IBaseController.Interfaces'
import { authorization } from '../middleware/authorization'
import Member from '../models/Member'
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
         let obj: any = { children: [] }
         const userId: number = req.user && req.user.payload && req.user.payload.id
         const adminMembers: any = await Member.findAll({ where: { parentId: userId, status: STATUS.ACTIVE } })
         each(adminMembers, (elem: any) => {
            obj['name'] = req.user.payload.firstName + ' ' + req.user.payload.lastName
            obj['attributes'] = {
               userId: userId,
            }
            obj['children'].push({
               name: elem && elem.userId,
               sponsorId: elem && elem.sponsorId,
               parentId: elem && elem.parentId,
               level: elem && elem.level,
               children: []
            })
         })
         obj['children'][0]['children'].push({ name: "kushal", children: [] })
         obj['children'][2]['children'].push({ name: "Thakur", children: [] })
         obj['children'][2]['children'][0]['children'].push({ name: "Aman" })

         const otherMembers: any = await Member.findAll({ where: { status: STATUS.ACTIVE } })
         each(otherMembers, (elem: any) => {
            console.log('userId', elem.userId, 'parentId', elem.parentId)
         })
         res.json({ data: otherMembers })
      } catch (err) {
         logger.error(err.message);
         res.status(500).json({ message: err.message });
      }
   }
}

export default TreeController

export const treeData = {
   "name": "CEO",
   "children": [
      {
         "name": "Manager",
         "attributes": {
            "department": "Production"
         },
         "children": [
            {
               "name": "Foreman",
               "attributes": {
                  "department": "Fabrication"
               },
               "children": [
                  {
                     "name": "Workers"
                  }
               ]
            },
            {
               "name": "Foreman",
               "attributes": {
                  "department": "Assembly"
               },
               "children": [
                  {
                     "name": "Workers"
                  }
               ]
            }
         ]
      },
      {
         "name": "Manager",
         "attributes": {
            "department": "Marketing"
         },
         "children": [
            {
               "name": "Sales Officer",
               "attributes": {
                  "department": "A"
               },
               "children": [
                  {
                     "name": "Salespeople"
                  }
               ]
            },
            {
               "name": "Sales Officer",
               "attributes": {
                  "department": "B"
               },
               "children": [
                  {
                     "name": "Salespeople"
                  }
               ]
            }
         ]
      }
   ]
}