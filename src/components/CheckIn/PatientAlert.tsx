import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware } from '@redux/slices/booking';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { borderRadius, margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { AlertStatus } from 'types/reduxTypes/patient-emrStateTypes';

import WarningAlert from '@assets/icons/AlertIcon/WarningAlert';

import { Translation } from '../../constants/translations';

const PatientAlert = ({ alert }: { alert: AlertStatus }) => {
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const theme = useTheme();
  const [t] = useTranslation();
  let title;
  let description;
  let buttonLabel;

  if (alert === AlertStatus.Verification) {
    title = t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_VERIFICATION_TITLE);
    description = `${patientProfile?.fullName} ${t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_VERIFICATION_DESCRIPTION)}`;
    buttonLabel = t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_VERIFICATION_ACTION_VERIFY);
  } else if (alert === AlertStatus.Intake) {
    title = t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_INTAKE_TITLE);
    description = t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_INTAKE_DESCRIPTION);
    buttonLabel = t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_VERIFICATION_ACTION_REFRESH);
  } else if (alert === AlertStatus.PhotoMissing) {
    title = t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_PENDING_PHOTO_TITLE);
    description = `${patientProfile?.fullName} ${t(Translation.PAGE_PATIENT_CHECK_IN_ALERT_PENDING_PHOTO_DESCRIPTION)}`;
    buttonLabel = '';
  }

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
          {alert !== AlertStatus.PhotoMissing ? (
            <Button
              sx={{ color: theme.palette.warning['800'] }}
              onClick={alert === AlertStatus.Verification ? openVerifyModal : refresh}
              color="warning"
            >
              <Typography fontWeight="bold">{buttonLabel}</Typography>
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PatientAlert;
