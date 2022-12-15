import React from 'react';
import CreateOrderActions from '@components/Orders/CreateOrder/CreateOrderActions';
import CreateOrderBody from '@components/Orders/CreateOrder/CreateOrderBody';
import CreateOrderHeader from '@components/Orders/CreateOrder/CreateOrderHeader';
import { Stack } from '@mui/material';

const CreateOrder = () => (
  <Stack>
    <CreateOrderHeader />
    <CreateOrderBody />
    <CreateOrderActions />
  </Stack>
);

export default CreateOrder;
