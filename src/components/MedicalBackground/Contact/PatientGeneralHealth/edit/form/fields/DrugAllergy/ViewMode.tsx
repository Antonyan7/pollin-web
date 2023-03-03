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

const DrugAllergyViewMode = () => {
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const drugAllergy = generalHealth?.drugAllergies;

  return (
    <ItemsViewWrapper>
      {drugAllergy?.items.length ? (
        <>
          <MedicalFormTitleYes />
          <Grid item container direction="column">
            {drugAllergy?.items.map((fieldItem) => (
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

export default DrugAllergyViewMode;
