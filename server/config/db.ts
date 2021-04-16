import { Sequelize } from 'sequelize'
import { Environment } from '../environment'

export const sequelize = new Sequelize(Environment.MYSQL_DB_NAME, Environment.MYSQL_DB_USERNAME, Environment.MYSQL_DB_PASSWORD, {
   host: Environment.DB_HOST,
   dialect: "mysql",
   logging: false
});