import React from 'react';
import { Stack } from '@mui/material';

import CreateOrderStepper from '@ui-component/orders/CreateOrderStepper';
import OrderGroups from '@ui-component/orders/OrderGroups';
import OrderTypeDropdown from '@ui-component/orders/OrderTypeDropdown';

const CreateOrderBody = () => (
  <Stack>
    <CreateOrderStepper />
    <OrderTypeDropdown />
    <OrderGroups />
  </Stack>
);

export default CreateOrderBody;
