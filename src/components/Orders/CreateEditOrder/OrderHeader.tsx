import React from 'react';
import { useTranslation } from 'react-i18next';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Grid, IconButton, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';

const OrderHeader = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const router = useRouter();

  const onBackClick = () => {
    router.push(`/patient-emr/details/${router.query.id}/orders`);
  };

  return (
    <Grid
      container
      item
      xs={12}
      columnGap={1}
      direction="row"
      justifyItems="center"
      px={paddings.leftRight24}
      py={paddings.topBottom12}
      borderBottom={`1px solid ${theme.palette.primary.light}`}
    >
      <IconButton onClick={onBackClick}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography display="flex" alignItems="center" variant="h4">
        {t(Translation.PAGE_CREATE_ORDER_HEADER_TEXT)} {patientProfile?.fullName}
      </Typography>
    </Grid>
  );
};

export default OrderHeader;
