import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { DetailCommandeClient } from './detail-commande-client';
import { DetailLivraison } from './detail-livraison';
import { FournisseurArticle } from './fournisseur-article';

@Entity({ name: 'article' })
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;

  @Column()
  libelle!: string;

  @Column()
  prix!: number;

  @Column()
  image?: string;

  @Column()
  auteurs?: string;

  @Column()
  editeur?: string;

  @Column()
  distributeur?: string;

  @OneToMany(() => DetailCommandeClient, (detailCommandeClient) => detailCommandeClient.article, {
    cascade: true,
  })
  detailCommandeClient!: DetailCommandeClient[];

  @OneToMany(() => DetailLivraison, (detailLivraison) => detailLivraison.article, {
    cascade: true,
  })
  detailLivraison!: DetailLivraison[];

  @OneToMany(() => FournisseurArticle, (fournisseurArticle) => fournisseurArticle.article, {
    cascade: true,
  })
  fournisseurArticle!: FournisseurArticle[];

  @CreateDateColumn()
  cree_le!: Date;

  @UpdateDateColumn()
  modifier_le?: Date;

  @DeleteDateColumn()
  supprimer_le?: Date;
}
