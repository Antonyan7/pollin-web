import { IPatientsReqBody, SortOrder } from '../../types/patient';

export const sortOrderTransformer = (patientsListData: IPatientsReqBody): IPatientsReqBody => {
  const { sortOrder } = patientsListData;

  patientsListData.sortOrder = (sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)) as SortOrder;

  return patientsListData;
};
