import React from 'react';
import CreateOrderActions from '@components/Orders/CreateOrder/layout/CreateOrderActions';
import CreateOrderBody from '@components/Orders/CreateOrder/layout/CreateOrderBody';
import CreateOrderHeader from '@components/Orders/CreateOrder/layout/CreateOrderHeader';
import { Stack } from '@mui/material';

const CreateOrder = () => (
  <Stack>
    <CreateOrderHeader />
    <CreateOrderBody />
    <CreateOrderActions />
  </Stack>
);

export default CreateOrder;
