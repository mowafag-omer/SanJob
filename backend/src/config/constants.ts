import dotenv from 'dotenv';

dotenv.config();

type nodeEnvType = 'development' | 'production';
export const NODE_ENV = (process.env.NODE_ENV as nodeEnvType) || 'development';
export const __prod__ = NODE_ENV === 'production';

const config = {
  DB_DIALECT: process.env.DB_DIALECT as string || 'mysql',
  DB_NAME: process.env.TYPEORM_DATABASE as string || 'SanJob',
  DB_USERNAME: process.env.TYPEORM_USERNAME as string || 'root',
  DB_PASSWORD: process.env.TYPEORM_PASSWORD as string || '',
  DB_HOST: process.env.TYPEORM_HOST as string || 'localhost',
  DB_PORT: parseInt(process.env.TYPEORM_PORT as string) || 3306,
  PORT: process.env.APP_PORT as string || 4001,
  JWT_SECRET: process.env.JWT_SECRET as string || 'whateveritis',
  API_VERSION: process.env.API_VERSION as string || '/api/v1'
};

export default config;
