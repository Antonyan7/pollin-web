import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ConfirmButton from '@components/Modals/Medications/AddPatientMedicationModal/form/actions';
import DateField from '@components/Modals/Medications/AddPatientMedicationModal/form/fields/DateField';
import Dosage from '@components/Modals/Medications/AddPatientMedicationModal/form/fields/Dosage';
import DrugName from '@components/Modals/Medications/AddPatientMedicationModal/form/fields/DrugName';
import Frequency from '@components/Modals/Medications/AddPatientMedicationModal/form/fields/Frequency';
import Prescriber from '@components/Modals/Medications/AddPatientMedicationModal/form/fields/Prescriber';
import Route from '@components/Modals/Medications/AddPatientMedicationModal/form/fields/Route';
import Time from '@components/Modals/Medications/AddPatientMedicationModal/form/fields/Time';
import { DialogActions, DialogContent, Grid } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import { AddPatientMedicationFormField } from './initialValues';

const FormBody = ({ setIsDirty }: { setIsDirty: (val: boolean) => void }) => {
  const [t] = useTranslation();
  const {
    formState: { dirtyFields }
  } = useFormContext();

  useEffect(() => {
    setIsDirty(Object.values(dirtyFields).length > 0);
  }, [dirtyFields, setIsDirty]);

  return (
    <DialogContent sx={{ padding: `${paddings.top32} ${paddings.right32} ${paddings.bottom24} ${paddings.left32}` }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DrugName />
        </Grid>
        <Grid item xs={6}>
          <DateField
            fieldName={AddPatientMedicationFormField.StartDate}
            label={t(Translation.MODAL_ADD_PATIENT_MEDICATION_START_DATE)}
          />
        </Grid>
        <Grid item xs={6}>
          <DateField
            fieldName={AddPatientMedicationFormField.EndDate}
            label={t(Translation.MODAL_ADD_PATIENT_MEDICATION_END_DATE)}
          />
        </Grid>
        <Grid item xs={6}>
          <Dosage />
        </Grid>
        <Grid item xs={6}>
          <Frequency />
        </Grid>
        <Grid item xs={6}>
          <Time />
        </Grid>
        <Grid item xs={6}>
          <Route />
        </Grid>
        <Grid item xs={12}>
          <Prescriber />
        </Grid>
      </Grid>
      <DialogActions sx={{ p: paddings.all4, marginTop: margins.top4 }}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <ConfirmButton />
        </Grid>
      </DialogActions>
    </DialogContent>
  );
};

export default FormBody;
