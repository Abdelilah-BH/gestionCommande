import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

// Use Enviroment Variables
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import articleRoute from './routes/article';
import clientRoute from './routes/client';
import librairieRoute from './routes/librairie';
import commercialRoute from './routes/commercial';
import fournisseurRoute from './routes/fournisseur';
import livraisonRoute from './routes/livraison';
import utilisateurRoute from './routes/utilisateur';

async function main() {
  try {
    await createConnection({
      type: 'mysql',
      host: process.env.HOST,
      port: <number | undefined>process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: '',
      database: process.env.DB_NAME,
      entities: [path.join(__dirname, `/entities/*.ts`)],
      // "migrations": ["src/migration/**/*.ts"],
      // "subscribers": ["src/subscriber/**/*.ts"],
      logging: true,
      synchronize: true,
    });
    console.info('database connected');

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    // All routes
    app.use('/api/articles', articleRoute);
    app.use('/api/clients', clientRoute);
    app.use('/api/librairies', librairieRoute);
    app.use('/api/commercials', commercialRoute);
    app.use('/api/fournisseurs', fournisseurRoute);
    app.use('/api/livraisons', livraisonRoute);
    app.use('/api/utilisateurs', utilisateurRoute);

    app.listen(process.env.PORT, () => console.info(`prot ${process.env.PORT} running.`));
  } catch (error) {
    console.error(error);
  }
}

main();
