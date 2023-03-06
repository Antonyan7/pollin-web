import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { borderRadius, margins, paddings } from 'themes/themeConstants';
import { AlertDetailsMessagesProps, AlertDetailsProps } from 'types/reduxTypes/patient-emrStateTypes';

const PatientAlertView = () => {
  const router = useRouter();
  const rowId = router.query.id as string;
  const theme = useTheme();
  const patientAlertDetails = useAppSelector(patientsSelector.patientAlertDetails);
  const [isAlertClosed, setIsAlertClosed] = useState(false);
  const isPatientAlertViewOpen = useAppSelector(patientsSelector.isPatientAlertViewOpen);
  const [t] = useTranslation();

  useEffect(() => {
    if (rowId) {
      dispatch(patientsMiddleware.getPatientAlertDetails(rowId));
    }
  }, [rowId]);

  return (
    <Stack
      width="100%"
      mb={margins.bottom16}
      bgcolor={theme.palette.warning.light}
      px={paddings.leftRight24}
      py={paddings.topBottom12}
      borderRadius={borderRadius.radius16}
    >
      {patientAlertDetails?.length && isPatientAlertViewOpen ? (
        <>
          {patientAlertDetails.map(
            (titleContent: AlertDetailsProps, index) =>
              !isAlertClosed && (
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Stack flexBasis={24}>
                      <ReportGmailerrorredIcon sx={{ color: theme.palette.warning.dark }} />
                    </Stack>
                    <Stack>
                      <Typography fontWeight="600" variant="subtitle1">
                        {titleContent.title}
                      </Typography>
                      {titleContent.messages.map((message: AlertDetailsMessagesProps) => (
                        <Stack
                          gap={1}
                          direction="row"
                          color={theme.palette.warning.dark}
                          key={`${titleContent.id}-${message.title}`}
                        >
                          <Typography
                            variant="subtitle2"
                            color={theme.palette.common.black}
                            marginBottom={margins.bottom8}
                          >
                            {message.title}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                  {index === 0 ? (
                    <Button sx={{ color: theme.palette.warning.dark }} onClick={() => setIsAlertClosed(true)}>
                      <CloseIcon sx={{ fontSize: theme.typography.pxToRem(20) }} />
                    </Button>
                  ) : null}
                </Stack>
              )
          )}
        </>
      ) : null}

      <Stack direction="row" alignItems="center" justifyContent="center" color={theme.palette.warning.dark} gap={1}>
        <Button
          sx={{
            color: theme.palette.warning.dark
          }}
          size="small"
        >
          <Stack flexBasis={24}>
            <AddIcon />
          </Stack>
          <Typography color={theme.palette.warning.dark}>{t(Translation.PAGE_PATIENT_ALERT_ADD)}</Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default PatientAlertView;
