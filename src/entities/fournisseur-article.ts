import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, BaseEntity } from 'typeorm';
import { Article } from './article';
import { Fournisseur } from './fournisseur';

@Entity({ name: 'fournisseur_article' })
export class FournisseurArticle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'fournisseur_id' })
  fournisseurId!: number;

  @Column({ name: 'article_id' })
  articleId!: number;

  @Column({ type: 'int' })
  quantite_livre!: number;

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.fournisseurArticle)
  @JoinColumn({ name: 'fournisseur_id' })
  fournisseur!: Fournisseur;

  @ManyToOne(() => Article, (article) => article.fournisseurArticle)
  @JoinColumn({ name: 'article_id' })
  article!: Article;
}
