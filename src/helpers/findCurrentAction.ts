import {
  ISpecimensListItem,
  ITransportListFolderProps,
  SpecimenActions,
  TransportActions
} from 'types/reduxTypes/resultsStateTypes';

import { ISpecimenRowProps } from '@hooks/contextMenu/types';

const findCurrentAction = <
  ActionsTypeProps extends SpecimenActions | TransportActions,
  TargetType extends ISpecimensListItem | ITransportListFolderProps | ISpecimenRowProps
>(
  actions: ActionsTypeProps[],
  target: TargetType
) => actions.find((item) => item.status === target.status);

export default findCurrentAction;
