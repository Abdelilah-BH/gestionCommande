import express from 'express';
import { getArticles, addArticle } from '../controllers/article';
import { AddArticleValidation } from '../validation/article';

const router = express.Router();

router.get('/', getArticles);

router.post('/', AddArticleValidation, addArticle);

export default router;
