import resultsManager from '@axios/results/resultsManager';
import { IValidateOrderTypeGroupItem } from '@axios/results/resultsManagerTypes';
import { IOrderGroup, IOrderGroupItem, IOrderTypesCollection } from 'types/reduxTypes/ordersStateTypes';

const transformGroups = (groups: (IOrderGroup | IOrderGroupItem)[]): IValidateOrderTypeGroupItem[] =>
  groups.map(({ id, groupItems }) => ({
    id,
    ...(groupItems !== undefined ? { groupItems: transformGroups(groupItems) } : {})
  }));
const getValidatedOrderCreationData = (orderTypes: IOrderTypesCollection[]) =>
  resultsManager
    .validateOrderCreation({
      orderTypes: orderTypes.map(({ id, groups }) => ({ id, groups: transformGroups(groups) }))
    })
    .then(({ data }) => data);

const resultsHelpers = {
  getValidatedOrderCreationData
};

export default resultsHelpers;
