import express from 'express';
import {
  getClients,
  addClient,
  deleteClient,
  softDeleteClient,
  restoreSoftDeleteClient,
  updateClient,
} from '../controllers/client';
import { validation } from '../functions';
import { ClientValidation as ValidationSchema } from '../validation/client';
import { idvalidation as IdValidationSchema } from '../validation/id';

const router = express.Router();

router.get('/', getClients);

router.post('/', ValidationSchema, validation, addClient);

router.patch('/update/:id', ValidationSchema, validation, updateClient);

router.delete('/delete/:id', IdValidationSchema, validation, deleteClient);

router.post('/soft-delete/:id', IdValidationSchema, validation, softDeleteClient);

router.post('/restore-soft-delete/:id', IdValidationSchema, validation, restoreSoftDeleteClient);

export default router;
