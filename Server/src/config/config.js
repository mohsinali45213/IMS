// Configuration file for the application
import dotenv from 'dotenv';
dotenv.config({
  path: '../.env',
});

const config = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  MYSQL_PORT: process.env.MYSQL_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
