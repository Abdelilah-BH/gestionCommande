import { Request, Response } from 'express';

interface IGetDataByPaginationProps {
  req: Request;
  _: Response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: any;
  withDeleted?: boolean;
  where?: string;
}

export const getDataByPagination = async ({
  req,
  _,
  entity,
  withDeleted = false,
  where,
}: IGetDataByPaginationProps) => {
  const page: number = parseInt(req.query.page as string) || 1;
  const perPage: number = parseInt(req.query.perPage as string) || 50;
  const data = await entity.find({
    withDeleted: withDeleted,
    skip: (page - 1) * perPage,
    take: perPage,
    order: { cree_le: 'DESC' },
    where: where,
  });
  return data;
};
