import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import OrderConfirmation from '@components/Orders/CreateEditOrder/OrderConfirmation';
import OrderEditOrCreate from '@components/Orders/CreateEditOrder/OrderEditOrCreate';
import OrderLoading from '@components/Orders/CreateEditOrder/OrderLoading';
import OrderDetailsComments from '@components/Orders/OrderDetails/OrderDetailsComments';
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

  return (
    <Stack>
      {!isEdit ? <CreateOrderStepper /> : null}
      {isValidationLoading && <OrderLoading />}
      {/* TODO: use Switch statement with memo to get components for current step */}
      {!isValidationLoading && step === 0 ? <OrderEditOrCreate /> : null}
      {!isValidationLoading && step === 1 ? <OrderConfirmation isEdit={isEdit} /> : null}
      {!isValidationLoading && step === 1 ? <OrderDetailsComments /> : null}
    </Stack>
  );
};

export default OrderBody;
