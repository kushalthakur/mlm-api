import { Application, RequestHandler } from 'express'
import bodyParser from "body-parser";
import cors from 'cors'

export default (app: Application) => {
   app.use(bodyParser.json({ limit: '50mb' }) as RequestHandler);
   app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);
   app.use(cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['authorization', 'content-type'],
      exposedHeaders: ['Content-Disposition']
   }))
}
