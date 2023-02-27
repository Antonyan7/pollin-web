import React, { useEffect, useMemo } from 'react';
import OrderActions from '@components/Orders/CreateEditOrder/OrderActions';
import OrderBody from '@components/Orders/CreateEditOrder/OrderBody';
import OrderHeader from '@components/Orders/CreateEditOrder/OrderHeader';
import { Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { viewsMiddleware, viewsSelector } from '@redux/slices/views';
import { OrderCreationContext } from 'context/OrderCreationContext';
import { ModalName } from 'types/modals';

import useStopRouteChange from '@hooks/useStopRouteChange';
import { isAnyGroupItemSelected } from '@ui-component/orders/helpers';

const CreateEditOrder = ({ isEdit }: { isEdit: boolean }) => {
  const editableOrderDetails = useAppSelector(ordersSelector.editableOrderDetails);

  const atLeastOneSelectedItemExists = useMemo(
    () =>
      editableOrderDetails.some((orderGroup) =>
        orderGroup?.groups?.some((group) => isAnyGroupItemSelected(group.groupItems))
      ),
    [editableOrderDetails]
  );

  const openedModals = useAppSelector(viewsSelector.modals);
  const isCancelModalOpened = openedModals.find((modal) => modal.name === ModalName.CancelOrderCreationModal);

  const openCancellationModal = () => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.CancelOrderCreationModal, props: null }));
  };

  useStopRouteChange(atLeastOneSelectedItemExists && !isCancelModalOpened, openCancellationModal);

  useEffect(() => {
    if (editableOrderDetails.length === 0) {
      dispatch(ordersMiddleware.getOrderTypes());
    }
  }, [editableOrderDetails]);

  useEffect(() => {
    if (!isEdit) {
      dispatch(ordersMiddleware.resetOrderTypesSelection());
    }
  }, [isEdit]);

  return (
    <Stack>
      <OrderCreationContext>
        <OrderHeader />
        <OrderBody isEdit={isEdit} />
        <OrderActions isEdit={isEdit} />
      </OrderCreationContext>
    </Stack>
  );
};

export default CreateEditOrder;
