import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { getDataByPagination } from '.';
import { MSGERRORSERVER } from '../constants';
import { CommandeLibrairie } from '../entities/commande-librairie';

export const getCommandeLibrairies = async (req: Request, res: Response): Promise<Response> => {
  try {
    const commandeLibrairies = await getDataByPagination({ req, _: res, entity: CommandeLibrairie });
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
    const commandeLibrairies = await getDataByPagination({
      req,
      _: res,
      entity: CommandeLibrairie,
      withDeleted: true,
      where: 'supprimer_le IS NOT NULL',
    });
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
    const { commentaire, montant, date_envoi_cmd, date_fin_cmd } = req.body;
    const commandeLibrairie = new CommandeLibrairie();
    commandeLibrairie.commentaire = commentaire;
    commandeLibrairie.montant = montant;
    commandeLibrairie.date_envoi_cmd = date_envoi_cmd;
    commandeLibrairie.date_fin_cmd = date_fin_cmd;

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
    getRepository(CommandeLibrairie)
      .createQueryBuilder()
      .delete()
      .where('id IN(:...id)', { id: req.body.ids })
      .execute();
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
      .softDelete()
      .where('id IN(:...id)', { id: req.body.ids })
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
    getRepository(CommandeLibrairie)
      .createQueryBuilder()
      .restore()
      .where('id IN(:...id)', { id: req.body.ids })
      .execute();
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
