import React from 'react';
import { useTranslation } from 'react-i18next';
import { PatientAppointmentsSortField } from '@axios/booking/managerBookingTypes';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Grid, IconButton, Typography } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsSlice } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { usePatientProfileNavigatorContext } from 'context/PatientProfileNavigatorContext';
import { SortOrder } from 'types/patient';

const { setPatientAppointments } = patientsSlice.actions;

const AppointmentsListHeader = () => {
  const [t] = useTranslation();

  const { navigateBack } = usePatientProfileNavigatorContext();

  const onBackClick = () => {
    navigateBack();
    dispatch(
      setPatientAppointments({
        list: {
          appointments: null,
          pageSize: 0,
          currentPage: 0,
          totalItems: 0
        },
        filters: null,
        selectedFilters: [],
        order: SortOrder.Desc,
        orderBy: PatientAppointmentsSortField.Date
      })
    );
  };

  return (
    <Grid container item xs={12} columnGap={1} direction="row" justifyItems="center">
      <IconButton onClick={onBackClick}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography display="flex" alignItems="center" variant="h4">
        {t(Translation.PAGE_PATIENT_PROFILE_APPOINTMENTS_LIST_TITLE)}
      </Typography>
    </Grid>
  );
};

export default AppointmentsListHeader;
