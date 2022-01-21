import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CommandeLibrairie } from './commande-librairie';
import { Person } from './person';
import { Role } from './role';

@Entity({ name: 'utilisateur' })
export class Utilisateur extends Person {
  @Column({ nullable: false })
  email!: string;

  @OneToMany(() => CommandeLibrairie, (commande_librairie) => commande_librairie.cree_le)
  commandes_librairie?: CommandeLibrairie[];

  @ManyToOne(() => Role, (role) => role.utilisateurs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role?: Role;

  @Column({ select: false })
  mot_de_passe!: string;
}
