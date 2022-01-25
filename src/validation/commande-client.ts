import { checkSchema } from 'express-validator';

export const CommandeClientValidation = checkSchema({
  n_commande: {
    optional: { options: { nullable: true } },
    in: ['params', 'query'],
    errorMessage: 'Identifient non valide',
    isInt: true,
    toInt: true,
  },
  avance: {
    isNumeric: true,
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
  avec_livraison: {
    isBoolean: true,
    errorMessage: 'Livraison est obligatoire.',
  },
  client_id: {
    isNumeric: true,
    optional: { options: { nullable: true } },
  },
});
