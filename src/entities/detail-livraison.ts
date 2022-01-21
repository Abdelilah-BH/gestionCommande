import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Article } from './article';
import { Livraison } from './livraison';

@Entity({ name: 'detail_livraison' })
export class DetailLivraison {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ name: 'livraison_id' })
  public livraisonId!: number;

  @Column({ name: 'article_id' })
  public articleId!: number;

  @Column({ type: 'int' })
  public quantite_livre!: number;

  @ManyToOne(() => Livraison, (livraison) => livraison.detailLivraison)
  @JoinColumn({ name: 'livraison_id' })
  public livraison!: Livraison;

  @ManyToOne(() => Article, (article) => article.detailLivraison)
  @JoinColumn({ name: 'article_id' })
  public article!: Article;
}
