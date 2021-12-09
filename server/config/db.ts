import { Sequelize } from 'sequelize'
import { Environment } from '../environment'

/**
 * 
 * first variable is docker
*/
const host: any = process.env.MYSQL_HOST || Environment.DB_HOST || 'localhost';
const port: any = process.env.MYSQL_PORT || Environment.DB_PORT || '3306';
const user: any = process.env.MYSQL_USER || Environment.DB_USERNAME;
const pass: any = process.env.MYSQL_PASS || Environment.DB_PASSWORD;
const database: any = process.env.MYSQL_DB || Environment.DB_NAME || 'mlm';

export const sequelize = new Sequelize(database, user, pass, {
   host: host,
   dialect: "mysql",
   port: port,
   logging: false
});