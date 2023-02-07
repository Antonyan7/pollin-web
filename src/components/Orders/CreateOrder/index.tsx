import React, { useEffect } from 'react';
import CreateOrderActions from '@components/Orders/CreateOrder/CreateOrderActions';
import CreateOrderBody from '@components/Orders/CreateOrder/CreateOrderBody';
import CreateOrderHeader from '@components/Orders/CreateOrder/CreateOrderHeader';
import { Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { ordersMiddleware } from '@redux/slices/orders';
import { OrderCreationContext } from 'context/OrderCreationContext';

const CreateOrder = () => {
  useEffect(() => {
    dispatch(ordersMiddleware.resetOrderTypesSelection());
  }, []);

  return (
    <Stack>
      <OrderCreationContext>
        <CreateOrderHeader />
        <CreateOrderBody />
        <CreateOrderActions />
      </OrderCreationContext>
    </Stack>
  );
};

export default CreateOrder;
