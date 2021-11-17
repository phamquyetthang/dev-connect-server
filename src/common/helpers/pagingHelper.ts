import { Document, Query } from 'mongoose';

interface IResultData {
  meta: {
    page: number;
    limit: number | null;
    total: number;
    totalPage: number;
  };
  data: object;
}

export default async function pagingHelper(
  model: Query<any, Document<any>>,
  page: number
): Promise<IResultData> {
  const total = await model.countDocuments().exec();
  model.find();
  if (page) {
    model.skip((page - 1) * 10).limit(10);
  }
  const data = await model;
  const totalOnPage = await model.countDocuments().exec();
  return {
    meta: {
      page: page,
      limit: page ? 10 : null,
      total: totalOnPage,
      totalPage: Math.ceil(total / 10),
    },
    data,
  };
}
