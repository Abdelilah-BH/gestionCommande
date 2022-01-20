import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Commercial } from './commercial';
import { Librairie } from './librairie';
import { Utilisateur } from './utilisateur';

@Entity()
export class CommandeLibrairie extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  n_commande!: number;

  @Column()
  date_envoi_cmd?: Date;

  @Column()
  date_fin_cmd?: Date;

  @Column({ type: 'numeric' })
  montant!: number;

  @Column({ type: 'varchar', length: 255 })
  commentaire?: string;

  @ManyToOne(() => Librairie, (librairie) => librairie.commandes_librairie)
  librairie?: Librairie;

  @ManyToOne(() => Commercial, (commercial) => commercial.commandes_librairie)
  commercial?: Commercial;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.commandes_librairie)
  utilisateur?: Utilisateur;

  @CreateDateColumn()
  cree_le!: Date;

  @UpdateDateColumn()
  modifier_le?: Date;

  @DeleteDateColumn()
  supprimer_le?: Date;
}
