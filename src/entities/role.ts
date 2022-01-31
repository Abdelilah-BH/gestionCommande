import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Utilisateur } from './utilisateur';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Utilisateur, (utilisateur) => utilisateur.role, {
    cascade: true,
  })
  utilisateurs?: Utilisateur[];

  @Column({ type: 'varchar' })
  libelle!: string;
}
