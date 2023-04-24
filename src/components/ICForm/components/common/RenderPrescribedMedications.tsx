import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MedicalFormTitleNo,
  MedicalFormTitleYes
} from '@components/MedicalBackground/components/common/MedWithItemsView';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const RenderPrescribedMedications = () => {
  const medication = useAppSelector(patientsSelector.icForm)?.medication;
  const [t] = useTranslation();

  return (
    <Grid item container direction="column" gap={1}>
      {medication?.exists ? (
        <>
          <Grid>
            <MedicalFormTitleYes />
          </Grid>
          {medication?.items.map((medicationItem, medicationIndex) => {
            const medicationTitle = `${medicationItem.title}, ${medicationItem.dosage}, ${medicationItem.id}`;

            return (
              <Grid key={medicationItem.id}>{`${t(
                Translation.PAGE_PATIENT_PROFILE_ICFORM_MEDICATION_CURRENT_MEDICATION_ITEM
              )} ${medicationIndex + 1}: ${medicationTitle}`}</Grid>
            );
          })}
        </>
      ) : (
        <MedicalFormTitleNo />
      )}
    </Grid>
  );
};

export default RenderPrescribedMedications;
