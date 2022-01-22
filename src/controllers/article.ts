import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { MSGERRORSERVER } from '../constants';
import { Article } from '../entities/article';

export const getArticles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const articles = await Article.find();
    return res.json({
      articles,
    });
  } catch (error) {
    console.error(error);
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
    console.log(req.body);
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
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};
