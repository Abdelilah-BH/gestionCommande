import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Livraison extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 120 })
  nom_complet!: string;

  @Column({ type: 'varchar', length: 255 })
  adresse!: string;

  @Column({ type: 'varchar', length: 45 })
  ville!: string;

  @Column({ type: 'varchar' })
  telephone!: string;

  @Column({ type: 'float' })
  frais_livraison?: number;

  @Column()
  date_livraison?: Date;

  @CreateDateColumn()
  cree_le!: Date;

  @UpdateDateColumn()
  modifier_le?: Date;

  @DeleteDateColumn()
  supprimer_le?: Date;
}
