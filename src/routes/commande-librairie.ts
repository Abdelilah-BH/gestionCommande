import express from 'express';
import {
  getCommandeLibrairies,
  addCommandeLibrairie,
  deleteCommandeLibrairie,
  softDeleteCommandeLibrairie,
  restoreSoftDeleteCommandeLibrairie,
  updateCommandeLibrairie,
  getSofDeleteCommandeLibrairies,
} from '../controllers/commande-librairie';
import { validation } from '../functions';
import { CommandeLibrairieValidation as ValidationSchema } from '../validation/commande-librairie';
import { idvalidation as IdValidationSchema } from '../validation/id';

const router = express.Router();

router.get('/', getCommandeLibrairies);

router.get('/soft-delete', getSofDeleteCommandeLibrairies);

router.post('/', ValidationSchema, validation, addCommandeLibrairie);

router.patch('/update/:id', ValidationSchema, validation, updateCommandeLibrairie);

router.delete('/delete', IdValidationSchema, validation, deleteCommandeLibrairie);

router.post('/soft-delete', IdValidationSchema, validation, softDeleteCommandeLibrairie);

router.post('/restore-soft-delete', IdValidationSchema, validation, restoreSoftDeleteCommandeLibrairie);

export default router;
