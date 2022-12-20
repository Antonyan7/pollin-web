import React from 'react';
import { useTranslation } from 'react-i18next';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';
import { format } from 'util';

const CreateOrderHeader = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const { id: currentPatientId } = router.query;
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const onBackClick = () => {
    router.push(`/patient-emr/details/${currentPatientId}`);
  };

  return (
    <Grid
      container
      item
      xs={12}
      columnGap={1}
      direction="row"
      justifyItems="center"
      px={paddings.all24}
      py={paddings.all12}
      borderBottom={`1px solid ${theme.palette.primary.light}`}
    >
      <IconButton onClick={onBackClick}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography display="flex" alignItems="center" variant="h4">
        {format(t(Translation.PAGE_CREATE_ORDER_HEADER_TEXT), `${patientProfile?.title}`)}
      </Typography>
    </Grid>
  );
};

export default CreateOrderHeader;
