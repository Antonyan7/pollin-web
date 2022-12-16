import React from 'react';
import { Box } from '@mui/system';
import { useAppSelector } from '@redux/hooks';
import { resultsSelector } from '@redux/slices/results';

import SpecimenTestData from './SpecimenTestData';

const FirstStepContent = () => {
  const specimensForAppointment = useAppSelector(resultsSelector.appointmentSpecimens);

  return (
    <Box>
      {specimensForAppointment?.specimens.map((specimen, index) => {
        const isLastTestData = index === specimensForAppointment.specimens.length - 1;

        return <SpecimenTestData key={specimen.id} isLastTestData={isLastTestData} specimenTestData={specimen} />;
      })}
    </Box>
  );
};

export default FirstStepContent;
