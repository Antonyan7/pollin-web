import React, { useEffect } from 'react';
import { EditOutlined } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

const PatientProfileWidget = () => {
  const patinetProfileOverview = useAppSelector(patientsSelector.patientProfileOverview);
  const router = useRouter();
  const patientId = String(router.query.id);

  useEffect(() => {
    dispatch(patientsMiddleware.getPatientProfileOverview(patientId));
  }, [patientId]);

  return (
    <SubCardStyled
      sx={{
        maxWidth: '40%'
      }}
      title={patinetProfileOverview?.widgetTitle}
      secondary={
        <IconButton>
          <EditOutlined color="primary" />
        </IconButton>
      }
      titleProps={{
        fontWeight: 600,
        fontSize: '14px',
        color: (theme) => theme.palette.secondary[800]
      }}
    >
      <Box display="flex" px={3} py={4} flexDirection="column">
        {patinetProfileOverview?.items?.map((item, index) => (
          <Box display="flex" alignItems="center" key={item.title} {...(index > 0 && { pt: 2 })}>
            <Typography
              color={(theme) => theme.palette.secondary[800]}
              sx={{
                flexBasis: '40%'
              }}
            >
              {item.title}
            </Typography>
            <Typography sx={{ flexBasis: '10%' }} color={(theme) => theme.palette.secondary[800]}>
              :
            </Typography>
            <Box
              sx={{
                flexBasis: '40%'
              }}
            >
              {item.lineItems?.map((lineItem, lineItemindex) => (
                <Typography color={(theme) => theme.palette.grey[700]} {...(lineItemindex > 0 && { pt: 2 })}>
                  {lineItem.title}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </SubCardStyled>
  );
};

export default PatientProfileWidget;
