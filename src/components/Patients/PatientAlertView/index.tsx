import React, { useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Alert, Box, ListItem, styled, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins } from 'themes/themeConstants';
import { AlertDetailsMessagesProps, AlertDetailsProps } from 'types/reduxTypes/patient-emrStateTypes';

const PatientAlertView = () => {
  const router = useRouter();
  const rowId = router.query.id as string;
  const theme = useTheme();
  const patientAlertDetails = useAppSelector(patientsSelector.patientAlertDetails);

  const StyledDiv = styled('div')(() => ({
    color: theme.palette.warning.dark,
    display: 'flex',
    alignItems: 'center'
  }));

  useEffect(() => {
    if (rowId) {
      dispatch(patientsMiddleware.getPatientAlertDetails(rowId));
    }
  }, [rowId]);

  return patientAlertDetails?.length ? (
    <Box sx={{ width: '100%' }}>
      <Alert sx={{ mb: 2, background: theme.palette.warning.light }}>
        {patientAlertDetails.map((titleContent: AlertDetailsProps) => (
          <React.Fragment key={titleContent.id}>
            <StyledDiv>
              <InfoOutlinedIcon sx={{ marginRight: margins.right4 }} />
              <Typography color={theme.palette.warning.dark}>{titleContent.title}</Typography>
            </StyledDiv>
            {titleContent.messages.map((message: AlertDetailsMessagesProps) => (
              <StyledDiv key={`${titleContent.id}-${message.title}`}>
                <Typography variant="caption" color={theme.palette.warning.dark} sx={{ marginLeft: '10px' }}>
                  &#9679;
                </Typography>
                <ListItem>{message.title}</ListItem>
              </StyledDiv>
            ))}
          </React.Fragment>
        ))}
      </Alert>
    </Box>
  ) : null;
};

export default PatientAlertView;
