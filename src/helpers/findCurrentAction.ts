import { IOrderResultsByPatientItem } from 'types/reduxTypes/ordersStateTypes';
import {
  ISpecimensListItem,
  ITransportListFolderProps,
  SpecimenActions,
  TransportActions
} from 'types/reduxTypes/resultsStateTypes';
import { IOrderResultsStatus } from 'types/results';

import { ISpecimenRowProps } from '@hooks/contextMenu/types';

const findCurrentAction = <
  ActionsTypeProps extends SpecimenActions | TransportActions | IOrderResultsStatus,
  TargetType extends ISpecimensListItem | ITransportListFolderProps | ISpecimenRowProps | IOrderResultsByPatientItem
>(
  actions: ActionsTypeProps[],
  target: TargetType
) => actions.find((item) => item.status === target.status);

export default findCurrentAction;
