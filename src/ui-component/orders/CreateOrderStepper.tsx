import React, { useState } from 'react';
// material-ui
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { paddings } from 'themes/themeConstants';

// step options
const steps = ['Select Order(s)', 'Confirm & Create Order'];

const CreateOrderStepper = () => {
  const [activeStep] = useState<number>(0);

  return (
    <Box py={paddings.all24} px={paddings.all24} justifyContent="end">
      <Stepper activeStep={activeStep} sx={{ pt: 4, pb: 4 }}>
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
