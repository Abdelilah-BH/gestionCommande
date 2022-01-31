import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CommandeLibrairie } from './commande-librairie';

@Entity({ name: 'librairie' })
export class Librairie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;

  @Column()
  telephone1!: string;

  @Column()
  telephone2?: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  logo!: string;

  @Column({ length: 15 })
  ice!: string;

  @OneToMany(() => CommandeLibrairie, (commande_librairie) => commande_librairie.librairie, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  commandes_librairie?: CommandeLibrairie[];

  @CreateDateColumn()
  cree_le!: Date;

  @UpdateDateColumn()
  modifier_le?: Date;

  @DeleteDateColumn({ nullable: true })
  supprimer_le?: Date;
}
