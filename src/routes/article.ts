import express from 'express';
import {
  getArticles,
  addArticle,
  deleteArticle,
  softDeleteArticle,
  restoreSoftDeleteArticle,
  updateArticle,
  getSofDeleteArticles,
} from '../controllers/article';
import { validation } from '../functions';
import { ArticleValidation as ValidationSchema } from '../validation/article';
import { idvalidation as IdValidationSchema } from '../validation/id';

const router = express.Router();

router.get('/', getArticles);

router.get('/soft-delete', getSofDeleteArticles);

router.post('/', ValidationSchema, validation, addArticle);

router.patch('/update/:id', ValidationSchema, validation, updateArticle);

router.delete('/delete', IdValidationSchema, validation, deleteArticle);

router.post('/soft-delete', IdValidationSchema, validation, softDeleteArticle);

router.post('/restore-soft-delete', IdValidationSchema, validation, restoreSoftDeleteArticle);

export default router;
