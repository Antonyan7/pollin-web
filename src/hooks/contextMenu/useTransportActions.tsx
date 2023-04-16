import { useCallback } from 'react';
import { TransportActionType } from '@axios/results/resultsManagerTypes';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { filterActionBindings } from 'helpers/contextMenu';
import { ModalName } from 'types/modals';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

import { ITransportRowProps } from './types';

const useTransportActions = (row: ITransportRowProps, actions: ContextMenuAction[] = [], isCurrentDay?: boolean) => {
  const handleHandoffConfirmationAction = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.HandoffConfirmation,
        props: { row }
      })
    );
  }, [row]);

  const actionBindings = [];

  if (!isCurrentDay) {
    actionBindings.push({
      id: TransportActionType.MarkInTransit,
      title: actions.find((action) => action.id === TransportActionType.MarkInTransit)?.title ?? 'Could not find',
      actionCallback: () => {
        handleHandoffConfirmationAction();
      },
      dataCy: CypressIds.PAGE_SPECIMEN_TRACKING_TRANSPORT_LIST_MARK_IN_TRANSIT_BUTTON
    });
  }

  return filterActionBindings(actions, actionBindings);
};

export default useTransportActions;
