import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import OrderConfirmation from '@components/Orders/CreateEditOrder/OrderConfirmation';
import OrderEditOrCreate from '@components/Orders/CreateEditOrder/OrderEditOrCreate';
import OrderLoading from '@components/Orders/CreateEditOrder/OrderLoading';
import { Stack } from '@mui/material';
import { ordersSelector } from '@redux/slices/orders';
import { useOrderCreationContext } from 'context/OrderCreationContext';

import CreateOrderStepper from '@ui-component/orders/CreateOrderStepper';

import { updateOrderCreationStep } from '../../../context/actions/OrderCreationContextActions';

const OrderBody = ({ isEdit }: { isEdit: boolean }) => {
  const { orderCreationState, dispatchOrderCreationState } = useOrderCreationContext();
  const { isValidationLoading, step } = orderCreationState;
  const orderDetails = useSelector(ordersSelector.orderDetails);

  useEffect(() => {
    if (isEdit) {
      dispatchOrderCreationState(updateOrderCreationStep(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, orderDetails.orderTypes]);

  const renderOrderBody = () => {
    switch (step) {
      case 0:
        return <OrderEditOrCreate />;
      case 1:
        return <OrderConfirmation isEdit={isEdit} />;
      default:
        return null;
    }
  };

  return (
    <Stack>
      {!isEdit ? <CreateOrderStepper /> : null}
      {isValidationLoading ? <OrderLoading /> : renderOrderBody()}
    </Stack>
  );
};

export default OrderBody;
