import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Client } from './client';
import { DetailCommandeClient } from './detail-commande-client';

export enum StatusLivraison {
  EN_COURS = 'En cours de la livraison',
  LIVRAIS = 'livrais',
}

@Entity({ name: 'commande_client' })
export class CommandeClient extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  n_commande!: number;

  @Column({ type: 'numeric' })
  avance?: number;

  @Column({ type: 'varchar', length: 255 })
  commentaire?: string;

  @Column({ type: 'numeric' })
  montant!: number;

  @Column({ default: false })
  avec_livraison?: boolean;

  @Column({ type: 'enum', enum: StatusLivraison })
  statut_livraison?: string;

  @ManyToOne(() => Client, (client) => client.commandesClient)
  @JoinColumn({ name: 'client_id' })
  client?: Client;

  @OneToMany(() => DetailCommandeClient, (detailCommandeClient) => detailCommandeClient.commandeClient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  detailCommandesClient!: DetailCommandeClient[];

  @CreateDateColumn()
  cree_le!: Date;

  @UpdateDateColumn()
  modifier_le?: Date;

  @DeleteDateColumn()
  supprimer_le?: Date;
}
