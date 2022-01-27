/* eslint-disable no-loops/no-loops */
import { Connection } from 'typeorm';
import faker from '@faker-js/faker';
import { Article } from '../entities/article';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createData = async (connection: Connection) => {
  // eslint-disable-next-line no-loops/no-loops
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ of Array.from({ length: 50 })) {
    const article = new Article();
    article.code = faker.finance.account(13);
    article.libelle = faker.commerce.productName();
    article.prix = parseFloat(faker.commerce.price());
    article.image = faker.image.imageUrl();
    article.auteurs = faker.finance.accountName();
    article.distributeur = faker.finance.accountName();
    article.editeur = faker.finance.accountName();
    // eslint-disable-next-line prettier/prettier

    await connection.manager.save(article);
  }
};
