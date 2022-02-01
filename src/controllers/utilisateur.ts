import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { getDataByPagination } from '.';
import { MSGERRORSERVER } from '../constants';
import { Utilisateur } from '../entities/utilisateur';

export const getUtilisateurs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const utilisateurs = await getDataByPagination({ req, _: res, entity: Utilisateur });
    return res.json({
      utilisateurs,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const getSofDeleteUtilisateurs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const utilisateurs = await getDataByPagination({
      req,
      _: res,
      entity: Utilisateur,
      withDeleted: true,
      where: 'supprimer_le IS NOT NULL',
    });

    return res.json({
      utilisateurs,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const addUtilisateur = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nom_prenom, tel, email, mot_de_passe } = req.body;
    const utilisateur = new Utilisateur();
    utilisateur.nom_prenom = nom_prenom;
    utilisateur.tel = tel;
    utilisateur.email = email;
    utilisateur.mot_de_passe = mot_de_passe;

    const utilisateurCreated = await utilisateur.save();
    return res.status(200).json({
      utilisateur_created: utilisateurCreated,
      message: 'Utilisateur est bien ajouter.',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error && error['code'] === 'ER_DUP_ENTRY') {
        return res.status(500).json({
          message: 'Ce utilisateur existe déjà.',
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

export const updateUtilisateur = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body);
    getRepository(Utilisateur)
      .createQueryBuilder()
      .update()
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .execute();
    return res.status(200).json({
      message: 'Utilisateur a été modifié.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const deleteUtilisateur = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Utilisateur).createQueryBuilder().delete().where('id IN(:...id)', { id: req.body.ids }).execute();
    return res.status(200).json({
      message: 'Utilisateur est bien supprimé définitivement.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const softDeleteUtilisateur = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Utilisateur).createQueryBuilder().softDelete().where('id IN(:...id)', { id: req.body.ids }).execute();
    return res.status(200).json({
      message: 'Utilisateur est bien supprimé.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const restoreSoftDeleteUtilisateur = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Utilisateur).createQueryBuilder().restore().where('id IN(:...id)', { id: req.body.ids }).execute();
    return res.status(200).json({
      message: 'Utilisateur ont bien été restaurés.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};
