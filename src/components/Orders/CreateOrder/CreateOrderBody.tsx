import React from 'react';
import OrderConfirmation from '@components/Orders/CreateOrder/OrderConfirmation';
import { Stack } from '@mui/material';
import { useOrderCreationContext } from 'context/OrderCreationContext';

import CreateOrderStepper from '@ui-component/orders/CreateOrderStepper';
import OrderTypeDropdown from '@ui-component/orders/OrderTypeDropdown';
import OrderTypes from '@ui-component/orders/OrderTypes';

const CreateOrderBody = () => {
  const { orderCreationState } = useOrderCreationContext();

  return (
    <Stack>
      <CreateOrderStepper />
      {orderCreationState.step === 0 ? (
        <>
          <OrderTypeDropdown />
          <OrderTypes />
        </>
      ) : (
        <OrderConfirmation />
      )}
    </Stack>
  );
};

export default CreateOrderBody;
