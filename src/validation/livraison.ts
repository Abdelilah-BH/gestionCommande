import { checkSchema } from 'express-validator';

export const LivraisonValidation = checkSchema({
  id: {
    optional: { options: { nullable: true } },
    in: ['params', 'query'],
    errorMessage: 'Identifient non valide',
    isInt: true,
    toInt: true,
  },
  nom_complet: {
    isString: true,
    errorMessage: 'Le prénom et le nom sont obligatoires.',
    trim: true,
  },
  adresse: {
    isString: true,
    errorMessage: 'Adresse est obligatoire.',
    trim: true,
  },
  ville: {
    isString: true,
    errorMessage: 'Ville est obligatoire.',
    trim: true,
  },
  telephone: {
    isString: true,
    errorMessage: 'Le numéro de téléphone est obligatoire.',
    trim: true,
  },
  frais_livraison: {
    isNumeric: true,
    errorMessage: 'Frais de livraison est obligatoire.',
  },
  date_livraison: {
    isDate: true,
    optional: { options: { nullable: true } },
  },
  email: {
    isString: true,
    optional: { options: { nullable: true } },
    isEmail: {
      bail: true,
      errorMessage: 'E-mail est invalide.',
    },
  },
});
