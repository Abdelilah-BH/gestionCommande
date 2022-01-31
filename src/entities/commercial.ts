import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CommandeLibrairie } from './commande-librairie';
import { Fournisseur } from './fournisseur';
import { Person } from './person';

@Entity({ name: 'commercial' })
export class Commercial extends Person {
  @Column({ nullable: false })
  email!: string;

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.commercials, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fournisseur_id' })
  fournisseur!: Fournisseur;

  @OneToMany(() => CommandeLibrairie, (commande_librairie) => commande_librairie.commercial, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  commandes_librairie?: CommandeLibrairie[];
}
