import {
  ISpecimensListItem,
  ITransportListFolderProps,
  SpecimenActions,
  TransportActions
} from 'types/reduxTypes/resultsStateTypes';

const findCurrentAction = <
  ActionsTypeProps extends SpecimenActions | TransportActions,
  TargetType extends ISpecimensListItem | ITransportListFolderProps
>(
  actions: ActionsTypeProps[],
  target: TargetType
) => actions.find((item) => item.title === target.status);

export default findCurrentAction;
