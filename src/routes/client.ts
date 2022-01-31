import express from 'express';
import {
  getClients,
  addClient,
  deleteClient,
  softDeleteClient,
  restoreSoftDeleteClient,
  updateClient,
  getSofDeleteClients,
} from '../controllers/client';
import { validation } from '../functions';
import { ClientValidation as ValidationSchema } from '../validation/client';
import { idvalidation as IdValidationSchema } from '../validation/id';

const router = express.Router();

router.get('/', getClients);

router.get('/soft-delete', getSofDeleteClients);

router.post('/', ValidationSchema, validation, addClient);

router.patch('/update/:id', ValidationSchema, validation, updateClient);

router.delete('/delete', IdValidationSchema, validation, deleteClient);

router.post('/soft-delete', IdValidationSchema, validation, softDeleteClient);

router.post('/restore-soft-delete', IdValidationSchema, validation, restoreSoftDeleteClient);

export default router;
