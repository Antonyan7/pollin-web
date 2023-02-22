import { IOrderTypesCollection } from 'types/reduxTypes/ordersStateTypes';

import { cherryPick } from '../../components/Orders/helpers/cherryPick';

const getValidatedOrderCreationData = (orderTypes: IOrderTypesCollection[]) =>
  cherryPick(
    orderTypes,
    ['id'],
    'selected',
    (object: { selected: boolean }) => object.selected
  ) as IOrderTypesCollection[];

const getValidatedOrderDetails = (orderTypes: IOrderTypesCollection[]) =>
  cherryPick(
    orderTypes,
    ['id', 'title', 'label', 'groupItems'],
    'selected',
    (object: { selected: boolean }) => object.selected
  ) as IOrderTypesCollection[];

const resultsHelpers = {
  getValidatedOrderCreationData,
  getValidatedOrderDetails
};

export default resultsHelpers;
