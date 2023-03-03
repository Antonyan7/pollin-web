import React from 'react';
import {
  ItemsViewWrapper,
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

const MedicalProblemsViewMode = () => {
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const medicalProblems = generalHealth?.medicalProblems;

  return (
    <ItemsViewWrapper>
      {medicalProblems?.items.length ? (
        <>
          <MedicalFormTitleYes />
          <Grid item container direction="column">
            {medicalProblems?.items.map((fieldItem) => (
              <Grid key={v4()} py={paddings.leftRight8}>
                {fieldItem.id}
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <MedicalFormTitleNo />
      )}
    </ItemsViewWrapper>
  );
};

export default MedicalProblemsViewMode;
