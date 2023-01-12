import React from 'react';
import OrderDetailsBody from '@components/Orders/OrderDetails/OrderDetailsBody';
import { Stack } from '@mui/material';

import CreateOrderStepper from '@ui-component/orders/CreateOrderStepper';
import OrderGroups from '@ui-component/orders/OrderGroups';
import OrderTypeDropdown from '@ui-component/orders/OrderTypeDropdown';

import { useOrderCreationContext } from '../../../../context/OrderCreationContext';

const CreateOrderBody = () => {
  const { orderCreationInfo } = useOrderCreationContext();

  return (
    <Stack>
      <CreateOrderStepper />
      {orderCreationInfo.step === 0 ? (
        <>
          <OrderTypeDropdown />
          <OrderGroups />
        </>
      ) : (
        <OrderDetailsBody />
      )}
    </Stack>
  );
};

export default CreateOrderBody;
