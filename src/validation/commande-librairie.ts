import { checkSchema } from 'express-validator';

export const CommandeLibrairieValidation = checkSchema({
  n_commande: {
    optional: { options: { nullable: true } },
    in: ['params', 'query'],
    errorMessage: 'Identifient non valide',
    isInt: true,
    toInt: true,
  },
  date_envoi_cmd: {
    isDate: true,
    optional: { options: { nullable: true } },
  },
  date_fin_cmd: {
    isDate: true,
    optional: { options: { nullable: true } },
  },
  commentaire: {
    isString: true,
    optional: { options: { nullable: true } },
    trim: true,
  },
  montant: {
    isNumeric: true,
    errorMessage: 'Montant est obligatoire.',
  },
  librairie_id: {
    isNumeric: true,
    errorMessage: 'Librairie est obligatoire.',
  },
  commercial_id: {
    isNumeric: true,
    errorMessage: 'Commercial est obligatoire.',
  },
});
