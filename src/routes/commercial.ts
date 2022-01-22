import express from 'express';
import {
  getCommercials,
  addCommercial,
  deleteCommercial,
  softDeleteCommercial,
  restoreSoftDeleteCommercial,
  updateCommercial,
  getSofDeleteCommercials,
} from '../controllers/commercial';
import { validation } from '../functions';
import { CommercialValidation as ValidationSchema } from '../validation/commercial';
import { idvalidation as IdValidationSchema } from '../validation/id';

const router = express.Router();

router.get('/', getCommercials);

router.get('/soft-delete', getSofDeleteCommercials);

router.post('/', ValidationSchema, validation, addCommercial);

router.patch('/update/:id', ValidationSchema, validation, updateCommercial);

router.delete('/delete/:id', IdValidationSchema, validation, deleteCommercial);

router.post('/soft-delete/:id', IdValidationSchema, validation, softDeleteCommercial);

router.post('/restore-soft-delete/:id', IdValidationSchema, validation, restoreSoftDeleteCommercial);

export default router;
