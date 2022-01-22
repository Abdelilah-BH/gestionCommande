import { checkSchema } from 'express-validator';

export const idvalidation = checkSchema({
  id: {
    optional: { options: { nullable: true } },
    in: ['params'],
    errorMessage: 'Identifient non valide',
    isInt: true,
    toInt: true,
  },
});
