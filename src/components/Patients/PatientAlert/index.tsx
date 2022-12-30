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
import { paddings } from 'themes/themeConstants';
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
  const onClose = () => dispatch(patientsMiddleware.resetPatientAlerts());

  return alertCount ? (
    <MuiTooltip
      disableInteractive
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: theme.palette.primary.light
          }
        }
      }}
      onOpen={onOpen}
      onClick={(e) => e.stopPropagation()}
      onClose={onClose}
      title={patientAlertDetails?.map((titleContent: AlertDetailsProps) => (
        <Grid
          item
          key={titleContent.id}
          sx={{
            fontWeight: 400,
            fontSize: theme.typography.pxToRem(12),
            lineHeight: theme.typography.pxToRem(16.8),
            color: theme.palette.secondary[800]
          }}
        >
          <Typography color="inherit">{titleContent.title}:</Typography>
          {titleContent.messages.map((message: AlertDetailsMessagesProps) => (
            <ListItem sx={{ pt: paddings.top4, color: 'inherit' }}>&#9679; {message.title}</ListItem>
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
