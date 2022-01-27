/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import faker from '@faker-js/faker';
import { Client } from '../entities/client';

export class clientmig1643280256041 implements MigrationInterface {
  public async up(): Promise<void> {
    // eslint-disable-next-line no-loops/no-loops
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line no-loops/no-loops
    for (const _ of Array.from({ length: 100 })) {
      const client = new Client();
      client.nom_prenom = faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}');
      client.tel = faker.finance.account(10);
      client.email = faker.internet.exampleEmail();

      // eslint-disable-next-line prettier/prettier

      await client.save();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
    //}
  }
}
