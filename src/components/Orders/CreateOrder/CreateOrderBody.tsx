import React from 'react';
import CreateOrderStepper from '@components/Orders/CreateOrder/CreateOrderStepper';
import OrderTypeDropdown from '@components/Orders/CreateOrder/OrderTypeDropdown';
import { Stack } from '@mui/material';

const CreateOrderBody = () => (
  <Stack>
    <CreateOrderStepper />
    <OrderTypeDropdown />
  </Stack>
);

export default CreateOrderBody;
