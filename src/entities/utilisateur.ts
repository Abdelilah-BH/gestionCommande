import { Entity, Column, OneToMany } from 'typeorm';
import { CommandeLibrairie } from './commande-librairie';
import { Person } from './person';

@Entity()
export class Utilisateur extends Person {
  @Column({ nullable: false })
  email!: string;

  @OneToMany(() => CommandeLibrairie, (commande_librairie) => commande_librairie.cree_le)
  commandes_librairie?: CommandeLibrairie[];

  @Column({ select: false })
  mot_de_passe!: string;
}
