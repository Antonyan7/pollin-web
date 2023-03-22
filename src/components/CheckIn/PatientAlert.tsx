import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware } from '@redux/slices/booking';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { borderRadius, margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import WarningAlert from '@assets/icons/AlertIcon/WarningAlert';

import { Translation } from '../../constants/translations';

const PatientAlert = ({ verification }: { verification?: boolean }) => {
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const theme = useTheme();
  const [t] = useTranslation();
  const title = verification
    ? t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_VERIFICATION_TITLE)
    : t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_INTAKE_TITLE);
  const description = verification
    ? `${patientProfile?.title} ${t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_VERIFICATION_DESCRIPTION)}`
    : t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_INTAKE_DESCRIPTION);
  const button = verification
    ? t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_VERIFICATION_ACTION_VERIFY)
    : t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_VERIFICATION_ACTION_REFRESH);

  const openVerifyModal = () => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.VerifyPatientPhotoModal, props: null }));
  };

  const refresh = () => {
    dispatch(bookingMiddleware.refreshCheckInAppointments(true));
  };

  return (
    <Stack width="100%">
      <Grid
        mb={margins.bottom16}
        bgcolor={theme.palette.warning.light}
        px={paddings.leftRight24}
        py={paddings.topBottom12}
        minHeight="80px"
        borderRadius={borderRadius.radius16}
        container
        alignItems="center"
      >
        <Grid container item direction="row" alignItems="center" xs={9}>
          <Grid item xs={1}>
            <WarningAlert />
          </Grid>
          <Grid container item rowSpacing={1} xs={11}>
            <Grid xs={12} item>
              <Typography variant="h5">{title}</Typography>
            </Grid>
            <Grid xs={12} item>
              {description}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} justifyContent="flex-end" display="flex">
          <Button onClick={verification ? openVerifyModal : refresh} color="warning">
            <Typography fontWeight="bold">{button}</Typography>
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PatientAlert;
