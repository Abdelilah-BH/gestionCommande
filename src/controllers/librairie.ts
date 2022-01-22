import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validationResult } from 'express-validator';
import { MSGERRORSERVER } from '../constants';
import { Librairie } from '../entities/librairie';

export const getLibrairies = async (req: Request, res: Response): Promise<Response> => {
  try {
    const librairies = await Librairie.find({ withDeleted: false });
    return res.json({
      librairies,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const getSofDeleteLibrairies = async (req: Request, res: Response): Promise<Response> => {
  try {
    const librairies = await Librairie.find({ withDeleted: true });
    return res.json({
      librairies,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const addLibrairie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { nom, telephone1, telephone2, email, ice } = req.body;
    const librairie = new Librairie();
    librairie.nom = nom;
    librairie.telephone1 = telephone1;
    librairie.telephone2 = telephone2;
    librairie.email = email;
    librairie.ice = ice;
    // librairie.logo = logo;

    const librairieCreated = await librairie.save();
    return res.status(200).json({
      librairie_created: librairieCreated,
      message: 'Librairie est bien ajouter.',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error && error['code'] === 'ER_DUP_ENTRY') {
        return res.status(500).json({
          message: 'Ce librairie existe déjà.',
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

export const updateLibrairie = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body);
    getRepository(Librairie)
      .createQueryBuilder()
      .update()
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .execute();
    return res.status(200).json({
      message: 'Librairie a été modifié.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const deleteLibrairie = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Librairie).createQueryBuilder().where('id = :id', { id: req.params.id }).delete().execute();
    return res.status(200).json({
      message: 'Librairie est bien supprimé définitivement.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const softDeleteLibrairie = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Librairie).createQueryBuilder().where('id = :id', { id: req.params.id }).softDelete().execute();
    return res.status(200).json({
      message: 'Librairie est bien supprimé.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const restoreSoftDeleteLibrairie = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Librairie).createQueryBuilder().where('id = :id', { id: req.params.id }).restore().execute();
    return res.status(200).json({
      message: 'Librairie ont bien été restaurés.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};
