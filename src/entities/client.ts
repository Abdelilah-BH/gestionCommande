import { Column, Entity, OneToMany } from 'typeorm';
import { CommandeClient } from './commande-client';
import { Person } from './person';

@Entity({ name: 'client' })
export class Client extends Person {
  @Column({ nullable: true })
  email?: string;

  @OneToMany(() => CommandeClient, (commandesClient) => commandesClient.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  commandesClient?: CommandeClient[];
}
