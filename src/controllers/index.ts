import { Request, Response } from 'express';

export const getDataByPagination = async (req: Request, _: Response, entity, withDeleted = false) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const perPage: number = parseInt(req.query.perPage as string) || 10;
  const data = await entity.find({
    withDeleted: withDeleted,
    skip: (page - 1) * perPage,
    take: perPage,
    order: { cree_le: 'DESC' },
  });
  return data;
};
