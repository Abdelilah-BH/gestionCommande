import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CommandeClient } from './commande-client';

@Entity({ name: 'livraison' })
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

  @OneToOne(() => CommandeClient)
  @JoinColumn({ name: 'commande_client_id' })
  commade_client?: CommandeClient;

  @CreateDateColumn()
  cree_le!: Date;

  @UpdateDateColumn()
  modifier_le?: Date;

  @DeleteDateColumn()
  supprimer_le?: Date;
}
