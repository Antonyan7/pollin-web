import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useAppSelector } from 'redux/hooks';

const DisabledPatientId = () => {
  const [t] = useTranslation();
  const patientIdSelectLabel = t(Translation.MODAL_VERIFY_PATIENT_PHOTO_NAME);
  const patient = useAppSelector(patientsSelector.patientProfile);

  return (
    <Grid item xs={12}>
      <TextField fullWidth disabled variant="outlined" value={patient?.fullName} label={patientIdSelectLabel} />
    </Grid>
  );
};

export default DisabledPatientId;
