import express from 'express';
import {
  getFournisseurs,
  addFournisseur,
  deleteFournisseur,
  softDeleteFournisseur,
  restoreSoftDeleteFournisseur,
  updateFournisseur,
  getSofDeleteFournisseurs,
} from '../controllers/fournisseur';
import { validation } from '../functions';
import { FournisseurValidation as ValidationSchema } from '../validation/fournisseur';
import { idvalidation as IdValidationSchema } from '../validation/id';

const router = express.Router();

router.get('/', getFournisseurs);

router.get('/soft-delete', getSofDeleteFournisseurs);

router.post('/', ValidationSchema, validation, addFournisseur);

router.patch('/update/:id', ValidationSchema, validation, updateFournisseur);

router.delete('/delete/:id', IdValidationSchema, validation, deleteFournisseur);

router.post('/soft-delete/:id', IdValidationSchema, validation, softDeleteFournisseur);

router.post('/restore-soft-delete/:id', IdValidationSchema, validation, restoreSoftDeleteFournisseur);

export default router;
