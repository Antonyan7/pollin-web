import React, { useEffect } from 'react';
import CreateOrderActions from '@components/Orders/CreateOrder/layout/CreateOrderActions';
import CreateOrderBody from '@components/Orders/CreateOrder/layout/CreateOrderBody';
import CreateOrderHeader from '@components/Orders/CreateOrder/layout/CreateOrderHeader';
import { Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { ordersMiddleware } from '@redux/slices/orders';

import { OrderCreationContext } from '../../../context/OrderCreationContext';

const CreateOrder = () => {
  useEffect(() => {
    dispatch(ordersMiddleware.resetOrderGroupsSelection());
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
