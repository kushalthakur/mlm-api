import express, { Application, Request, Response } from 'express'
import { configure, getLogger } from 'log4js'
import { sequelize, logConfig } from "./config";
import { Environment } from './environment'
const logger = getLogger("app")

class App {
   public app: Application
   public port: number | string
   constructor(appInitialization: { middlewares: (app: Application) => void; controllers: any }) {
      this.app = express()
      configure(logConfig)
      this.port = Environment.PORT
      // Middlewares
      appInitialization.middlewares(this.app)
      // routes with controller preload
      this.routes(appInitialization.controllers)
   }

   private routes(controllers: { forEach: (arg: (controller: any) => void) => void }) {
      // Root route
      this.app.get('/', (req: Request, res: Response) => {
         res.status(200).send({ message: "Server is running..." })
      })
      // All api routes
      controllers.forEach(controller => {
         this.app.use("/api", controller.router)
      })
      // Default routes
      this.app.get('**', (req: Request, res: Response) => {
         res.status(400).send('Not Found');
      })
   }

   public listen() {
      this.app.listen(this.port, async () => {
         logger.info(`App listening on the http://localhost:${this.port}`)
         sequelize.sync().then(() => {
            logger.info("Connected to Database successfully")
         }).catch((e: any) => {
            logger.error(e.message)
         })
      })
   }
}

export default App