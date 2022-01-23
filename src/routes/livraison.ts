import express from 'express';
import {
  getLivraisons,
  addLivraison,
  deleteLivraison,
  softDeleteLivraison,
  restoreSoftDeleteLivraison,
  updateLivraison,
  getSofDeleteLivraisons,
} from '../controllers/livraison';
import { validation } from '../functions';
import { LivraisonValidation as ValidationSchema } from '../validation/livraison';
import { idvalidation as IdValidationSchema } from '../validation/id';

const router = express.Router();

router.get('/', getLivraisons);

router.get('/soft-delete', getSofDeleteLivraisons);

router.post('/', ValidationSchema, validation, addLivraison);

router.patch('/update/:id', ValidationSchema, validation, updateLivraison);

router.delete('/delete/:id', IdValidationSchema, validation, deleteLivraison);

router.post('/soft-delete/:id', IdValidationSchema, validation, softDeleteLivraison);

router.post('/restore-soft-delete/:id', IdValidationSchema, validation, restoreSoftDeleteLivraison);

export default router;
