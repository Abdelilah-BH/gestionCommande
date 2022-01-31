import express from 'express';
import {
  getUtilisateurs,
  addUtilisateur,
  deleteUtilisateur,
  softDeleteUtilisateur,
  restoreSoftDeleteUtilisateur,
  updateUtilisateur,
  getSofDeleteUtilisateurs,
} from '../controllers/utilisateur';
import { validation } from '../functions';
import { UtilisateurValidation as ValidationSchema } from '../validation/utilisateur';
import { idvalidation as IdValidationSchema } from '../validation/id';

const router = express.Router();

router.get('/', getUtilisateurs);

router.get('/soft-delete', getSofDeleteUtilisateurs);

router.post('/', ValidationSchema, validation, addUtilisateur);

router.patch('/update/:id', ValidationSchema, validation, updateUtilisateur);

router.delete('/delete', IdValidationSchema, validation, deleteUtilisateur);

router.post('/soft-delete', IdValidationSchema, validation, softDeleteUtilisateur);

router.post('/restore-soft-delete', IdValidationSchema, validation, restoreSoftDeleteUtilisateur);

export default router;
