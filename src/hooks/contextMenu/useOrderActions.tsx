import { useCallback } from 'react';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { filterActionBindings, getActionTitleById } from 'helpers/contextMenu';
import { useRouter } from 'next/router';
import { ModalName } from 'types/modals';
import { OrdersActions, OrdersListItemStatus } from 'types/reduxTypes/ordersStateTypes';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

const useOrderActions = (row: { id: string; status: OrdersListItemStatus }, actions: ContextMenuAction[] = []) => {
  const router = useRouter();
  const handleOrderCancellationPopupAction = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.OrderCancellation,
        props: { orderId: row.id }
      })
    );
  }, [row.id]);

  const handleOrderViewEditAction = useCallback(() => {
    const url = {
      pathname: `${router.pathname}/details`,
      query: { ...router.query, orderId: row.id }
    };

    router.push(url, undefined, { shallow: true });
  }, [router, row.id]);

  const actionBindings = [
    {
      id: OrdersActions.Cancel,
      title: getActionTitleById(OrdersActions.Cancel, actions),
      actionCallback: () => {
        handleOrderCancellationPopupAction();
      }
    },
    {
      id: row.status === OrdersListItemStatus.NotCollected ? OrdersActions.ViewAndEdit : OrdersActions.View,
      title: getActionTitleById(
        row.status === OrdersListItemStatus.NotCollected ? OrdersActions.ViewAndEdit : OrdersActions.View,
        actions
      ),
      actionCallback: () => {
        handleOrderViewEditAction();
      }
    }
  ];

  return filterActionBindings(actions, actionBindings);
};

export default useOrderActions;
