import React, { useEffect } from 'react';
import { EditOutlined } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { useRouter } from 'next/router';

import SubCardStyled from '@ui-component/cards/SubCardStyled';

const PatientProfileWidget = () => {
  const patientProfileOverview = useAppSelector(patientsSelector.patientProfileOverview);
  const router = useRouter();
  const patientId = String(router.query.id);

  useEffect(() => {
    dispatch(patientsMiddleware.getPatientProfileOverview(patientId));
  }, [patientId]);

  return (
    <SubCardStyled
      title={patientProfileOverview?.widgetTitle}
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
      <Grid container px={3} py={4} flexDirection="column" rowGap={2}>
        {patientProfileOverview?.items?.map((item) => (
          <Grid item container key={item.title}>
            <Grid item flexBasis="30%">
              <Typography color={(theme) => theme.palette.secondary[800]}>{item.title}</Typography>
            </Grid>
            <Grid item flexBasis="10%">
              <Typography color={(theme) => theme.palette.secondary[800]}>:</Typography>
            </Grid>
            <Grid item rowGap={2}>
              {item.lineItems?.map((lineItem) => (
                <Typography color={(theme) => theme.palette.grey[700]}>{lineItem.title}</Typography>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </SubCardStyled>
  );
};

export default PatientProfileWidget;
