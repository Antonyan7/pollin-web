import React, { useEffect } from 'react';
import OrderActions from '@components/Orders/CreateEditOrder/OrderActions';
import OrderBody from '@components/Orders/CreateEditOrder/OrderBody';
import OrderHeader from '@components/Orders/CreateEditOrder/OrderHeader';
import { Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { OrderCreationContext } from 'context/OrderCreationContext';

const CreateEditOrder = ({ isEdit }: { isEdit: boolean }) => {
  const editableOrderDetails = useAppSelector(ordersSelector.editableOrderDetails);

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
