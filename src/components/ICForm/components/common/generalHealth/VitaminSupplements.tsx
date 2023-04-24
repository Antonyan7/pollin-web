import React from 'react';
import {
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';

const VitaminSupplements = () => {
  const vitaminSupplements = useAppSelector(patientsSelector.icForm)?.generalHealth.vitaminSupplements.items;

  return (
    <Grid item container direction="column" gap={1}>
      {vitaminSupplements && vitaminSupplements.length ? (
        <>
          <Grid>
            <MedicalFormTitleYes />
          </Grid>
          {vitaminSupplements.map((vitaminSupplement) => (
            <Grid key={vitaminSupplement.title}>{`${vitaminSupplement.title}; ${vitaminSupplement.dosage}`}</Grid>
          ))}
        </>
      ) : (
        <MedicalFormTitleNo />
      )}
    </Grid>
  );
};

export default VitaminSupplements;
