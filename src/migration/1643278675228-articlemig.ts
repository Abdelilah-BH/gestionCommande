/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import faker from '@faker-js/faker';
import { Article } from '../entities/article';

export class articlemig1643278675228 implements MigrationInterface {
  public async up(): Promise<void> {
    // eslint-disable-next-line no-loops/no-loops
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line no-loops/no-loops
    for (const _ of Array.from({ length: 300 })) {
      const article = new Article();
      article.code = faker.finance.account(13);
      article.libelle = faker.commerce.productName();
      article.prix = parseFloat(faker.commerce.price());
      article.image = faker.image.imageUrl();
      article.auteurs = faker.finance.accountName();
      article.distributeur = faker.finance.accountName();
      article.editeur = faker.finance.accountName();
      // eslint-disable-next-line prettier/prettier

      await article.save();
    }
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
    //
  }
}
