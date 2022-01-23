import { checkSchema } from 'express-validator';

export const FournisseurValidation = checkSchema({
  id: {
    optional: { options: { nullable: true } },
    in: ['params', 'query'],
    errorMessage: 'Identifient non valide',
    isInt: true,
    toInt: true,
  },
  raison_sociale: {
    isString: true,
    errorMessage: 'Le raison sociale est obligatoires.',
    trim: true,
  },
  tel: {
    isString: true,
    errorMessage: 'Le numéro de téléphone est obligatoire.',
    trim: true,
  },
  email: {
    isString: true,
    errorMessage: 'E-mail est obligatoire.',
    isEmail: {
      bail: true,
      errorMessage: 'E-mail est invalide.',
    },
  },
});
