import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { MSGERRORSERVER } from '../constants';
import { Fournisseur } from '../entities/fournisseur';

export const getFournisseurs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const fournisseurs = await Fournisseur.find({ withDeleted: false });
    return res.json({
      fournisseurs,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const getSofDeleteFournisseurs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const fournisseurs = await Fournisseur.find({ withDeleted: true, where: 'supprimer_le IS NOT NULL' });
    return res.json({
      fournisseurs,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const addFournisseur = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { raison_sociale, tel, email, ice } = req.body;
    const fournisseur = new Fournisseur();
    fournisseur.raison_sociale = raison_sociale;
    fournisseur.tel = tel;
    fournisseur.email = email;
    fournisseur.ice = ice;

    const fournisseurCreated = await fournisseur.save();
    return res.status(200).json({
      fournisseur_created: fournisseurCreated,
      message: 'Fournisseur est bien ajouter.',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error && error['code'] === 'ER_DUP_ENTRY') {
        return res.status(500).json({
          message: 'Ce fournisseur existe déjà.',
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

export const updateFournisseur = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body);
    getRepository(Fournisseur)
      .createQueryBuilder()
      .update()
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .execute();
    return res.status(200).json({
      message: 'Fournisseur a été modifié.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const deleteFournisseur = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Fournisseur).createQueryBuilder().where('id = :id', { id: req.params.id }).delete().execute();
    return res.status(200).json({
      message: 'Fournisseur est bien supprimé définitivement.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const softDeleteFournisseur = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Fournisseur).createQueryBuilder().where('id = :id', { id: req.params.id }).softDelete().execute();
    return res.status(200).json({
      message: 'Fournisseur est bien supprimé.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const restoreSoftDeleteFournisseur = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Fournisseur).createQueryBuilder().where('id = :id', { id: req.params.id }).restore().execute();
    return res.status(200).json({
      message: 'Fournisseur ont bien été restaurés.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};
