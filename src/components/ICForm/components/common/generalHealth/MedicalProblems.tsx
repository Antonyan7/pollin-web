import React from 'react';
import {
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';

const MedicalProblems = () => {
  const medicalProblems = useAppSelector(patientsSelector.icForm)?.generalHealth.medicalProblems.items;

  return (
    <Grid item container direction="column" gap={1}>
      {medicalProblems && medicalProblems.length ? (
        <>
          <Grid>
            <MedicalFormTitleYes />
          </Grid>
          {medicalProblems.map((diagnosedItem) => (
            <Grid key={diagnosedItem.id}>{diagnosedItem.id}</Grid>
          ))}
        </>
      ) : (
        <MedicalFormTitleNo />
      )}
    </Grid>
  );
};

export default MedicalProblems;
