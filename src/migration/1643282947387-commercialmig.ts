/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import faker from '@faker-js/faker';
import { Commercial } from '../entities/commercial';
import { Fournisseur } from '../entities/fournisseur';

export class commercialmig1643282947387 implements MigrationInterface {
  public async up(): Promise<void> {
    // eslint-disable-next-line no-loops/no-loops
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line no-loops/no-loops
    for (const _ of Array.from({ length: 300 })) {
      const commercial = new Commercial();
      commercial.nom_prenom = faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}');
      commercial.tel = faker.finance.account(10);
      commercial.email = faker.internet.email();
      const fournisseur = await Fournisseur.findOne({ id: faker.datatype.number({ min: 1, max: 100 }) });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      commercial.fournisseur = fournisseur!;

      // eslint-disable-next-line prettier/prettier

      await commercial.save();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }
}
