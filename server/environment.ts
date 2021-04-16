export interface IEnvironment {
   PORT: number | string
   DB_HOST: string
   MYSQL_DB_NAME: string
   MYSQL_DB_USERNAME: string
   MYSQL_DB_PASSWORD: string
}

export const Environment: IEnvironment = {
   PORT: process.env.PORT || 3005,
   DB_HOST: process.env.DB_HOST! || '127.0.0.1',
   MYSQL_DB_NAME: process.env.MYSQL_DB_NAME! || 'mlm',
   MYSQL_DB_USERNAME: process.env.MYSQL_DB_USERNAME! || 'root',
   MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD! || ''
}