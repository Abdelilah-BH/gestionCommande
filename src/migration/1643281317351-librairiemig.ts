/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import faker from '@faker-js/faker';
import { Librairie } from '../entities/librairie';

export class librairiemig1643281317351 implements MigrationInterface {
  public async up(): Promise<void> {
    // eslint-disable-next-line no-loops/no-loops
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line no-loops/no-loops
    for (const _ of Array.from({ length: 300 })) {
      const librairie = new Librairie();
      librairie.nom = faker.company.companyName();
      librairie.telephone1 = faker.finance.account(10);
      librairie.telephone2 = faker.finance.account(10);
      librairie.email = faker.internet.exampleEmail();
      librairie.logo = faker.image.business();
      librairie.ice = faker.finance.account(15);

      // eslint-disable-next-line prettier/prettier

      await librairie.save();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }
}
