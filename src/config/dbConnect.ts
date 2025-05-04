import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import logger from '../utils/logger/logger.js';

config();
const dbConnect = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
);

const connectToDatabase = async () => {
  try {
    await dbConnect.authenticate();
    logger.info('Database connected successfully');
  } catch (error: any) {
    logger.error('Databse connection failed');
    process.exit(1);
  }
};

export { dbConnect, connectToDatabase };
