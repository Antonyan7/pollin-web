import React from 'react';
import {
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';

const FoodAllergy = () => {
  const foodAllergies = useAppSelector(patientsSelector.icForm)?.generalHealth.foodAllergies.items;

  return (
    <Grid item container direction="column" gap={1}>
      {foodAllergies && foodAllergies.length ? (
        <>
          <Grid>
            <MedicalFormTitleYes />
          </Grid>
          {foodAllergies.map((foodAllergy) => (
            <Grid key={foodAllergy.title}>{foodAllergy.title}</Grid>
          ))}
        </>
      ) : (
        <MedicalFormTitleNo />
      )}
    </Grid>
  );
};

export default FoodAllergy;
