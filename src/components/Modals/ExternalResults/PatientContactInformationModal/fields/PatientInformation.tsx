import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const PatientInformation = () => {
  const patientContactInformation = useSelector(patientsSelector.patientContactInformation);
  const [t] = useTranslation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" fontWeight="bold">
            {t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_NAME)}:
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_ID)}:
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_DATE_OF_BIRTH)}:
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {t(Translation.MODAL_EXTERNAL_RESULTS_OHIP_HEALTH_NUMBER)}:
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            {t(Translation.MODAL_EXTERNAL_RESULTS_OHIP_VERSION_CODE)}:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{patientContactInformation.name}</Typography>
          <Typography variant="subtitle1">{patientContactInformation.id}</Typography>
          <Typography variant="subtitle1">{patientContactInformation.dateOfBirth}</Typography>
          <Typography variant="subtitle1">{patientContactInformation.ohipNumber}</Typography>
          <Typography variant="subtitle1">{patientContactInformation.ohipVersionCode}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientInformation;
