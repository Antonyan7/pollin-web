import { SortOrder } from 'types/patient';

export const sortOrderTransformer = (data: { sortOrder?: SortOrder }) => {
  const { sortOrder } = data;

  if (sortOrder) {
    data.sortOrder = (sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)) as SortOrder;
  }

  return data;
};
