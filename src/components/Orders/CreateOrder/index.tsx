import React from 'react';
import CreateOrderActions from '@components/Orders/CreateOrder/CreateOrderActions';
import CreateOrderHeader from '@components/Orders/CreateOrder/CreateOrderHeader';
import { Stack } from '@mui/material';

const CreateOrder = () => (
  <Stack>
    <CreateOrderHeader />
    <CreateOrderActions />
  </Stack>
);

export default CreateOrder;
