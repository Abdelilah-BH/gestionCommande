import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { MSGERRORSERVER } from '../constants';
import { Client } from '../entities/client';

export const getClients = async (req: Request, res: Response): Promise<Response> => {
  try {
    const clients = await Client.find({ withDeleted: false });
    return res.json({
      clients,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const getSofDeleteClients = async (req: Request, res: Response): Promise<Response> => {
  try {
    const clients = await Client.find({ withDeleted: true });
    return res.json({
      clients,
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const addClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nom_prenom, tel, email } = req.body;
    const client = new Client();
    client.nom_prenom = nom_prenom;
    client.tel = tel;
    client.email = email;

    // client.image = image;

    const clientCreated = await client.save();
    return res.status(200).json({
      client_created: clientCreated,
      message: 'Client est bien ajouter.',
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error && error['code'] === 'ER_DUP_ENTRY') {
        return res.status(500).json({
          message: 'Ce client existe déjà.',
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

export const updateClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    console.log(req.body);
    getRepository(Client)
      .createQueryBuilder()
      .update()
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .execute();
    return res.status(200).json({
      message: 'Client a été modifié.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const deleteClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Client).createQueryBuilder().where('id = :id', { id: req.params.id }).delete().execute();
    return res.status(200).json({
      message: 'Client est bien supprimé définitivement.',
    });
  } catch (error) {
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const softDeleteClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Client).createQueryBuilder().where('id = :id', { id: req.params.id }).softDelete().execute();
    return res.status(200).json({
      message: 'Client est bien supprimé.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};

export const restoreSoftDeleteClient = async (req: Request, res: Response): Promise<Response> => {
  try {
    getRepository(Client).createQueryBuilder().where('id = :id', { id: req.params.id }).restore().execute();
    return res.status(200).json({
      message: 'Client ont bien été restaurés.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: MSGERRORSERVER,
    });
  }
};
