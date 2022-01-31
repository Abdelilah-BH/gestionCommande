/* eslint-disable @typescript-eslint/no-unused-vars */
import { MigrationInterface, QueryRunner } from 'typeorm';
import faker from '@faker-js/faker';
import { Utilisateur } from '../entities/utilisateur';

export class utilisateurmig1643285205407 implements MigrationInterface {
  public async up(): Promise<void> {
    // eslint-disable-next-line no-loops/no-loops
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line no-loops/no-loops
    for (const _ of Array.from({ length: 300 })) {
      const utilisateur = new Utilisateur();
      utilisateur.nom_prenom = faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}');
      utilisateur.tel = faker.finance.account(10);
      utilisateur.email = faker.internet.exampleEmail();
      utilisateur.mot_de_passe = faker.internet.password();
      // eslint-disable-next-line prettier/prettier

      await utilisateur.save();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
    //}
  }
}
