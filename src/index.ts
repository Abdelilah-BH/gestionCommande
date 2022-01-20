import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import path from 'path';

async function main() {
  try {
    await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gestion-commandes-api',
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

    app.listen(3000, () => console.info('prot 3000 running.'));
  } catch (error) {
    console.error(error);
  }
}

main();
