import express, { Request, Response } from 'express';
import { Article } from '../entities/article';

const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await Article.find();
    res.json({
      articles,
      message: 'Successfuly.',
    });
  } catch (error) {
    console.error(error);
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
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

    await article.save();
    res.json({
      message: 'Successfuly.',
    });
  } catch (error) {
    console.error(error);
  }
});

export default router;
