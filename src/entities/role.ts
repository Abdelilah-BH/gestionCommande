import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Utilisateur } from './utilisateur';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Utilisateur, (utilisateur) => utilisateur.role, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  utilisateurs?: Utilisateur[];

  @Column({ type: 'varchar' })
  libelle!: string;
}
