import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CircleIcon from '@mui/icons-material/Circle';
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

import CircularLoading from '@ui-component/circular-loading';

interface PatientAlertProps {
  rowId: string;
  alertCount: number;
}

const PatientAlert = ({ rowId, alertCount }: PatientAlertProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const patientAlertDetails = useAppSelector(patientsSelector.patientAlertDetails);
  const isPatientAlertDetailsLoading = useAppSelector(patientsSelector.isPatientAlertDetailsLoading);

  useEffect(() => {
    // Clean previous patient alerts
    dispatch(patientsMiddleware.resetPatientAlerts());

    return () => {
      dispatch(patientsMiddleware.resetPatientAlerts());
    };
  }, []);

  const onOpen = debounce(() => dispatch(patientsMiddleware.getPatientAlertDetails(rowId)), 500);
  const onClose = () => dispatch(patientsMiddleware.resetPatientAlerts());

  const alertTextCommonStyles = {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(12),
    letterSpacing: '-0.35px',
    color: theme.palette.secondary[800]
  };

  return alertCount ? (
    <MuiTooltip
      disableInteractive
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: theme.palette.primary.light,
            width: '100%'
          }
        }
      }}
      onOpen={onOpen}
      onClick={(e) => e.stopPropagation()}
      onClose={onClose}
      title={
        !isPatientAlertDetailsLoading ? (
          patientAlertDetails?.map((titleContent: AlertDetailsProps) => (
            <Grid
              item
              key={titleContent.id}
              sx={{
                pt: paddings.top8,
                '& + div': {
                  pt: paddings.top16
                }
              }}
            >
              <Typography
                sx={{
                  ...alertTextCommonStyles
                }}
              >
                {titleContent.title}:
              </Typography>

              {titleContent.messages.map((message: AlertDetailsMessagesProps) => (
                <ListItem
                  sx={{
                    pt: paddings.top2,
                    pl: paddings.left6,
                    color: 'inherit',
                    alignItems: 'baseline',
                    py: 0
                  }}
                >
                  <Grid pr={paddings.right8}>
                    <CircleIcon
                      sx={{
                        fontSize: '0.35rem',
                        color: 'secondary.800'
                      }}
                    />
                  </Grid>
                  <Typography
                    sx={{
                      ...alertTextCommonStyles
                    }}
                  >
                    {message.title}
                  </Typography>
                </ListItem>
              ))}
            </Grid>
          ))
        ) : (
          <CircularLoading />
        )
      }
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
