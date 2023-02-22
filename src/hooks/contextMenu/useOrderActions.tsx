import { useCallback } from 'react';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { filterActionBindings, getActionTitleById } from 'helpers/contextMenu';
import { useRouter } from 'next/router';
import { ModalName } from 'types/modals';
import { OrdersActions } from 'types/reduxTypes/ordersStateTypes';
import { ContextMenuAction } from 'types/reduxTypes/resultsStateTypes';

const useOrderActions = (row: { id: string }, actions: ContextMenuAction[] = []) => {
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
      id: OrdersActions.ViewAndEdit,
      title: getActionTitleById(OrdersActions.ViewAndEdit, actions),
      actionCallback: () => {
        handleOrderViewEditAction();
      }
    }
  ];

  return filterActionBindings(actions, actionBindings);
};

export default useOrderActions;
