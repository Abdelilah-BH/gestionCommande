import express from 'express';
import {
  getLibrairies,
  addLibrairie,
  deleteLibrairie,
  softDeleteLibrairie,
  restoreSoftDeleteLibrairie,
  updateLibrairie,
  getSofDeleteLibrairies,
} from '../controllers/librairie';
import { validation } from '../functions';
import { LibrairieValidation as ValidationSchema } from '../validation/librairie';
import { idvalidation as IdValidationSchema } from '../validation/id';

const router = express.Router();

router.get('/', getLibrairies);

router.get('/soft-delete', getSofDeleteLibrairies);

router.post('/', ValidationSchema, validation, addLibrairie);

router.patch('/update/:id', ValidationSchema, validation, updateLibrairie);

router.delete('/delete/:id', IdValidationSchema, validation, deleteLibrairie);

router.post('/soft-delete/:id', IdValidationSchema, validation, softDeleteLibrairie);

router.post('/restore-soft-delete/:id', IdValidationSchema, validation, restoreSoftDeleteLibrairie);

export default router;
