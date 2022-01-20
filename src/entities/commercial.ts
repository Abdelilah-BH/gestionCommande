import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { CommandeLibrairie } from './commande-librairie';
import { Fournisseur } from './fournisseur';
import { Person } from './person';

@Entity()
export class Commercial extends Person {
  @Column({ nullable: false })
  email!: string;

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.commercials, {
    onDelete: 'CASCADE',
  })
  fournisseur!: Fournisseur;

  @OneToMany(() => CommandeLibrairie, (commande_librairie) => commande_librairie.commercial)
  commandes_librairie?: CommandeLibrairie[];
}
