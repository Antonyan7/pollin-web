import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { isValid } from 'date-fns';
import { ContactInformationResultsPossibleResponses } from 'types/results';
import { formatDate } from 'utils/dateUtils';

const PatientInformation = () => {
  const patientContactInformation = useSelector(patientsSelector.patientContactInformation);
  const [t] = useTranslation();

  const patientDateOfBirth = isValid(patientContactInformation.dateOfBirth)
    ? formatDate(patientContactInformation.dateOfBirth, 'MMM dd, yyy')
    : patientContactInformation.dateOfBirth;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" fontWeight={500}>
            {t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_NAME)}:
          </Typography>
          <Typography variant="subtitle1" fontWeight={500}>
            {t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_ID)}:
          </Typography>
          <Typography variant="subtitle1" fontWeight={500}>
            {t(Translation.MODAL_EXTERNAL_RESULTS_PATIENT_DATE_OF_BIRTH)}:
          </Typography>
          <Typography variant="subtitle1" fontWeight={500}>
            {t(Translation.MODAL_EXTERNAL_RESULTS_OHIP_HEALTH_NUMBER)}:
          </Typography>
          <Typography variant="subtitle1" fontWeight={500}>
            {t(Translation.MODAL_EXTERNAL_RESULTS_OHIP_VERSION_CODE)}:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">{patientContactInformation.name}</Typography>
          <Typography variant="subtitle1">{patientContactInformation.patientIdentifier}</Typography>
          <Typography variant="subtitle1">
            {patientContactInformation.dateOfBirth === ContactInformationResultsPossibleResponses.Unknown
              ? 'N/A'
              : patientDateOfBirth}
          </Typography>
          <Typography variant="subtitle1">
            {patientContactInformation.ohipNumber === ContactInformationResultsPossibleResponses.Unknown
              ? 'N/A'
              : patientContactInformation.ohipNumber}
          </Typography>
          <Typography variant="subtitle1">
            {patientContactInformation.ohipVersionCode === ContactInformationResultsPossibleResponses.Unknown
              ? 'N/A'
              : patientContactInformation.ohipVersionCode}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientInformation;
