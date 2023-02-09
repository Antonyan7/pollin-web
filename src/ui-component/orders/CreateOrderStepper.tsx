import React from 'react';
// material-ui
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import { useOrderCreationContext } from '../../context/OrderCreationContext';

// step options
const steps = ['Select Order(s)', 'Confirm & Create Order'];

const CreateOrderStepper = () => {
  const { orderCreationState } = useOrderCreationContext();

  return (
    <Box p={paddings.all24} justifyContent="end">
      <Stepper activeStep={orderCreationState.step} sx={{ py: paddings.topBottom4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CreateOrderStepper;
