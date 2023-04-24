import React from 'react';
import {
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';

const FamilyHistory = () => {
  const familyHistory = useAppSelector(patientsSelector.icForm)?.generalHealth.familyHistory.items;

  return (
    <Grid item container direction="column" gap={1}>
      {familyHistory && familyHistory.length ? (
        <>
          <Grid>
            <MedicalFormTitleYes />
          </Grid>
          {familyHistory.map((history) => (
            <Grid key={history.familyMemberName}>{`${history.familyMemberName}; ${history.title}`}</Grid>
          ))}
        </>
      ) : (
        <MedicalFormTitleNo />
      )}
    </Grid>
  );
};

export default FamilyHistory;
