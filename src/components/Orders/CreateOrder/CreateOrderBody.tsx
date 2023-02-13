import React from 'react';
import OrderConfirmation from '@components/Orders/CreateOrder/OrderConfirmation';
import OrderCreation from '@components/Orders/CreateOrder/OrderCreation';
import OrderLoading from '@components/Orders/CreateOrder/OrderLoading';
import { Stack } from '@mui/material';
import { useOrderCreationContext } from 'context/OrderCreationContext';

import CreateOrderStepper from '@ui-component/orders/CreateOrderStepper';

const CreateOrderBody = () => {
  const { orderCreationState } = useOrderCreationContext();
  const { isValidationLoading, step } = orderCreationState;

  return (
    <Stack>
      <CreateOrderStepper />
      {isValidationLoading && <OrderLoading />}
      {!isValidationLoading && step === 0 && <OrderCreation />}
      {!isValidationLoading && step === 1 && <OrderConfirmation />}
    </Stack>
  );
};

export default CreateOrderBody;
