import React from 'react';
import { useTranslation } from 'react-i18next';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Badge, Grid, ListItem, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import MuiTooltip from '@mui/material/Tooltip';
import { Translation } from 'constants/translations';
import debounce from 'lodash.debounce';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { AlertDetailsMessagesProps, AlertDetailsProps } from 'types/reduxTypes/patient-emrStateTypes';

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
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: theme.palette.primary.light
          }
        }
      }}
      onOpen={onOpen}
      title={patientAlertDetails?.map((titleContent: AlertDetailsProps) => (
        <Grid item>
          <Typography variant="caption" color={theme.palette.common.black}>
            {titleContent.title}:
          </Typography>
          {titleContent.messages.map((message: AlertDetailsMessagesProps) => (
            <ListItem sx={{ paddingTop: 0, color: theme.palette.common.black }}>&#9679; {message.title}</ListItem>
          ))}
        </Grid>
      ))}
    >
      <Button sx={{ m: 1 }}>
        <Badge badgeContent={alertCount} color="error">
          <ReportGmailerrorredIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />
        </Badge>
      </Button>
    </MuiTooltip>
  ) : (
    <Typography>{t(Translation.PAGE_PATIENT_LIST_ALERT_COUNT)}</Typography>
  );
};

export default PatientAlert;
