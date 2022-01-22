import { checkSchema } from 'express-validator';

export const AddArticleValidation = checkSchema({
  id: {
    optional: { options: { nullable: true } },
    in: ['params', 'query'],
    errorMessage: 'Identifient non valide',
    isInt: true,
    toInt: true,
  },
  code: {
    isString: true,
    errorMessage: 'Code est obligatoire.',
    isLength: {
      errorMessage: 'Code doit contenir au moins 13 caractères.',
      options: { min: 13, max: 13 },
    },
  },
  libelle: {
    isString: true,
    errorMessage: 'Libelle est obligatoire.',
    trim: true,
  },
  prix: {
    isNumeric: true,
    errorMessage: 'Prix est obligatoire.',
  },
  auteurs: {
    isString: true,
    optional: { options: { nullable: true } },
    trim: true,
  },
  editeur: {
    isString: true,
    optional: { options: { nullable: true } },
    trim: true,
  },
  distributeur: {
    isString: true,
    optional: { options: { nullable: true } },
    trim: true,
  },
});
