import React from 'react';
// material-ui
import { Box, Step, StepLabel, Stepper, useTheme } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import { useOrderCreationContext } from '../../context/OrderCreationContext';

// step options
const steps = ['Select Order(s)', 'Confirm & Create Order'];

const CreateOrderStepper = () => {
  const { orderCreationState } = useOrderCreationContext();
  const theme = useTheme();

  return (
    <Box p={paddings.all24} justifyContent="end" borderBottom={`1px solid ${theme.palette.primary.light}`}>
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
