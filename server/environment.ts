import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` })

export interface IEnvironment {
   PORT: number | string
   JWT_TOKEN_EXP_TIME: string
   JWT_REFRESH_TOKEN_EXP_TIME: string
   JWT_REFRESH_TOKEN_SECRET_KEY: string
   DB_HOST: string
   DB_NAME: string
   DB_USERNAME: string
   DB_PASSWORD: string
   SMTP_HOST: string
   SMTP_USERNAME: string
   SMTP_PASSWORD: string
}

export const Environment: IEnvironment = {
   PORT: process.env.PORT!,
   JWT_TOKEN_EXP_TIME: process.env.JWT_TOKEN_EXP_TIME!,
   JWT_REFRESH_TOKEN_EXP_TIME: process.env.JWT_REFRESH_TOKEN_EXP_TIME!,
   JWT_REFRESH_TOKEN_SECRET_KEY: process.env.JWT_REFRESH_TOKEN_SECRET_KEY!,
   DB_HOST: process.env.DB_HOST! || '127.0.0.1',
   DB_NAME: process.env.DB_NAME! || 'mlm',
   DB_USERNAME: process.env.DB_USERNAME! || 'root',
   DB_PASSWORD: process.env.DB_PASSWORD! || '',
   SMTP_HOST: process.env.SMTP_HOST! || 'smtp.gmail.com',
   SMTP_USERNAME: process.env.SMTP_USERNAME! || 'kushalkumarthakur52@gmail.com',
   SMTP_PASSWORD: process.env.SMTP_PASSWORD! || 'pass'
}