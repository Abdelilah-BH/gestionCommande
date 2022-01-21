import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Article } from './article';
import { Fournisseur } from './fournisseur';

@Entity({ name: 'fournisseur_article' })
export class FournisseurArticle {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ name: 'fournisseur_id' })
  public fournisseurId!: number;

  @Column({ name: 'article_id' })
  public articleId!: number;

  @Column({ type: 'int' })
  public quantite_livre!: number;

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.fournisseurArticle)
  @JoinColumn({ name: 'fournisseur_id' })
  public fournisseur!: Fournisseur;

  @ManyToOne(() => Article, (article) => article.fournisseurArticle)
  @JoinColumn({ name: 'article_id' })
  public article!: Article;
}
