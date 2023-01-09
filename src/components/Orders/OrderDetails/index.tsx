import React, { useEffect } from 'react';
import OrderDetailsActions from '@components/Orders/OrderDetails/OrderDetailsActions';
import OrderDetailsBody from '@components/Orders/OrderDetails/OrderDetailsBody';
import OrderDetailsComments from '@components/Orders/OrderDetails/OrderDetailsComments';
import OrderDetailsDataActions from '@components/Orders/OrderDetails/OrderDetailsDataActions';
import OrderDetailsHeader from '@components/Orders/OrderDetails/OrderDetailsHeader';
import { Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { ordersMiddleware, ordersSelector } from '@redux/slices/orders';
import { useRouter } from 'next/router';

const OrderDetails = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const orderDetails = useAppSelector(ordersSelector.orderDetails);
  const isOrderDetailsLoading = useAppSelector(ordersSelector.isOrderDetailsLoading);

  useEffect(() => {
    if (orderDetails.groups === null && !isOrderDetailsLoading && typeof orderId === 'string') {
      dispatch(ordersMiddleware.getOrderDetails(orderId));
    }
  }, [isOrderDetailsLoading, orderDetails.groups, orderId]);

  return (
    <Stack>
      <OrderDetailsHeader />
      <OrderDetailsBody />
      <OrderDetailsComments />
      <OrderDetailsDataActions />
      {orderDetails.isEditable && <OrderDetailsActions />}
    </Stack>
  );
};

export default OrderDetails;
