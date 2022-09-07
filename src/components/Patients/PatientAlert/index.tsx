import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertDetailsProps } from '@axios/managerPatientEmr';
import InfoIcon from '@mui/icons-material/Info';
import { Badge, Grid, ListItem, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import MuiTooltip from '@mui/material/Tooltip';
import { Translation } from 'constants/translations';
import debounce from 'lodash.debounce';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';

interface PatientAlertProps {
  rowId: string;
  alertCount: number;
}

const PatientAlert = ({ rowId, alertCount }: PatientAlertProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const patientAlertDetails = useAppSelector(patientsSelector.patientAlertDetails);
  const onOpen = debounce(() => dispatch(patientsMiddleware.getPatientAlertDetails(rowId)), 500);

  return alertCount ? (
    <MuiTooltip
      onOpen={onOpen}
      title={patientAlertDetails.map((titleContent: AlertDetailsProps) => (
        <Grid item>
          <Typography variant="caption" color={theme.palette.background.paper}>
            {titleContent.title}
          </Typography>
          {titleContent.messages.map((message: string) => (
            <ListItem sx={{ paddingTop: 0 }}>&#9679;{message}</ListItem>
          ))}
        </Grid>
      ))}
    >
      <Button sx={{ m: 1 }}>
        <Badge badgeContent={alertCount} color="error">
          <InfoIcon fontSize="large" />
        </Badge>
      </Button>
    </MuiTooltip>
  ) : (
    <Typography>{t(Translation.PAGE_PATIENT_LIST_ALERT_COUNT)}</Typography>
  );
};

export default PatientAlert;
