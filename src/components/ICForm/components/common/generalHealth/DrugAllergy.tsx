import React from 'react';
import {
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';

const DrugAllergy = () => {
  const drugAllergies = useAppSelector(patientsSelector.icForm)?.generalHealth.drugAllergies.items;

  return (
    <Grid item container direction="column" gap={1}>
      {drugAllergies && drugAllergies.length ? (
        <>
          <Grid>
            <MedicalFormTitleYes />
          </Grid>
          {drugAllergies.map((drugAllergy) => (
            <Grid key={drugAllergy.title}>{drugAllergy.title}</Grid>
          ))}
        </>
      ) : (
        <MedicalFormTitleNo />
      )}
    </Grid>
  );
};

export default DrugAllergy;
