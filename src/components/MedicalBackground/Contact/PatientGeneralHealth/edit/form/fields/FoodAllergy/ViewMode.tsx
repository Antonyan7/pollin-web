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

const FoodAllergyViewMode = () => {
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const foodAllergies = generalHealth?.foodAllergies;

  return (
    <ItemsViewWrapper>
      {foodAllergies?.items.length ? (
        <>
          <MedicalFormTitleYes />
          <Grid item container direction="column">
            {foodAllergies?.items.map((fieldItem) => (
              <Grid key={v4()} py={paddings.leftRight8}>
                {fieldItem.title}
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

export default FoodAllergyViewMode;
