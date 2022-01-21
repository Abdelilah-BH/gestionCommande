import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import path from 'path';

// Use Enviroment Variables
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  try {
    await createConnection({
      type: 'mysql',
      host: process.env.HOST,
      port: <number | undefined>process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: '',
      database: process.env.DB_NAME,
      entities: [path.join(__dirname, `/entities/*.js`)],
      // "migrations": ["src/migration/**/*.ts"],
      // "subscribers": ["src/subscriber/**/*.ts"],
      logging: true,
      synchronize: true,
    });
    console.info('database connected');

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    app.listen(process.env.PORT, () => console.info(`prot ${process.env.PORT} running.`));
  } catch (error) {
    console.error(error);
  }
}

main();
