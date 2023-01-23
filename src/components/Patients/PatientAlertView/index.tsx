import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button, ListItem, Stack, Typography, useTheme } from '@mui/material';
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
  const [isAlertClosed, setIsAlertClosed] = useState<Partial<Record<string, boolean>>>({});
  const isPatientAlertViewOpen = useAppSelector(patientsSelector.isPatientAlertViewOpen);
  const [t] = useTranslation();

  useEffect(() => {
    if (rowId) {
      dispatch(patientsMiddleware.getPatientAlertDetails(rowId));
    }
  }, [rowId]);

  useEffect(() => {
    const allAlertsAreClosed = patientAlertDetails.reduce(
      (accumulator, _, index) => accumulator && !!isAlertClosed[index],
      true
    );

    dispatch(patientsMiddleware.isPatientAlertViewOpen(!allAlertsAreClosed));
  }, [isAlertClosed, patientAlertDetails]);

  return patientAlertDetails?.length && isPatientAlertViewOpen ? (
    <Stack
      width="100%"
      mb={margins.bottom16}
      bgcolor={theme.palette.warning.light}
      px={paddings.leftRight24}
      py={paddings.topBottom12}
      borderRadius={borderRadius.radius16}
    >
      {patientAlertDetails.map(
        (titleContent: AlertDetailsProps, index) =>
          !isAlertClosed[index] && (
            // eslint-disable-next-line react/no-array-index-key
            <Stack key={index} direction="row" justifyContent="space-between">
              <Stack>
                <Stack direction="row" alignItems="center" color={theme.palette.warning.dark} gap={1}>
                  <Stack flexBasis={24}>
                    <InfoOutlinedIcon />
                  </Stack>
                  <Stack>
                    <Typography color={theme.palette.warning.dark}>{titleContent.title}</Typography>
                  </Stack>
                </Stack>
                {titleContent.messages.map((message: AlertDetailsMessagesProps) => (
                  <Stack
                    gap={1}
                    direction="row"
                    color={theme.palette.warning.dark}
                    key={`${titleContent.id}-${message.title}`}
                  >
                    <ListItem sx={{ display: 'list-item', pl: paddings.left12 }}>{message.title}</ListItem>
                  </Stack>
                ))}
              </Stack>
              <Stack>
                <Button
                  sx={{
                    color: theme.palette.warning.dark
                  }}
                  size="small"
                  onClick={() => setIsAlertClosed((prevState) => ({ ...prevState, [index]: true }))}
                >
                  {t(Translation.PAGE_PATIENT_ALERT_DISMISS)}
                  <CloseIcon sx={{ fontSize: '12px' }} />
                </Button>
              </Stack>
            </Stack>
          )
      )}
    </Stack>
  ) : null;
};

export default PatientAlertView;
