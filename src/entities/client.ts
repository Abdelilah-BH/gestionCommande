import { Column, Entity } from 'typeorm';
// import { CommandeClient } from './commande-client';
import { Person } from './person';

@Entity()
export class Client extends Person {
  @Column({ nullable: true })
  email?: string;

  // @OneToMany(() => CommandeClient, (commandes) => commandes.client, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // commandes?: CommandeClient[];
}
