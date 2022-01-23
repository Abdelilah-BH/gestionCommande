import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { MSGERRORSERVER } from '../constants';
import { Commercial } from '../entities/commercial';

export const getCommercials = async (req: Request, res: Response): Promise<Response> => {
  try {
    const commercials = await Commercial.find({ withDeleted: false });
    return res.json({
      commercials,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const getSofDeleteCommercials = async (req: Request, res: Response): Promise<Response> => {
  try {
    const commercials = await Commercial.find({ withDeleted: true, where: 'supprimer_le IS NOT NULL' });
    return res.json({
      commercials,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const addCommercial = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nom_prenom, tel, email } = req.body;
    const commercial = new Commercial();
    commercial.nom_prenom = nom_prenom;
    commercial.tel = tel;
    commercial.email = email;

    const commercialCreated = await commercial.save();
    return res.status(200).json({
      commercial_created: commercialCreated,
      message: 'Commercial est bien ajouter.',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error && error['code'] === 'ER_DUP_ENTRY') {
        return res.status(500).json({
          message: 'Ce commercial existe déjà.',
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

export const updateCommercial = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body);
    getRepository(Commercial)
      .createQueryBuilder()
      .update()
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .execute();
    return res.status(200).json({
      message: "L'commercial a été modifié.",
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const deleteCommercial = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Commercial).createQueryBuilder().where('id = :id', { id: req.params.id }).delete().execute();
    return res.status(200).json({
      message: 'Commercial est bien supprimé définitivement.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const softDeleteCommercial = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Commercial).createQueryBuilder().where('id = :id', { id: req.params.id }).softDelete().execute();
    return res.status(200).json({
      message: 'Commercial est bien supprimé.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const restoreSoftDeleteCommercial = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Commercial).createQueryBuilder().where('id = :id', { id: req.params.id }).restore().execute();
    return res.status(200).json({
      message: "L'commercial ont bien été restaurés.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};
