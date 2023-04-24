import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowBackIos } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';
import { format } from 'util';

const ICFormHeader = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const icFormCompletedDate = useAppSelector(patientsSelector.icFormCompletedOn);
  const completedOnLabel = t(Translation.PAGE_PATIENT_PROFILE_INITIAL_CONSULTATION_FORM_COMPLETED_ON);

  const icFormBackToPageLabel = format(t(Translation.PAGE_CREATE_ORDER_HEADER_TEXT), patientProfile?.fullName);

  const handleBackToProfilePage = () => router.push(`/patient-emr/details/${router.query.id}/profile`);

  return (
    <Grid item container direction="row" alignItems="center" xs={12} justifyContent="space-between">
      <Grid xs={6} item container direction="row" alignItems="center">
        <Grid item>
          <IconButton color="primary" onClick={handleBackToProfilePage}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            {icFormBackToPageLabel}
          </Typography>
        </Grid>
      </Grid>
      <Grid pr={paddings.right8}>
        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          {`${completedOnLabel} ${icFormCompletedDate}`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ICFormHeader;
