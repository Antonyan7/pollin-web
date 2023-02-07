import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Grid, IconButton, Typography, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { format } from 'util';

const CreateOrderHeader = () => {
  const [t] = useTranslation();
  const theme = useTheme();
  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const patientFullName = (patientProfile?.title ?? '').split(' ').slice(0, 2).join(' ');
  const onBackClick = () => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.CancelOrderCreationModal, props: null }));
  };

  useEffect(() => {
    window.onpopstate = () => {
      window.history.forward();
      onBackClick();
    };

    return () => {
      window.onpopstate = null;
    };
  }, []);

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
        {format(t(Translation.PAGE_CREATE_ORDER_HEADER_TEXT), patientFullName)}
      </Typography>
    </Grid>
  );
};

export default CreateOrderHeader;
