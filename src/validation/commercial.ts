import { checkSchema } from 'express-validator';

export const CommercialValidation = checkSchema({
  id: {
    optional: { options: { nullable: true } },
    in: ['params', 'query'],
    errorMessage: 'Identifient non valide',
    isInt: true,
    toInt: true,
  },
  nom_prenom: {
    isString: true,
    errorMessage: 'Le prénom et le nom sont obligatoires.',
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
