import React from 'react';
import { useTranslation } from 'react-i18next';
import CircleIcon from '@mui/icons-material/Circle';
import {
  Badge,
  badgeClasses,
  Button,
  Grid,
  ListItem,
  Tooltip as MuiTooltip,
  Typography,
  useTheme
} from '@mui/material';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins, paddings } from 'themes/themeConstants';
import { AlertDetailsMessagesProps, AlertDetailsProps } from 'types/reduxTypes/patient-emrStateTypes';

import AlertIcon from '@assets/icons/AlertIcon';
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
  const controller = new AbortController();

  const onOpen = () => dispatch(patientsMiddleware.getPatientAlertDetails(rowId, controller.signal));
  const onClose = () => {
    controller.abort();
    dispatch(patientsMiddleware.resetPatientAlerts());
  };

  const alertTextCommonStyles = {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(12),
    letterSpacing: '-0.35px',
    color: theme.palette.secondary[800]
  };

  return alertCount ? (
    <MuiTooltip
      disableInteractive
      enterNextDelay={250}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: theme.palette.primary.light,
            width: '100%'
          }
        }
      }}
      TransitionProps={{
        unmountOnExit: true
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
      <Button sx={{ m: margins.all8 }}>
        <Badge
          badgeContent={alertCount}
          color="error"
          sx={{
            [`.${badgeClasses.badge}`]: {
              mr: margins.right6,
              mt: margins.top4
            }
          }}
        >
          <AlertIcon fontSize="large" color="primary" />
        </Badge>
      </Button>
    </MuiTooltip>
  ) : (
    <Typography
      sx={{
        color: theme.palette.grey[400],
        fontSize: theme.typography.pxToRem(16)
      }}
    >
      {t(Translation.PAGE_PATIENT_LIST_ALERT_COUNT)}
    </Typography>
  );
};

export default PatientAlert;
