import express from 'express';
import {
  getArticles,
  addArticle,
  deleteArticle,
  softDeleteArticle,
  restoreSoftDeleteArticle,
  updateArticle,
} from '../controllers/article';
import { validation } from '../functions';
import { ArticleValidation as ValidationSchema } from '../validation/article';
import { idvalidation as IdValidationSchema } from '../validation/id';

const router = express.Router();

router.get('/', getArticles);

router.post('/', ValidationSchema, validation, addArticle);

router.patch('/update/:id', ValidationSchema, validation, updateArticle);

router.delete('/delete/:id', IdValidationSchema, validation, deleteArticle);

router.post('/soft-delete/:id', IdValidationSchema, validation, softDeleteArticle);

router.post('/restore-soft-delete/:id', IdValidationSchema, validation, restoreSoftDeleteArticle);

export default router;
