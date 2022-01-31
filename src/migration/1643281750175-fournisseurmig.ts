/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import faker from '@faker-js/faker';
import { Fournisseur } from '../entities/fournisseur';

export class fournisseurmig1643281750175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // eslint-disable-next-line no-loops/no-loops
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line no-loops/no-loops
    for (const _ of Array.from({ length: 100 })) {
      const fournisseur = new Fournisseur();
      fournisseur.raison_sociale = faker.name.findName();
      fournisseur.tel = faker.finance.account(10);
      fournisseur.email = faker.internet.email();
      fournisseur.ice = faker.finance.account(15);

      // eslint-disable-next-line prettier/prettier

      await fournisseur.save();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }
}
