import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn } from 'typeorm';
import { CommandeClient } from './commande-client';
import { Article } from './article';

@Entity({ name: 'detail_commande_client' })
export class DetailCommandeClient {
  @PrimaryGeneratedColumn()
  public id!: number;

  @PrimaryColumn('int', { name: 'commande_client_id' })
  public commande_clientId!: number;

  @PrimaryColumn('int', { name: 'article_id' })
  public articleId!: number;

  @Column({ type: 'int' })
  public quantite_cmd?: number;

  @Column({ type: 'int' })
  public quantite_recu?: number;

  @Column({ type: 'int' })
  public quantite_restant?: number;

  @Column({ type: 'int' })
  public remise?: number;

  @ManyToOne(() => CommandeClient, (commandeClient) => commandeClient.detailCommandesClient)
  @JoinColumn({ name: 'commande_client_id' })
  public commandeClient!: CommandeClient;

  @ManyToOne(() => Article, (article) => article.detailCommandeClient)
  @JoinColumn({ name: 'article_id' })
  public article!: Article;
}
