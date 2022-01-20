import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  DeleteDateColumn,
} from 'typeorm';

export abstract class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom_prenom!: string;

  abstract email?: string;

  @Column({ nullable: true })
  tel?: string;

  @CreateDateColumn()
  cree_le!: Date;

  @UpdateDateColumn()
  modifier_le?: Date;

  @DeleteDateColumn()
  supprimer_le?: Date;
}
