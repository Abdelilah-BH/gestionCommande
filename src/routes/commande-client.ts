import express from 'express';
import {
  getCommandeClients,
  addCommandeClient,
  deleteCommandeClient,
  softDeleteCommandeClient,
  restoreSoftDeleteCommandeClient,
  updateCommandeClient,
  getSofDeleteCommandeClients,
} from '../controllers/commande-client';
import { validation } from '../functions';
import { CommandeClientValidation as ValidationSchema } from '../validation/commande-client';
import { idvalidation as IdValidationSchema } from '../validation/id';

const router = express.Router();

router.get('/', getCommandeClients);

router.get('/soft-delete', getSofDeleteCommandeClients);

router.post('/', ValidationSchema, validation, addCommandeClient);

router.patch('/update/:id', ValidationSchema, validation, updateCommandeClient);

router.delete('/delete', IdValidationSchema, validation, deleteCommandeClient);

router.post('/soft-delete', IdValidationSchema, validation, softDeleteCommandeClient);

router.post('/restore-soft-delete', IdValidationSchema, validation, restoreSoftDeleteCommandeClient);

export default router;
