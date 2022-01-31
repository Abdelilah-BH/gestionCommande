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
import { FournisseurArticle } from './fournisseur-article';

@Entity({ name: 'fournisseur' })
export class Fournisseur extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  raison_sociale!: string;
  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  ice?: string;

  @Column({ nullable: true })
  tel?: string;

  @OneToMany(() => Commercial, (commercial) => commercial.fournisseur)
  commercials?: Commercial[];

  @OneToMany(() => FournisseurArticle, (fournisseurArticle) => fournisseurArticle.fournisseur, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  fournisseurArticle!: FournisseurArticle[];

  @CreateDateColumn()
  cree_le!: Date;

  @UpdateDateColumn()
  modifier_le?: Date;

  @DeleteDateColumn({ nullable: true })
  supprimer_le?: Date;
}
