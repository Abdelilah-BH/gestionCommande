import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validationResult } from 'express-validator';
import { MSGERRORSERVER } from '../constants';
import { Article } from '../entities/article';

export const getArticles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const articles = await Article.find({ withDeleted: false });
    return res.json({
      articles,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const addArticle = async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { code, libelle, prix, auteurs, editeur, distributeur } = req.body;
    const article = new Article();
    article.code = code;
    article.libelle = libelle;
    article.prix = prix;
    article.auteurs = auteurs;
    article.editeur = editeur;
    article.distributeur = distributeur;
    // article.image = image;

    const articleCreated = await article.save();
    return res.status(200).json({
      article_created: articleCreated,
      message: 'Article est bien ajouter.',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error && error['code'] === 'ER_DUP_ENTRY') {
        return res.status(500).json({
          message: 'Ce article existe déjà.',
        });
      } else {
        return res.status(500).json({
          message: MSGERRORSERVER,
        });
      }
    } else {
      return res.status(500).json({
        message: MSGERRORSERVER,
      });
    }
  }
};

export const updateArticle = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body);
    getRepository(Article)
      .createQueryBuilder()
      .update()
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .execute();
    return res.status(200).json({
      message: "L'article a été modifié.",
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const deleteArticle = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Article).createQueryBuilder().where('id = :id', { id: req.params.id }).delete().execute();
    return res.status(200).json({
      message: 'Article est bien supprimé définitivement.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const softDeleteArticle = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Article).createQueryBuilder().where('id = :id', { id: req.params.id }).softDelete().execute();
    return res.status(200).json({
      message: 'Article est bien supprimé.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const restoreSoftDeleteArticle = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Article).createQueryBuilder().where('id = :id', { id: req.params.id }).restore().execute();
    return res.status(200).json({
      message: "L'article ont bien été restaurés.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};
