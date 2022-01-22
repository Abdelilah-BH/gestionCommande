import express from 'express';
import { getArticles, addArticle } from '../controllers/article';
import { validation } from '../functions';
import { AddArticleValidation } from '../validation/article';

const router = express.Router();

router.get('/', getArticles);

router.post('/', AddArticleValidation, validation, addArticle);

export default router;
