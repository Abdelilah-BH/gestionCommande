import { checkSchema } from 'express-validator';

export const LibrairieValidation = checkSchema({
  id: {
    optional: { options: { nullable: true } },
    in: ['params', 'query'],
    errorMessage: 'Identifient non valide',
    isInt: true,
    toInt: true,
  },
  nom: {
    isString: true,
    errorMessage: 'Le prénom et le nom sont obligatoires.',
    trim: true,
  },
  telephone1: {
    isString: true,
    errorMessage: 'Le numéro de téléphone est obligatoire.',
    trim: true,
  },
  telephone2: {
    isString: true,
    optional: { options: { nullable: true } },
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
  ice: {
    isString: true,
    errorMessage: 'ICE est obligatoire.',
    isLength: {
      errorMessage: 'ICE doit contenir au moins 15 caractères.',
      options: { min: 15, max: 15 },
    },
  },
});
