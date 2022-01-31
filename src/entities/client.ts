import { Column, Entity, OneToMany } from 'typeorm';
import { CommandeClient } from './commande-client';
import { Person } from './person';

@Entity({ name: 'client' })
export class Client extends Person {
  @Column({ unique: true })
  email?: string;

  @OneToMany(() => CommandeClient, (commandesClient) => commandesClient.client, {
    cascade: true,
  })
  commandesClient?: CommandeClient[];
}
