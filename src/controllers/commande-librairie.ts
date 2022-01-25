import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { MSGERRORSERVER } from '../constants';
import { CommandeLibrairie } from '../entities/commande-librairie';

export const getCommandeLibrairies = async (req: Request, res: Response): Promise<Response> => {
  try {
    const commandeLibrairies = await CommandeLibrairie.find({ withDeleted: false });
    return res.json({
      commandeLibrairies,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const getSofDeleteCommandeLibrairies = async (req: Request, res: Response): Promise<Response> => {
  try {
    const commandeLibrairies = await CommandeLibrairie.find({ withDeleted: true, where: 'supprimer_le IS NOT NULL' });
    return res.json({
      commandeLibrairies,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const addCommandeLibrairie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { avance, commentaire, montant, avec_livraison, statut_livraison } = req.body;
    const commandeLibrairie = new CommandeLibrairie();
    commandeLibrairie.avance = avance;
    commandeLibrairie.commentaire = commentaire;
    commandeLibrairie.montant = montant;
    commandeLibrairie.avec_livraison = avec_livraison;
    commandeLibrairie.statut_livraison = statut_livraison;

    const commandeLibrairieCreated = await commandeLibrairie.save();
    return res.status(200).json({
      commandeLibrairie_created: commandeLibrairieCreated,
      message: 'Commande librairie est bien ajouter.',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error && error['code'] === 'ER_DUP_ENTRY') {
        return res.status(500).json({
          message: 'Ce commande librairie existe déjà.',
        });
      } else {
        return res.status(500).json({
          message: MSGERRORSERVER,
        });
      }
    } else {
      return res.status(500).json({
        message: MSGERRORSERVER,
      });
    }
  }
};

export const updateCommandeLibrairie = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body);
    getRepository(CommandeLibrairie)
      .createQueryBuilder()
      .update()
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .execute();
    return res.status(200).json({
      message: 'Commande librairie a été modifié.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const deleteCommandeLibrairie = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(CommandeLibrairie).createQueryBuilder().where('id = :id', { id: req.params.id }).delete().execute();
    return res.status(200).json({
      message: 'CommandeLibrairie est bien supprimé définitivement.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const softDeleteCommandeLibrairie = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(CommandeLibrairie)
      .createQueryBuilder()
      .where('id = :id', { id: req.params.id })
      .softDelete()
      .execute();
    return res.status(200).json({
      message: 'Commande librairie est bien supprimé.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const restoreSoftDeleteCommandeLibrairie = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(CommandeLibrairie).createQueryBuilder().where('id = :id', { id: req.params.id }).restore().execute();
    return res.status(200).json({
      message: 'Commande librairie ont bien été restaurés.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};