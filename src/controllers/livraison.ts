import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { getDataByPagination } from '.';
import { MSGERRORSERVER } from '../constants';
import { Livraison } from '../entities/livraison';

export const getLivraisons = async (req: Request, res: Response): Promise<Response> => {
  try {
    const livraisons = await getDataByPagination(req, res, Livraison);
    return res.json({
      livraisons,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const getSofDeleteLivraisons = async (req: Request, res: Response): Promise<Response> => {
  try {
    const livraisons = await Livraison.find({ withDeleted: true, where: 'supprimer_le IS NOT NULL' });
    return res.json({
      livraisons,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const addLivraison = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nom_complet, adresse, telephone, ville } = req.body;
    const livraison = new Livraison();
    livraison.nom_complet = nom_complet;
    livraison.adresse = adresse;
    livraison.telephone = telephone;
    livraison.ville = ville;

    const livraisonCreated = await livraison.save();
    return res.status(200).json({
      livraison_created: livraisonCreated,
      message: 'Livraison est bien ajouter.',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error && error['code'] === 'ER_DUP_ENTRY') {
        return res.status(500).json({
          message: 'Ce livraison existe déjà.',
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

export const updateLivraison = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body);
    getRepository(Livraison)
      .createQueryBuilder()
      .update()
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .execute();
    return res.status(200).json({
      message: "L'livraison a été modifié.",
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const deleteLivraison = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Livraison).createQueryBuilder().where('id = :id', { id: req.params.id }).delete().execute();
    return res.status(200).json({
      message: 'Livraison est bien supprimé définitivement.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const softDeleteLivraison = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Livraison).createQueryBuilder().where('id = :id', { id: req.params.id }).softDelete().execute();
    return res.status(200).json({
      message: 'Livraison est bien supprimé.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const restoreSoftDeleteLivraison = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Livraison).createQueryBuilder().where('id = :id', { id: req.params.id }).restore().execute();
    return res.status(200).json({
      message: "L'livraison ont bien été restaurés.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};
