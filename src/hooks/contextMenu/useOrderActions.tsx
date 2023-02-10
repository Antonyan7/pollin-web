import { useCallback } from 'react';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { filterActionBindings, getActionTitleById } from 'helpers/contextMenu';
import { ModalName } from 'types/modals';
import { OrdersActions } from 'types/reduxTypes/ordersStateTypes';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

const useOrderActions = (row: { id: string }, actions: ContextMenuAction[] = []) => {
  const handleOrderCancellationPopupAction = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.OrderCancellation,
        props: { orderId: row.id }
      })
    );
  }, [row.id]);

  const actionBindings = [
    {
      id: OrdersActions.Cancel,
      title: getActionTitleById(OrdersActions.Cancel, actions),
      actionCallback: () => {
        handleOrderCancellationPopupAction();
      }
    }
  ];

  return filterActionBindings(actions, actionBindings);
};

export default useOrderActions;
