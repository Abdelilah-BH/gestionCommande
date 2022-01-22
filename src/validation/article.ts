import { checkSchema } from 'express-validator';

export const AddArticlec = checkSchema({
  id: {
    in: ['params', 'query'],
    errorMessage: 'Identifient non valide',
    isInt: true,
    toInt: true,
  },
  code: {
    isInt: true,
    isLength: {
      errorMessage: 'Le mot de passe doit contenir au moins 8 caractères.',
      options: { min: 8 },
    },
  },
  libelle: {
    trim: true,
    isString: true,
    notEmpty: true,
    errorMessage: 'Libelle est obligatoire.',
  },
  prix: {
    isNumeric: true,
    notEmpty: true,
    errorMessage: 'Prix est obligatoire.',
  },
  auteurs: {
    trim: true,
    isString: true,
  },
  editeur: {
    trim: true,
    isString: true,
  },
  distributeur: {
    trim: true,
    isString: true,
  },
});
