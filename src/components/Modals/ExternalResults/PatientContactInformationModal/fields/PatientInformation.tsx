import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';

const PatientInformation = () => {
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
          {/* TODO: Here we have hardcoded values since endpoint is not ready yet */}
          <Typography variant="subtitle1">Jane Doe</Typography>
          <Typography variant="subtitle1">123456789</Typography>
          <Typography variant="subtitle1">Jan 1, 1990</Typography>
          <Typography variant="subtitle1">0000-123456-00</Typography>
          <Typography variant="subtitle1">PF</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientInformation;
