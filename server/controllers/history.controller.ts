import express, { Request, Response } from 'express'
import IBaseController from '../interfaces/IBaseController.Interfaces'

class HistoryController implements IBaseController {
   public router = express.Router()
   constructor() {
      this.initRoutes()
   }
   public initRoutes() {
      this.router.route('/').post(this.history)
   }
   history = async (req: Request, res: Response) => {
      try {

      } catch (err) {

      }
   }
}

export default HistoryController