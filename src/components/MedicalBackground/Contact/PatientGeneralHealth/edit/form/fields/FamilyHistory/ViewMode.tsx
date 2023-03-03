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

const FamilyHistoryViewMode = () => {
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const familyHistory = generalHealth?.familyHistory;

  return (
    <ItemsViewWrapper>
      {familyHistory?.items.length ? (
        <>
          <MedicalFormTitleYes />
          <Grid item container direction="column">
            {familyHistory?.items.map((fieldItem) => (
              <Grid key={v4()} py={paddings.leftRight8}>{`${fieldItem.familyMemberName}; ${fieldItem.title}`}</Grid>
            ))}
          </Grid>
        </>
      ) : (
        <MedicalFormTitleNo />
      )}
    </ItemsViewWrapper>
  );
};

export default FamilyHistoryViewMode;
