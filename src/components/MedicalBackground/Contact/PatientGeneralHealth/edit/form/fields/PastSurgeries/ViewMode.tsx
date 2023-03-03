import React from 'react';
import {
  ItemsViewWrapper,
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { paddings } from 'themes/themeConstants';
import { v4 } from 'uuid';

const PastSurgeriesViewMode = () => {
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const pastSurgeries = generalHealth?.pastSurgeries;

  return (
    <ItemsViewWrapper>
      {pastSurgeries?.items.length ? (
        <>
          <MedicalFormTitleYes />
          <Grid item container direction="column">
            {pastSurgeries?.items.map((fieldItem) => {
              const dateOfSurgery = timeAdjuster(fieldItem.dateOfSurgery).customizedDate;

              return <Grid key={v4()} py={paddings.leftRight8}>{`${fieldItem.typeOfSurgery}; ${dateOfSurgery}`}</Grid>;
            })}
          </Grid>
        </>
      ) : (
        <MedicalFormTitleNo />
      )}
    </ItemsViewWrapper>
  );
};

export default PastSurgeriesViewMode;
