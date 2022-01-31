import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { getDataByPagination } from '.';
import { MSGERRORSERVER } from '../constants';
import { CommandeClient } from '../entities/commande-client';

export const getCommandeClients = async (req: Request, res: Response): Promise<Response> => {
  try {
    const commandeClients = await getDataByPagination({ req, _: res, entity: CommandeClient });
    return res.json({
      commandeClients,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const getSofDeleteCommandeClients = async (req: Request, res: Response): Promise<Response> => {
  try {
    const commandeClients = await getDataByPagination({
      req,
      _: res,
      entity: CommandeClient,
      withDeleted: true,
      where: 'supprimer_le IS NOT NULL',
    });
    return res.json({
      commandeClients,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const addCommandeClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { avance, commentaire, montant, avec_livraison, statut_livraison } = req.body;
    const commandeClient = new CommandeClient();
    commandeClient.avance = avance;
    commandeClient.commentaire = commentaire;
    commandeClient.montant = montant;
    commandeClient.avec_livraison = avec_livraison;
    commandeClient.statut_livraison = statut_livraison;

    const commandeClientCreated = await commandeClient.save();
    return res.status(200).json({
      commandeClient_created: commandeClientCreated,
      message: 'Commande client est bien ajouter.',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error && error['code'] === 'ER_DUP_ENTRY') {
        return res.status(500).json({
          message: 'Ce commande client existe déjà.',
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

export const updateCommandeClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body);
    getRepository(CommandeClient)
      .createQueryBuilder()
      .update()
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .execute();
    return res.status(200).json({
      message: 'Commande client a été modifié.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const deleteCommandeClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(CommandeClient)
      .createQueryBuilder()
      .where('id IN(:...id)', { id: JSON.parse(req.body.ids) })
      .delete()
      .execute();
    return res.status(200).json({
      message: 'CommandeClient est bien supprimé définitivement.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const softDeleteCommandeClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(CommandeClient)
      .createQueryBuilder()
      .where('id IN(:...id)', { id: JSON.parse(req.body.ids) })
      .softDelete()
      .execute();
    return res.status(200).json({
      message: 'Commande client est bien supprimé.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const restoreSoftDeleteCommandeClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(CommandeClient)
      .createQueryBuilder()
      .restore()
      .where('id IN(:...id)', { id: JSON.parse(req.body.ids) })
      .execute();
    return res.status(200).json({
      message: 'Commande client ont bien été restaurés.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};
