export interface IEnvironment {
   PORT: number | string
   JWT_EXPIRE_TIME: string
   DB_HOST: string
   MYSQL_DB_NAME: string
   MYSQL_DB_USERNAME: string
   MYSQL_DB_PASSWORD: string
   SMTP_HOST: string
   SMTP_USERNAME: string
   SMTP_PASSWORD: string
}

export const Environment: IEnvironment = {
   PORT: process.env.PORT || 3005,
   JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME || "1h",
   DB_HOST: process.env.DB_HOST! || '127.0.0.1',
   MYSQL_DB_NAME: process.env.MYSQL_DB_NAME! || 'mlm',
   MYSQL_DB_USERNAME: process.env.MYSQL_DB_USERNAME! || 'root',
   MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD! || '',
   SMTP_HOST: process.env.SMTP_HOST! || 'smtp.gmail.com',
   SMTP_USERNAME: process.env.SMTP_USERNAME! || 'kushalkumarthakur52@gmail.com',
   SMTP_PASSWORD: process.env.SMTP_PASSWORD! || 'pass'
}