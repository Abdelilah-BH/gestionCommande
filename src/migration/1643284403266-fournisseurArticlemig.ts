/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import faker from '@faker-js/faker';
import { Article } from '../entities/article';
import { Fournisseur } from '../entities/fournisseur';
import { FournisseurArticle } from '../entities/fournisseur-article';

export class fournisseurArticlemig1643284403266 implements MigrationInterface {
  public async up(): Promise<void> {
    // eslint-disable-next-line no-loops/no-loops
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line no-loops/no-loops
    for (const _ of Array.from({ length: 200 })) {
      const fournisseurArticle = new FournisseurArticle();
      fournisseurArticle.quantite_livre = faker.datatype.number({ min: 1, max: 600 });
      const fournisseur = await Fournisseur.findOne({ id: faker.datatype.number({ min: 4, max: 274 }) });
      const article = await Article.findOne({ id: faker.datatype.number({ min: 30, max: 155 }) });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fournisseurArticle.fournisseur = fournisseur!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fournisseurArticle.article = article!;

      // eslint-disable-next-line prettier/prettier

      await fournisseurArticle.save();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }
}
