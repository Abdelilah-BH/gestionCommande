import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  // OneToMany,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Commercial } from './commercial';

@Entity()
export class Fournisseur extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  raison_sociale!: string;
  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  ice?: string;

  @Column({ nullable: true })
  tel?: string;

  @OneToMany(() => Commercial, (commercial) => commercial.fournisseur)
  commercials?: Commercial[];

  @CreateDateColumn()
  cree_le!: Date;

  @UpdateDateColumn()
  modifier_le?: Date;

  @DeleteDateColumn({ nullable: true })
  supprimer_le?: Date;
}
